# Expense Tracker

A private, offline-first money app and website: monthly expense sheets, bill scanning, budgets, EMI and SIP reminders, bank-style PDF statements, a live dashboard, on-device insights and an AI money advisor. Works in English, हिन्दी and मराठी.

Everything runs in the browser. There is no account and no server for your data. Your records stay on your own device.

> **Disclaimer:** the planner, insights and advisor give general education and estimates, not personal financial advice. Rates and tax rules change, so always check current figures.

---

## Features

**Track**
- A page for every month. The leftover balance carries forward to the next month.
- Credits and expenses with categories. Credit sources are Salary, Freelance, Business, Interest, Gift, Government scheme, Other Source, or **type your own**.
- Add from the floating **+** button (bottom sheet), **scan a bill photo**, or **import** pasted notes or a bank/UPI PDF. Imports always show a review screen first.
- Delete asks "Are you sure?".

**Plan**
- **Budget planner:** a 50/30/20 suggestion for your income, a plan based on your last 3 months, or set every limit yourself. Alerts at 80% and when you go over.
- **Salary planner** (from the Financial Planner Excel): enter a salary, pick Conservative, Balanced, Aggressive or **Custom**, and see the suggested split across needs, safety, investments, goals, equity/debt/gold and line items. One tap turns it into your budgets.
- **Bills and reminders** for EMI, SIP and other monthly payments, with "Mark paid" and a calendar (.ics) export.

**Understand**
- Power BI-style **dashboard**: click any chart to filter the rest, legends on every chart, heatmap, trends.
- **Insights** (all on the device): self-learning category suggestions, month-end forecast, unusual-spending alerts, repeating-payment finder, money health score, "what if I spend less" calculator.
- **Money advisor** chat: built-in finance and economics notes, calculators (SIP, EMI, compound interest, inflation, rule of 72), answers from your own numbers, and an optional real AI mode.

**Share and protect**
- **PDF statements** in bank-statement style for one month or all months, with total credit and debit at the end.
- PIN lock (and fingerprint / Face ID where the browser allows), backup and restore, share to Drive/iCloud, optional Google Drive backup, monthly backup reminder.
- Installable as an app (PWA), works offline once loaded.

---

## Project layout

```
.
├── index.html                  Landing page (3D, responsive) with Android / iOS download buttons
├── privacy.html                Privacy policy
├── favicon.png
├── app/                        The full app, installable as a PWA
│   ├── index.html              The whole app in one file (HTML + CSS + JS)
│   ├── sw.js                   Service worker (offline support)
│   ├── manifest.webmanifest    App name, icons, shortcuts
│   ├── icon.png, icon-192.png, apple-touch-icon.png
│   ├── pdf.min.js              PDF import (pdf.js), loaded only when needed
│   ├── pdf.worker.min.js
│   └── ocr/                    Bill scanning (Tesseract.js), loaded only when needed
│       ├── tesseract.min.js, worker.min.js
│       ├── tesseract-core-lstm.wasm.js, tesseract-core-simd-lstm.wasm.js
│       └── lang/eng.traineddata.gz
├── ai-backend/                 Optional: server for the AI advisor
│   ├── advisor-worker.js       Cloudflare Worker (keeps your API key secret)
│   └── SETUP.md                Step-by-step setup with Groq
└── .github/workflows/deploy.yml   Test and deploy to GitHub Pages
```

---

## Run it on your computer

Bill scanning, PDF import and the service worker need a web address, so don't open the file directly. Start a tiny server instead:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` for the website and `http://localhost:8000/app/` for the app.

---

## Put it online (GitHub Pages)

1. Create a **public** repository and upload everything, keeping the `app` folder (including `app/ocr`).
2. Add `.github/workflows/deploy.yml` (Add file → Create new file, type the full path).
3. In **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. A green run means your site is live at `https://YOUR-NAME.github.io/REPO-NAME/`.

The workflow checks that the JavaScript has no syntax errors and that required files exist. It then gives each release its own cache version, so phones pick up updates, and publishes the site. Pull requests run the checks only.

**Updating:** change files on a branch, open a pull request, and merge when the checks pass. The site redeploys in about a minute.

---

## Store links and customising

| What | Where |
| --- | --- |
| Google Play / App Store buttons | `const LINKS` at the bottom of `index.html` |
| Categories, colours, quotes | `CATS`, `COLORS`, `QUOTES` in `app/index.html` |
| Hindi / Marathi text | the `D` dictionary in `app/index.html` |
| Salary planner presets | `PRE` in `app/index.html` |
| Credit source defaults | `CREDIT_BASE` in `app/index.html` |
| AI advisor address | `const AI_ENDPOINT` in `app/index.html` |
| Privacy contact email | `privacy.html` |

---

## Turn on the AI advisor (optional)

Without setup, the chat uses its built-in notes and works fully offline. For real AI answers:

1. Get a free key at **console.groq.com/keys**.
2. Create the Worker from `ai-backend/advisor-worker.js` on Cloudflare and add `GROQ_API_KEY` as a **Secret**, plus `ALLOWED_ORIGIN` set to your site address.
3. Put the Worker address into `AI_ENDPOINT`.

Full steps are in [`ai-backend/SETUP.md`](ai-backend/SETUP.md). **Never put the key in the website files.** Calculations, answers from the user's own numbers and safety replies are always handled on the device. A "share my summary numbers" switch is off by default and sends totals only, never names or notes. Update `privacy.html` before launch.

---

## How the smart parts work

- **Category suggestions:** a naive Bayes text model trained on the user's own past titles, plus keyword rules.
- **Forecast:** this month's spending pace blended with earlier months, plus a straight-line trend for the next month.
- **Unusual spending:** median and median absolute deviation per category.
- **Repeating payments:** matching similar titles, amounts and days across months.
- **Money health score:** savings rate, EMI load and budget discipline.
- **Advisor:** keyword retrieval over about 50 finance and economics notes, regular-expression calculators, and optional AI grounded by the closest notes.
- **Bill scanning:** the image is enlarged and contrast-stretched, then read by Tesseract.js in the browser. The total, date and shop name are picked from the text.
- **PDF import:** text is extracted with pdf.js and rows are parsed. Running balances help tell credits from debits.
- **PDF statements:** a small hand-built PDF writer, so no library is needed.

---

## Privacy

Data is stored in the browser's local storage on the user's device. There are no accounts, ads or trackers. Backups are files the user chooses to save or share. See `privacy.html`.

## Known limits

- Bill scanning reads **English printed bills**. Handwriting and blurry or dark photos may fail, and results should always be checked.
- Fingerprint / Face ID works only over https in browsers that support it.
- Reminders show in the app. Alerts when the app is closed come from the calendar (.ics) export.
- There is no true home-screen widget. A native app would be needed for that.
- Hindi and Marathi cover the main screens. PDF statements and some new text are English only.
- Clearing browser data erases the records, so use Backup regularly.
- Android APK builds made with website-to-app tools may block downloads or bill scanning. Test before publishing.

## Ideas for later

Voice entry, Hindi/Marathi bill reading, native widgets, cloud sync with accounts, recurring auto-entries, more currencies.

## Credits

Built with plain HTML, CSS and JavaScript. Open-source libraries: [pdf.js](https://github.com/mozilla/pdf.js) and [Tesseract.js](https://github.com/naptha/tesseract.js) (with its English language data), all under the Apache 2.0 licence. The salary planner is based on a Financial Planner Excel template.

## Licence

Add your licence here (for example MIT) before sharing the code publicly.
