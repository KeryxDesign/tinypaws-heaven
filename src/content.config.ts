import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Un file per gattino. Testo bilingue (en/sq) nello stesso file per tenere le
// due lingue sincronizzate. Stato, salute e compatibilità sono neutri e vengono
// tradotti dalle stringhe UI (garanzia di sincronia).

const localized = z.object({ en: z.string(), sq: z.string() });
const localizedOpt = z.object({ en: z.string(), sq: z.string() }).partial().optional();

const healthState = z.enum(['yes', 'no', 'progress', 'na']).default('na');
const goodWith = z.enum(['yes', 'no', 'unknown', 'careful']).default('unknown');

const cats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cats' }),
  schema: ({ image }) =>
    z.object({
      status: z.enum(['adoptable', 'adopted']),
      order: z.number().default(0),
      newArrival: z.boolean().default(false),
      dataPending: z.boolean().default(false), // Mushi: dati in arrivo

      sex: z.enum(['female', 'male', 'unknown']).default('unknown'),
      ageLabel: localized, // "2 months old" / "2 muajsh"
      emotionalTitle: localized,
      oneLiner: localized,

      rescue: localized,
      personality: localized,
      habit: localizedOpt,
      story: localizedOpt,
      happyEnding: localizedOpt, // solo adottati

      health: z
        .object({
          vaccinated: healthState,
          dewormed: healthState,
          neutered: healthState,
          litter: healthState,
          solid: healthState,
        })
        .partial()
        .default({}),

      goodWith: z
        .object({ kids: goodWith, cats: goodWith, dogs: goodWith })
        .partial()
        .default({}),

      cover: image().optional(),
      photos: z.array(image()).default([]),
    }),
});

export const collections = { cats };
