# Testi del sito — procedura di modifica (Tiny Paws Haven 7)

Tutti i testi del sito esistono anche in un documento **Word bilingue** (English + Shqip),
pensato perché il cliente possa modificarli senza toccare il codice.

## Dove sta il documento
- **Cartella condivisa (Google Drive):**
  `Clienti Keryx/T/TPH7/Testi Sito Tiny Paws Haven 7.docx` ← è questo che modifica il cliente
- **Copia versionata nel repo:** `content/Testi Sito Tiny Paws Haven 7.docx`

## Regola sulla fonte
La **fonte di verità è il sito** (il codice in `src/`). Il Word è lo specchio leggibile +
il canale con cui il cliente propone le modifiche. Il sito live e il Word non devono divergere:
dopo ogni modifica applicata, si rigenera il Word (comando sotto).

## Come modifica il cliente (Lua / Davide)
1. Apre il Word nella cartella condivisa.
2. Cambia il testo nelle celle. **L'inglese è la versione principale**, si modifica prima quello.
3. Aggiorna la colonna **Shqip** di conseguenza (adattamento, non traduzione letterale).
4. Non tocca le etichette grigie della prima colonna (dicono dove appare ogni testo).
5. Salva il file nella cartella condivisa e avvisa Keryx.

## Come applica Keryx le modifiche
1. Legge il Word aggiornato dalla cartella condivisa.
2. Riporta i testi nel codice:
   - copy di pagina → `src/components/pages/*.astro` (oggetto `copy` en/sq)
   - nav, bottoni, etichette, stati → `src/i18n/ui.ts`
   - schede gattino → `src/content/cats/*.md`
3. `npm run build` per verificare, poi commit + push su `main`
   (GitHub Actions ripubblica il sito in ~1 minuto).
4. Rigenera il Word e ricopia nella cartella condivisa:
   ```
   npm run content:doc
   cp "content/Testi Sito Tiny Paws Haven 7.docx" "<cartella Drive TPH7>/"
   ```

## Rigenerare il documento
Il generatore è `scripts/generate-content-doc.cjs` (testi hardcoded, da tenere allineati al codice).
```
npm run content:doc            # scrive in content/
npm run content:doc -- "/percorso/output.docx"   # output personalizzato
```

## Aggiungere un gattino nuovo
Il cliente copia il blocco "Mushi" nel Word, lo compila e manda le foto. Keryx crea
`src/content/cats/<nome>.md` (un file per gattino, campi bilingui) e ripubblica.

## Ancora da riempire (vedi ultima pagina del Word)
Foto e dati di Mushi · foto di Cinnamon · storia reale in About · foto Instagram · link Facebook.
