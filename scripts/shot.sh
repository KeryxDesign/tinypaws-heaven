#!/usr/bin/env bash
#
# shot.sh — cattura screenshot della pagina renderizzata per la QA visiva degli agenti.
# Gli agenti (LORI, PIXEL) lanciano questo script e poi LEGGONO il PNG con il Read tool,
# che renderizza le immagini: cosi' "vedono" davvero la pagina, sopra E sotto la fold.
#
# Prerequisito: dev server attivo (npm run dev) su http://localhost:4321
#   Avvialo in background con:  npm run dev &   (oppure usa il preview gia' attivo)
#
# Uso:
#   bash scripts/shot.sh <route> <nome-output> [selettore-css]
#
# Esempi:
#   bash scripts/shot.sh /it/ home                      # full-page intera home
#   bash scripts/shot.sh /it/ hero "section:first-of-type"   # solo la sezione hero (alta risoluzione)
#   bash scripts/shot.sh /it/audit/ audit              # full-page pagina audit
#   bash scripts/shot.sh /it/video-13-errori/ video    # full-page pagina video
#
# Output: keryx-design/screenshots/<nome-output>.png
# Poi:  Read screenshots/<nome-output>.png   (l'agente vede l'immagine)

set -euo pipefail

ROUTE="${1:-/it/}"
NAME="${2:-shot}"
SELECTOR="${3:-}"
PORT="${PORT:-4321}"
WIDTH="${WIDTH:-1280}"

URL="http://localhost:${PORT}${ROUTE}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/screenshots"
OUT="${DIR}/${NAME}.png"

mkdir -p "$DIR"

# Verifica che il dev server risponda
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$URL" || echo "000")
if [ "$HTTP" != "200" ]; then
  echo "ERRORE: il dev server non risponde su $URL (HTTP $HTTP)." >&2
  echo "Avvialo con:  cd keryx-design && npm run dev &" >&2
  exit 1
fi

if [ -n "$SELECTOR" ]; then
  # Cattura solo l'elemento indicato, ad alta risoluzione (per dettaglio di una sezione)
  npx --yes capture-website-cli "$URL" \
    --output="$OUT" \
    --element="$SELECTOR" \
    --width="$WIDTH" \
    --scale-factor=2 \
    --overwrite
else
  # Cattura la pagina intera (sopra E sotto la fold)
  npx --yes capture-website-cli "$URL" \
    --output="$OUT" \
    --full-page \
    --width="$WIDTH" \
    --overwrite
fi

echo "OK: $OUT"
echo "Adesso leggi l'immagine con il Read tool: Read $OUT"
