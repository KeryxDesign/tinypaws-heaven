// Stringhe UI bilingui (EN + albanese). Si lavora prima in EN; l'albanese è
// adattamento. Tenere le due colonne sincronizzate: stessa chiave, stesso senso.

export const locales = ['en', 'sq'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Slug di pagina (uguali per entrambe le lingue; SQ vive sotto /sq/)
export const routes = {
  home: '',
  cats: 'cats',
  happy: 'happy-tails',
  how: 'how-adoption-works',
  about: 'about',
  hello: 'contact',
} as const;

export const ui = {
  en: {
    'site.name': 'Tiny Paws Haven 7',
    'site.tagline': 'Foster kittens in Tirana looking for a home',
    'nav.home': 'Home',
    'nav.cats': 'The Cats',
    'nav.happy': 'Happy Tails',
    'nav.how': 'How Adoption Works',
    'nav.about': 'About Us',
    'nav.hello': 'Contact Us',
    'lang.other': 'Shqip',
    'lang.label': 'Language',

    'cta.instagram': 'Message us on Instagram',
    'cta.follow': 'Follow @tinypawshaven7',
    'cta.meet': 'Meet the kittens',
    'cta.happy': 'See the happy tails',
    'cta.hello': 'Contact us',

    'status.adoptable': 'Looking for a home',
    'status.adopted': 'Adopted',
    'badge.new': 'New arrival',

    'health.title': 'What makes {name} perfect for a loving home',
    'health.vaccinated': 'Vaccinated',
    'health.dewormed': 'Dewormed',
    'health.neutered': 'Neutered / spayed',
    'health.litter': 'Litter-trained',
    'health.solid': 'Eats solid food',
    'val.yes': 'yes',
    'val.no': 'not yet',
    'val.progress': 'in progress',
    'val.na': '—',

    'goodwith.title': 'Gets along with',
    'goodwith.kids': 'Children',
    'goodwith.cats': 'Other cats',
    'goodwith.dogs': 'Dogs',
    'gw.yes': 'yes',
    'gw.no': 'no',
    'gw.unknown': 'we don’t know yet',
    'gw.careful': 'with care',

    'card.rescue': 'How we found {name}',
    'card.rescuePast': 'How we found {name}',
    'card.personality': 'What {name} is like',
    'card.personalityPast': 'What {name} was like',
    'card.habit': 'A little habit',
    'card.story': 'A small story',
    'card.happyending': 'A happy ending',

    'cats.empty.title': 'No kittens in foster right now',
    'cats.empty.body': 'It happens, and it’s a good sign: the last ones found their people. The next little face usually turns up sooner than we expect, and we post it on Instagram the day it arrives.',

    'photo.coming': 'Photos coming soon',
    'photo.instagram': 'Newest photos on Instagram',

    'footer.built': 'A small home for small paws, in Tirana.',
    'footer.social': 'Find us on Instagram',
  },

  sq: {
    'site.name': 'Tiny Paws Haven 7',
    'site.tagline': 'Kotele në strehim në Tiranë që kërkojnë një shtëpi',
    'nav.home': 'Ballina',
    'nav.cats': 'Kotelet',
    'nav.happy': 'Fund i lumtur',
    'nav.how': 'Si funksionon adoptimi',
    'nav.about': 'Rreth nesh',
    'nav.hello': 'Na kontakto',
    'lang.other': 'English',
    'lang.label': 'Gjuha',

    'cta.instagram': 'Na shkruaj në Instagram',
    'cta.follow': 'Na ndiq @tinypawshaven7',
    'cta.meet': 'Njihu me kotelet',
    'cta.happy': 'Shiko fundet e lumtura',
    'cta.hello': 'Na kontakto',

    'status.adoptable': 'Në kërkim të një shtëpie',
    'status.adopted': 'Adoptuar',
    'badge.new': 'Sapo ardhur',

    'health.title': 'Pse {name} është i përsosur për një shtëpi plot dashuri',
    'health.vaccinated': 'I vaksinuar',
    'health.dewormed': 'I çvërmuar',
    'health.neutered': 'I sterilizuar',
    'health.litter': 'Mëson tënë kutinë e rerës',
    'health.solid': 'Ha ushqim të ngurtë',
    'val.yes': 'po',
    'val.no': 'ende jo',
    'val.progress': 'në proces',
    'val.na': '—',

    'goodwith.title': 'Shkon mirë me',
    'goodwith.kids': 'Fëmijë',
    'goodwith.cats': 'Mace të tjera',
    'goodwith.dogs': 'Qen',
    'gw.yes': 'po',
    'gw.no': 'jo',
    'gw.unknown': 'ende nuk e dimë',
    'gw.careful': 'me kujdes',

    'card.rescue': 'Si e gjetëm {name}',
    'card.rescuePast': 'Si e gjetëm {name}',
    'card.personality': 'Si është {name}',
    'card.personalityPast': 'Si ishte {name}',
    'card.habit': 'Një zakon i vogël',
    'card.story': 'Një histori e vogël',
    'card.happyending': 'Një fund i lumtur',

    'cats.empty.title': 'Tani nuk kemi kotele në strehim',
    'cats.empty.body': 'Ndodh, dhe është shenjë e mirë: të fundit gjetën njerëzit e tyre. Fytyra tjetër e vogël zakonisht shfaqet më shpejt nga sa presim, dhe e postojmë në Instagram ditën që vjen.',

    'photo.coming': 'Fotot vijnë së shpejti',
    'photo.instagram': 'Fotot më të reja në Instagram',

    'footer.built': 'Një shtëpi e vogël për putra të vogla, në Tiranë.',
    'footer.social': 'Na gjej në Instagram',
  },
} as const;

export const INSTAGRAM_URL = 'https://www.instagram.com/tinypawshaven7/';
export const INSTAGRAM_HANDLE = '@tinypawshaven7';

export function useTranslations(lang: Locale) {
  const dict = ui[lang];
  return function t(key: keyof typeof ui['en'], vars?: Record<string, string>): string {
    let s: string = (dict as Record<string, string>)[key] ?? (ui.en as Record<string, string>)[key] ?? String(key);
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
    return s;
  };
}

// Costruisce un path rispettando base URL e prefisso lingua.
// base es. "/tinypaws-heaven" (import.meta.env.BASE_URL termina con "/").
export function localizedPath(base: string, lang: Locale, slug: string): string {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const parts = [b];
  if (lang !== defaultLocale) parts.push(lang);
  if (slug) parts.push(slug);
  return parts.join('/') + '/';
}
