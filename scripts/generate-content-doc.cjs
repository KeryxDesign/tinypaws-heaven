const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, PageBreak,
} = require('docx');
const fs = require('fs');

const APRICOT = 'D8926A', CINNAMON = '8A6A4F', COCOA = '4A3526', SLATE = '3E4A52', CREAM = 'FBF7F2';
const CONTENT_W = 9026;
const COLS = [1900, 3563, 3563];

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, color: opts.color, size: opts.size })],
  });
}
function cellParas(text, opts = {}) {
  if (text == null || text === '') return [new Paragraph({ children: [new TextRun({ text: '' })] })];
  return String(text).split('\n\n').map((chunk, i) =>
    new Paragraph({
      spacing: { after: 40, before: i === 0 ? 0 : 40 },
      children: [new TextRun({ text: chunk, italics: opts.italics, color: opts.color, size: opts.size })],
    })
  );
}
function cell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    shading: opts.shading ? { type: ShadingType.CLEAR, fill: opts.shading, color: 'auto' } : undefined,
    children: cellParas(text, opts),
  });
}
function headerRow() {
  const h = (t) => new TableCell({
    width: { size: 0, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    shading: { type: ShadingType.CLEAR, fill: CINNAMON, color: 'auto' },
    children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: 'FFFFFF', size: 19 })] })],
  });
  const cells = [h('Where on the site'), h('English  (main — edit here first)'), h('Shqip  (Albanian adaptation)')];
  cells.forEach((c, i) => (c.options.width = { size: COLS[i], type: WidthType.DXA }));
  return new TableRow({ tableHeader: true, children: cells });
}
function row(label, en, sq) {
  return new TableRow({
    children: [
      cell(label, COLS[0], { shading: 'F5E6D8', size: 18 }),
      cell(en, COLS[1]),
      cell(sq, COLS[2], { color: '555555' }),
    ],
  });
}
function table(rows) {
  return new Table({
    columnWidths: COLS,
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'D8C4B0' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'D8C4B0' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'D8C4B0' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'D8C4B0' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E5D8C8' },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E5D8C8' },
    },
    rows: [headerRow(), ...rows],
  });
}
function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 120 }, children: [new TextRun({ text: t, color: CINNAMON })] }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 }, children: [new TextRun({ text: t, color: COCOA })] }); }
function pageUrl(t) { return new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: t, italics: true, color: SLATE, size: 18 })] }); }
function spacer() { return new Paragraph({ children: [new TextRun('')], spacing: { after: 80 } }); }

// ---- Instructions box (procedure) ----
function box(children) {
  return new Table({
    columnWidths: [CONTENT_W],
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: APRICOT },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: APRICOT },
      left: { style: BorderStyle.SINGLE, size: 8, color: APRICOT },
      right: { style: BorderStyle.SINGLE, size: 8, color: APRICOT },
    },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      margins: { top: 140, bottom: 140, left: 180, right: 180 },
      shading: { type: ShadingType.CLEAR, fill: 'FBF3EA', color: 'auto' },
      children,
    })] })],
  });
}
function bullet(text, opts = {}) {
  return new Paragraph({ bullet: { level: 0 }, spacing: { after: 50 }, children: [new TextRun({ text, bold: opts.bold, size: 20 })] });
}

