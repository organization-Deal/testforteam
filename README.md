# DEAL! Internal Master Exam + Backoffice

## Files
- `index.html` — exam
- `admin.html` — backoffice
- `functions/api/results.js` — Cloudflare Pages Function API
- `schema.sql` — D1 database schema

## Cloudflare setup
1. Push this folder contents to the GitHub repository root.
2. Cloudflare Pages: connect the repo. No framework/build command is required.
3. Create a Cloudflare D1 database, then run `schema.sql` in the D1 Console.
4. In Pages > Settings > Bindings, add a **D1 database binding** named exactly `DB` and select that database.
5. In Pages > Settings > Variables and Secrets, add a secret named exactly `ADMIN_KEY` and choose your own strong password.
6. Redeploy the Pages project after adding the binding/secret.
7. Exam: `/`
8. Backoffice: `/admin.html` — enter the same ADMIN_KEY.

## Stored fields
Name, server-side submission timestamp, correct/total/percentage, number of wrong answers, wrong question numbers, and per-wrong-question selected/correct choice. Backoffice displays time in Asia/Bangkok and can export CSV.
