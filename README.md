# Expense Tracker

A private, offline-first expense tracker for the web. Track money by month, scan bills, plan budgets and see it all on a live dashboard. Available in English, हिन्दी and मराठी.

**Live site:** https://anjali-ob.github.io/expense-tracker/

Your data stays on your device. There are no accounts, ads or trackers.

## Features

- Monthly sheets with credits, expenses, categories and a balance that carries forward
- Add with the **+** button, **scan a bill photo**, or **import** notes or a bank/UPI PDF
- Budget planner, salary and investment planner, EMI and SIP reminders
- Power BI-style dashboard and on-device insights (forecast, unusual spending, repeating payments)
- Bank-statement style PDF export for one month or all months
- Money advisor chat (built-in notes and calculators, optional AI)
- PIN lock, backup and restore, works offline, installable as an app

## Project structure

```
index.html         Landing page
privacy.html       Privacy policy
app/               The full app (index.html, service worker, PDF and OCR files)
ai-backend/        Optional AI advisor server and setup guide
.github/workflows/ Test and deploy to GitHub Pages
```

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` for the site and `http://localhost:8000/app/` for the app.

## Deploy

Push to `main`. In **Settings → Pages**, set **Source** to **GitHub Actions**. The workflow checks the code and publishes the site.

## Configuration

| What | Where |
| --- | --- |
| Play Store / App Store links | `const LINKS` in `index.html` |
| AI advisor (optional) | `const AI_ENDPOINT` in `app/index.html`, see [`ai-backend/SETUP.md`](ai-backend/SETUP.md) |
| Contact email | `privacy.html` |

Never put an AI API key in the website files.

## Limitations

- Bill scanning reads English printed bills only. Always check the amount.
- Clearing browser data erases records, so use Backup regularly.

## Disclaimer

The planner, insights and advisor give general education and estimates, not financial advice.

## Credits

Uses [pdf.js](https://github.com/mozilla/pdf.js) and [Tesseract.js](https://github.com/naptha/tesseract.js) (Apache 2.0).

## License

MIT. See [LICENSE](LICENSE).