const doc = new Document({
  creator: 'Keryx Design',
  title: 'Tiny Paws Haven 7 — Site Texts',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 21, color: '2E2A26' } },
    },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, color: CINNAMON } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, color: COCOA } },
    ],
  },
  sections: [{
    properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    children: [
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: 'Tiny Paws Haven 7', bold: true, size: 40, color: CINNAMON })] }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: 'Site texts / Testi del sito  ·  English + Shqip  ·  keryxdesign.github.io/tinypaws-heaven', italics: true, color: SLATE, size: 20 })] }),

      box([
        new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: 'How to use this document', bold: true, size: 24, color: COCOA })] }),
        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: 'This document holds every text on the website, page by page, in both languages. It is where you change the words when you want to. You never touch the website itself.', size: 20 })] }),
        bullet('Edit the text directly in the cells. English is the main version — change it first.', {}),
        bullet('Then update the Albanian (Shqip) cell to match. It is an adaptation, not a word-for-word translation, so make it sound natural.', {}),
        bullet('Grey labels in the left column tell you where each text appears on the site. Do not change those labels.', {}),
        bullet('Anything written like [TO FILL: ...] or [in square brackets] is a placeholder waiting for real information (for example Mushi’s details, or a photo).', {}),
        new Paragraph({ spacing: { after: 60, before: 100 }, children: [new TextRun({ text: 'When your changes are ready', bold: true, size: 21, color: COCOA })] }),
        bullet('Save the document (it stays in this shared folder). Tell Davide, or Keryx, that it is updated.', {}),
        bullet('Keryx copies your changes into the website and republishes it. The live site updates in about a minute.', {}),
        new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun({ text: 'In breve (IT): qui dentro ci sono tutti i testi del sito nelle due lingue. Modifica le celle, salva il file in questa cartella condivisa e avvisa. Keryx riporta le modifiche sul sito e lo ripubblica. Non si tocca il sito a mano.', italics: true, size: 19, color: SLATE })] }),
      ]),
      spacer(),

      // ---------- SHARED ----------
      h1('Shared across all pages'),
      pageUrl('These texts appear on every page: the top menu, the buttons, and the labels on the kitten cards.'),
      h2('Site tagline'),
      table([ row('Under the logo / SEO', 'Foster kittens in Tirana looking for a home', 'Kotele në strehim në Tiranë që kërkojnë një shtëpi') ]),
      h2('Navigation menu'),
      table([
        row('Menu item', 'Home', 'Ballina'),
        row('Menu item', 'The Cats', 'Kotelet'),
        row('Menu item', 'Happy Tails', 'Fund i lumtur'),
        row('Menu item', 'How Adoption Works', 'Si funksionon adoptimi'),
        row('Menu item', 'About Us', 'Rreth nesh'),
        row('Menu item', 'Contact Us', 'Na kontakto'),
      ]),
      h2('Buttons'),
      table([
        row('Button', 'Message us on Instagram', 'Na shkruaj në Instagram'),
        row('Button', 'Follow @tinypawshaven7', 'Na ndiq @tinypawshaven7'),
        row('Button', 'Meet the kittens', 'Njihu me kotelet'),
        row('Button', 'See the happy tails', 'Shiko fundet e lumtura'),
        row('Button', 'Contact us', 'Na kontakto'),
      ]),
      h2('Kitten card labels'),
      table([
        row('Status pill', 'Looking for a home', 'Në kërkim të një shtëpie'),
        row('Status pill', 'Adopted', 'Adoptuar'),
        row('Badge', 'New arrival', 'Sapo ardhur'),
        row('Health', 'Vaccinated', 'I vaksinuar'),
        row('Health', 'Dewormed', 'I çvërmuar'),
        row('Health', 'Neutered / spayed', 'I sterilizuar'),
        row('Health', 'Litter-trained', 'Mëson tënë kutinë e rerës'),
        row('Health', 'Eats solid food', 'Ha ushqim të ngurtë'),
        row('Good with', 'Children', 'Fëmijë'),
        row('Good with', 'Other cats', 'Mace të tjera'),
        row('Good with', 'Dogs', 'Qen'),
      ]),
      h2('When there are no kittens available'),
      pageUrl('Shown on the Home and The Cats pages if no kitten is currently in foster.'),
      table([
        row('Title', 'No kittens in foster right now', 'Tani nuk kemi kotele në strehim'),
        row('Body', 'It happens, and it’s a good sign: the last ones found their people. The next little face usually turns up sooner than we expect, and we post it on Instagram the day it arrives.', 'Ndodh, dhe është shenjë e mirë: të fundit gjetën njerëzit e tyre. Fytyra tjetër e vogël zakonisht shfaqet më shpejt nga sa presim, dhe e postojmë në Instagram ditën që vjen.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- HOME ----------
      h1('Page: Home'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/'),
      table([
        row('Big headline (line 1)', 'We keep finding kittens on the streets of Tirana.', 'Vazhdojmë të gjejmë kotele në rrugët e Tiranës.'),
        row('Big headline (line 2)', 'So we take them home for a while.', 'Kështu i marrim në shtëpi për një kohë.'),
        row('Intro line', 'We’re Lua and Davide. Not a shelter, not an association. Two people with a spare room and a soft spot for small cats.', 'Jemi Lua dhe Davide. As strehë, as shoqatë. Dy njerëz me një dhomë të lirë dhe një dobësi për macet e vogla.'),
        row('Three value words', 'Fostered in our home  /  Vaccinated & checked  /  Matched with the right family', 'Të strehuar në shtëpinë tonë  /  Të vaksinuar dhe të kontrolluar  /  Të përshtatur me familjen e duhur'),
        row('Section title', 'What we actually do', 'Çfarë bëjmë në të vërtetë'),
        row('Section body', 'Every so often, a kitten needs a place to be safe. We take one in, get it healthy, and look, without rushing, for a family that fits. For a while our couch belongs to a small cat. Then it moves on to its own home, and we wait for the next little face.', 'Herë pas here, një kotele ka nevojë për një vend të sigurt. Marrim një, e bëjmë të shëndetshme dhe kërkojmë, pa nxitim, një familje që i shkon. Për një kohë divani ynë i përket një maceje të vogël. Pastaj ajo shkon në shtëpinë e vet, dhe ne presim fytyrën tjetër të vogël.'),
        row('Kittens-now title', 'Looking for a home right now', 'Në kërkim të një shtëpie tani'),
        row('Kittens-now line', 'One little one is with us at the moment.', 'Një i vogël është me ne për momentin.'),
        row('Happy-tails title', 'Some of them already made it', 'Disa prej tyre ia dolën'),
        row('Happy-tails body', 'Every kitten that passed through our home left it for a better one. Cinnamon was found alone by a café, barely 600 grams. Today she is someone’s cat.', 'Çdo kotele që kaloi nga shtëpia jonë e la atë për një më të mirë. Cinnamon u gjet vetëm pranë një kafeneje, mezi 600 gramë. Sot është macja e dikujt.'),
        row('Quote (dark band)', 'A kitten that would have grown up on the street gets a warm room instead, and then a family. That’s reason enough for us.', 'Një kotele që do të ishte rritur në rrugë merr në vend të saj një dhomë të ngrohtë, dhe pastaj një familje. Kjo është arsye e mjaftueshme për ne.'),
        row('Instagram title', 'Most of the day-to-day lives on Instagram', 'Pjesa më e madhe e ditës jetohet në Instagram'),
        row('Instagram body', 'The naps, the first time they use the litter box, the night they finally purr. We post it all there, as it happens.', 'Gjumët, hera e parë në kutinë e rërës, nata kur më në fund gërhasin nga kënaqësia. E postojmë gjithçka atje, ndërsa ndodh.'),
        row('Final CTA title', 'Come meet a kitten', 'Eja të njohësh një kotele'),
        row('Final CTA text', 'The fastest way to reach us is a message on Instagram. Even just to ask a question.', 'Mënyra më e shpejtë për të na kontaktuar është një mesazh në Instagram. Qoftë edhe vetëm për të pyetur.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- THE CATS ----------
      h1('Page: The Cats'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/cats/'),
      table([
        row('Page title', 'The kittens with us now', 'Kotelet që kemi tani'),
        row('Intro', 'Each one lives in our home until the right family shows up. Below is who they are: their story, their health, and the small things that make them themselves.', 'Secili jeton në shtëpinë tonë derisa të vijë familja e duhur. Më poshtë je kush janë: historia e tyre, shëndeti dhe gjërat e vogla që i bëjnë vetvete.'),
        row('Intro (2)', 'If one of them stays with you while you read, that is usually a good sign.', 'Nëse njëri prej tyre të mbetet në mendje ndërsa lexon, zakonisht është shenjë e mirë.'),
        row('Sub-section title', 'Thinking about it?', 'Po mendon për të?'),
        row('Sub-section body', 'There is no form and no waiting list. You send us a message, we get to know each other, and the kitten settles in. Here is how it goes.', 'Nuk ka formular dhe nuk ka listë pritjeje. Na dërgon një mesazh, njihemi, dhe kotelja mësohet me shtëpinë. Ja si ndodh.'),
        row('CTA title', 'Want to meet one of them?', 'Do të njohësh njërin prej tyre?'),
        row('CTA text', 'Send us a message on Instagram. Even just to ask a question about a kitten.', 'Na dërgo një mesazh në Instagram. Qoftë edhe vetëm për të pyetur për një kotele.'),
      ]),

      // ---------- HAPPY TAILS ----------
      h1('Page: Happy Tails'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/happy-tails/'),
      table([
        row('Page title', 'The ones who made it', 'Ata që ia dolën'),
        row('Intro', 'Every kitten here started the same way: alone, small, somewhere in Tirana. Then a family came, and the story got a better ending.', 'Çdo kotele këtu nisi njësoj: vetëm, e vogël, diku në Tiranë. Pastaj erdhi një familje, dhe historia mori një fund më të mirë.'),
        row('Intro (2)', 'We keep them here so you can see how it goes.', 'I mbajmë këtu që të shohësh si shkon.'),
        row('Closing title', 'Meet the kittens who need a home now', 'Njihu me kotelet që kanë nevojë për shtëpi tani'),
        row('Closing body', 'There is usually a little one with us, waiting for the same kind of ending.', 'Zakonisht kemi një të vogël me ne, që pret të njëjtin lloj fundi.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- HOW ADOPTION WORKS ----------
      h1('Page: How Adoption Works'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/how-adoption-works/'),
      table([
        row('Page title', 'How adoption works', 'Si funksionon adoptimi'),
        row('Intro', 'There is no office, no paperwork pile, no waiting list. It is two people making sure a kitten goes to the right home. That is it.', 'Nuk ka zyrë, nuk ka grumbull letrash, nuk ka listë pritjeje. Janë dy njerëz që sigurohen që një kotele të shkojë në shtëpinë e duhur. Kaq.'),
        row('Step 1 — title', 'You message us', 'Na shkruan'),
        row('Step 1 — text', 'Send us a message on Instagram. Even just to ask a question is fine. Tell us a little about you and your home.', 'Na dërgo një mesazh në Instagram. Qoftë edhe vetëm për të pyetur. Na trego pak për ty dhe shtëpinë tënde.'),
        row('Step 2 — title', 'We get to know each other', 'Njihemi me njëri-tjetrin'),
        row('Step 2 — text', 'We chat. You ask us anything about the kitten, and we ask you a few things too. No test, no pressure. We just want the match to be right.', 'Bisedojmë. Na pyet çfarë të duash për kotelen, dhe të pyesim edhe ne ca gjëra. Pa test, pa presion. Duam vetëm që përputhja të jetë e duhura.'),
        row('Step 3 — title', 'An honest conversation', 'Një bisedë e sinqertë'),
        row('Step 3 — text', 'We are straight with you about the kitten: the good, and the parts that need patience. A young cat needs time, care, and a bit of mess tolerated. Better to know now.', 'Jemi të drejtpërdrejtë me ty për kotelen: e mira, dhe pjesët që kërkojnë durim. Një mace e re ka nevojë për kohë, kujdes dhe pak rrëmujë të toleruar. Më mirë ta dish që tani.'),
        row('Step 4 — title', 'The kitten settles in', 'Kotelja mësohet me shtëpinë'),
        row('Step 4 — text', 'When it feels right, the kitten comes to you and takes a few days to find its feet. We stay reachable. If something comes up, you write to us.', 'Kur ndihet e duhura, kotelja vjen te ti dhe i duhen ca ditë të gjejë vetveten. Mbetemi të arritshëm. Nëse del diçka, na shkruan.'),
        row('Step 5 — title', 'Home for good', 'Shtëpi për gjithmonë'),
        row('Step 5 — text', 'That is the part we do all this for. And we love a photo now and then, if you feel like sending one.', 'Kjo është pjesa për të cilën e bëjmë të gjithë këtë. Dhe na pëlqen një foto herë pas here, po të kesh dëshirë.'),
        row('Honesty title', 'What we don’t do', 'Çfarë nuk bëjmë'),
        row('Honesty body', 'We don’t rush a match, and we don’t hand a kitten to just anyone. If a home isn’t right, we say so, kindly. It’s not about you; it’s about a small cat that only gets one new start.', 'Nuk e nxitojmë një përputhje, dhe nuk ia japim kotelen kujtdo. Nëse një shtëpi nuk është e duhura, e themi, me mirësjellje. Nuk ka të bëjë me ty; ka të bëjë me një mace të vogël që merr vetëm një fillim të ri.'),
        row('CTA title', 'Ready to start?', 'Gati për të nisur?'),
        row('CTA text', 'A message on Instagram is all it takes.', 'Mjafton një mesazh në Instagram.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- ABOUT ----------
      h1('Page: About Us'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/about/'),
      table([
        row('Page title', 'About us', 'Rreth nesh'),
        row('Intro', 'We’re Lua and Davide, and we live in Tirana. Not an association, not a shelter, not a team with a donation box. Two people with a home, and every so often that home has a kitten in it.', 'Jemi Lua dhe Davide, dhe jetojmë në Tiranë. As shoqatë, as strehë, as ekip me një kuti dhurimesh. Dy njerëz me një shtëpi, dhe herë pas here ajo shtëpi ka një kotele brenda.'),
        row('Section title', 'How it started', 'Si nisi'),
        row('Section body  [check]', '[TO CONFIRM the real story] It started with one kitten we couldn’t walk past. There are a lot of stray cats in this city. We can’t help all of them, so we help one at a time, properly.', '[Për të konfirmuar historinë e vërtetë] Nisi me një kotele pranë së cilës nuk kaluam dot. Ka shumë mace endacake në këtë qytet. Nuk mund t’i ndihmojmë të gjitha, kështu që ndihmojmë një nga një, si duhet.'),
        row('Section title', 'What fostering actually means', 'Çfarë do të thotë vërtet strehim'),
        row('Section body', 'Every kitten passes through our home. It sleeps here, eats here, learns the litter box here. We get it healthy: dewormed, checked, and cared for until it’s strong enough. Then we look, without rushing, for a family that fits.', 'Çdo kotele kalon nga shtëpia jonë. Fle këtu, ha këtu, mëson kutinë e rërës këtu. E bëjmë të shëndetshme: e çvërmojmë, e kontrollojmë dhe kujdesemi derisa të jetë mjaft e fortë. Pastaj kërkojmë, pa nxitim, një familje që i shkon.'),
        row('Section body (2)', 'For a while our couch belongs to a small cat. Then it moves on, and the couch is ours again. Until the next one.', 'Për një kohë divani ynë i përket një maceje të vogël. Pastaj ajo ikën, dhe divani është përsëri yni. Deri te tjetra.'),
        row('Section title', 'Why we do it', 'Pse e bëjmë'),
        row('Section body', 'Because a kitten that would have grown up on the street gets a warm room instead, and then a family. That is a good enough reason for us.', 'Sepse një kotele që do të ishte rritur në rrugë merr në vend të saj një dhomë të ngrohtë, dhe pastaj një familje. Kjo është arsye e mjaftueshme për ne.'),
        row('CTA title', 'Come say hello', 'Eja të përshendetesh'),
        row('CTA text', 'The day-to-day lives on Instagram. Come see it, and write to us any time.', 'Përditsëmëria jeton në Instagram. Eja ta shohësh, dhe na shkruaj kur të duash.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- CONTACT ----------
      h1('Page: Contact Us'),
      pageUrl('keryxdesign.github.io/tinypaws-heaven/contact/'),
      table([
        row('Page title', 'Contact us', 'Na kontakto'),
        row('Intro', 'The easiest way to reach us is a message on Instagram. That is where we are most of the day, between one photo and the next.', 'Mënyra më e lehtë për të na kontaktuar është një mesazh në Instagram. Aty jemi pjesën më të madhe të ditës, mes një fotoje dhe tjetrës.'),
        row('Channel title', 'Instagram', 'Instagram'),
        row('Channel line', 'Send us a direct message. We read every one.', 'Na dërgo një mesazh direkt. I lexojmë të gjithë.'),
        row('Closing title', 'Write us for anything', 'Na shkruaj për çfarëdo gjëje'),
        row('Closing body', 'To meet a kitten, to ask how adoption works, or just to say hello. There is no form to fill in. Just a message, from you to us.', 'Për të njohur një kotele, për të pyetur si funksionon adoptimi, ose thjesht për të përshendetur. Nuk ka formular për të plotësuar. Vetëm një mesazh, nga ti te ne.'),
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // ---------- KITTEN PROFILES ----------
      h1('Kitten profiles'),
      pageUrl('One block per kitten. These fill the cards on The Cats and Happy Tails. To add a new kitten, copy a block and send it to Keryx with the photos.'),

      h2('Cinnamon  —  Adopted (Happy Tails)'),
      table([
        row('Emotional title', 'From a café corner in Tirana to a home of her own', 'Nga një cep kafeneje në Tiranë te një shtëpi e sajja'),
        row('Age', '2 months old', '2 muajsh'),
        row('One line', 'around 600 grams when we found her', 'rreth 600 gramë kur e gjetëm'),
        row('Sex', 'Female', 'Femrë'),
        row('How we found her', 'Cinnamon was on her own near a café in Tirana. No mother, no littermates. Just a very small kitten in a big city.', 'Cinnamon ishte vetëm pranë një kafeneje në Tiranë. Pa nënë, pa vëllezër e motra. Vetëm një kotele shumë e vogël në një qytet të madh.'),
        row('What she is like', 'Sweet, playful, and quick to trust. She loved being close to people and would climb up for a cuddle without being asked.\n\nWhen she played, she played gently. Claws in, careful with your hands. A calm, well-balanced little cat, and a clever one.', 'E ëmbël, lozonjare dhe e gatshme të besojë. I pëlqente të rrinte pranë njerëzve dhe ngjitej për një përqafim pa ia kërkuar askush.\n\nKur luante, luante butë. Me thonjtë brenda, e kujdesshme me duart e tua. Një mace e qetë, e ekuilibruar dhe e zgjuar.'),
        row('Health', 'Vaccinated: in progress · Dewormed: yes · Litter-trained: yes · Eats solid food: yes', 'I vaksinuar: në proces · I çvërmuar: po · Kutia e rërës: po · Ushqim i ngurtë: po'),
        row('Gets along with', 'Children: yes · Other cats: yes · Dogs: yes', 'Fëmijë: po · Mace të tjera: po · Qen: po'),
        row('Happy ending', 'Cinnamon is now adopted. From 600 grams by a café to a lap of her own. That is the whole point of what we do.', 'Cinnamon tani është adoptuar. Nga 600 gramë pranë një kafeneje te një prehër i saji. Kjo është arsyeja e gjithçkaje që bëjmë.'),
        row('Photos', '[NEEDED: real photos of Cinnamon]', '[NEVOJITEN: foto reale të Cinnamon]'),
      ]),

      h2('Mushi  —  Looking for a home (The Cats)'),
      pageUrl('This profile is a placeholder. Replace the [TO FILL] parts with Mushi’s real details and send photos.'),
      table([
        row('Emotional title', 'The little one who’s still with us', 'I vogli që është ende me ne'),
        row('Age', '[TO FILL: e.g. 3 months old]', '[PëR TË PLOTËSUAR: p.sh. 3 muajsh]'),
        row('One line', 'the kitten in our care right now', 'kotelja që kemi në kujdes tani'),
        row('Sex', '[TO FILL: female / male]', '[PëR TË PLOTËSUAR: femrë / mashkull]'),
        row('How we found Mushi  [to fill]', '[TO FILL: where and when we found Mushi, and in what state.] Placeholder now shown: We are still writing Mushi’s story properly. Mushi came to us recently, here in Tirana, and is settling in.', '[PëR TË PLOTËSUAR] Ende po e shkruajmë historinë e Mushit siç duhet. Mushi erdhi te ne së fundmi, këtu në Tiranë, dhe po mësohet me shtëpinë.'),
        row('What Mushi is like  [to fill]', '[TO FILL: personality in a few short lines, one very specific detail.]', '[PëR TË PLOTËSUAR: karakteri në pak rreshta, një detaj shumë specifik.]'),
        row('Health  [to fill]', '[TO FILL: Vaccinated / Dewormed / Neutered / Litter-trained]', '[PëR TË PLOTËSUAR: I vaksinuar / I çvërmuar / I sterilizuar / Kutia e rërës]'),
        row('Gets along with  [to fill]', '[TO FILL: Children / Other cats / Dogs]', '[PëR TË PLOTËSUAR: Fëmijë / Mace të tjera / Qen]'),
        row('Photos', '[NEEDED: real photos of Mushi]', '[NEVOJITEN: foto reale të Mushit]'),
      ]),

      // ---------- STILL NEEDED ----------
      h1('Still needed (to finish the site)'),
      table([
        row('Mushi', 'Photos + details: age, sex, personality, health, how you found Mushi.', 'Foto + detaje: mosha, gjinia, karakteri, shëndeti, si e gjetët Mushin.'),
        row('Cinnamon', 'Real photos of Cinnamon for her card.', 'Foto reale të Cinnamon për kartën e saj.'),
        row('About Us', 'The true story of how it started (one or two lines).', 'Historia e vërtetë se si nisi (një ose dy rreshta).'),
        row('Instagram photos', '6–9 nice photos to show as a small grid on the site (optional).', '6–9 foto të bukura për t’u shfaqur si një rrjet i vogël (opsionale).'),
        row('Facebook', 'The Facebook page link, if you want it added.', 'Lidhja e faqes Facebook, nëse doni ta shtojmë.'),
      ]),

      new Paragraph({ spacing: { before: 300 }, children: [new TextRun({ text: 'Prepared by Keryx Design · 2026 · Instagram @tinypawshaven7', italics: true, color: SLATE, size: 18 })] }),
    ],
  }],
});

const OUT = process.argv[2] || require('path').join(__dirname, '..', 'content', 'Testi Sito Tiny Paws Haven 7.docx');
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log('written:', OUT, buf.length, 'bytes'); });
