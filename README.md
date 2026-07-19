# astro-keryx-starter

Template base per ogni sito nuovo Keryx. Lo usa la skill `/sito` (step Setup);
si può usare anche a mano. Astro 6 + Tailwind 4 + sitemap, deploy GitHub
Actions → FTPS Hostinger con secret-scan bloccante, security headers Apache.

**Questo template NON contiene scelte di design.** Font, palette e fondi-sezione
si decidono in FASE 0-1 della SOP (`.claude/agents/shared/sop_sito_web_2026.md`)
e si scrivono in `src/styles/global.css` + `pixel/design_[cliente].md`.
È il punto: i default AI non devono esistere nemmeno nel template.

## Setup nuovo progetto

1. Copia la cartella: `cp -R astro-keryx-starter <nome-progetto>` (poi `cd`)
2. `rm -rf .git 2>/dev/null; git init && git add -A && git commit -m "scaffold da astro-keryx-starter"`
3. Cerca tutti i `CAMBIAMI` e sostituisci: `grep -rn "CAMBIAMI" .`
   - `package.json` → nome progetto
   - `astro.config.mjs` → dominio produzione (`site`)
   - `public/robots.txt` → URL sitemap
   - `.github/workflows/deploy.yml` → `server-dir` se non è `/public_html/`
   - `src/layouts/Base.astro` → favicon reali
   - `src/pages/index.astro` e `404.astro` → placeholder
4. `npm install` (il `package-lock.json` è già nel template, verificato col build 2026-07-15)
5. Crea il repo GitHub e configura i **Secrets** del repo: `FTP_SERVER`,
   `FTP_USERNAME`, `FTP_PASSWORD` (da Hostinger → account FTP del dominio)
6. `npm run dev` per verificare che il placeholder si veda su :4321

## Cosa c'è dentro

| File | Cosa fa |
|---|---|
| `.github/workflows/deploy.yml` | push su `main` → build → **secret scan (blocca il deploy)** → FTPS Hostinger |
| `public/.htaccess` | security headers (HSTS, X-Frame-Options, nosniff, CSP incrementale), cache, 404, blocco file sensibili |
| `public/robots.txt` | allow + sitemap |
| `src/layouts/Base.astro` | meta SEO, OG, Twitter Card, canonical, noindex opzionale |
| `src/pages/404.astro` | 404 personalizzata (checklist siti clienti) |
| `src/styles/global.css` | Tailwind 4 + **scheletro token vuoto** (5 ruoli fondi-sezione) |
| `scripts/shot.sh` | screenshot per visual QA loop (LORI/PIXEL) |

## Regole ferree collegate

- Mai chiavi client-side (`feedback_no_secrets_client_side`) — il workflow le blocca comunque
- Mai deploy senza "pubblica" esplicito di Davide (`feedback_no_publish_senza_ok`)
- Il build parte solo dopo scheletro condiviso + tokens (SOP madre, 4 regole)
