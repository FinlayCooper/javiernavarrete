/**
 * Single source of truth for everything on the site the client will want changed.
 *
 * These are plain exports for now. When the admin UI lands, swap the bodies for
 * data-layer reads — the exported types are the contract the pages depend on, so
 * nothing in `src/components` or `src/app` has to change.
 */

export type Section = {
  /** URL segment, e.g. "about" -> /about */
  slug: string;
  /** Nav label and the word shown on the section's own page */
  label: string;
  /** Background photo in /public/backgrounds */
  image: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type NewsPost = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-09-03" */
  date: string;
  body: string;
};

export const siteName = "Javier Navarrete";

/** Order matches the bottom nav in the approved design. */
export const sections: Section[] = [
  { slug: "about", label: "ABOUT", image: "/backgrounds/about.webp" },
  { slug: "movies", label: "MOVIES", image: "/backgrounds/movies.webp" },
  { slug: "media", label: "MEDIA", image: "/backgrounds/media.webp" },
  { slug: "opera", label: "OPERA", image: "/backgrounds/opera.webp" },
  { slug: "library", label: "LIBRARY", image: "/backgrounds/library.webp" },
  { slug: "news", label: "NEWS", image: "/backgrounds/news.webp" },
  { slug: "contact", label: "CONTACT", image: "/backgrounds/contact.webp" },
];

export const coverImage = "/backgrounds/cover.webp";

// TODO: replace with the client's real profile URLs.
export const socials: SocialLink[] = [
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
  { label: "Apple Music", href: "#" },
];

// TODO: replace with the client's real address.
export const contactEmail = "hello@example.com";

/** Empty until the admin UI can write to it. */
export const newsPosts: NewsPost[] = [];

export function getSection(slug: string): Section {
  const section = sections.find((s) => s.slug === slug);
  if (!section) throw new Error(`Unknown section: ${slug}`);
  return section;
}

/** A single audio cue. Paths live under /public/audio. */
export type Track = {
  src: string;
  /** Shown in the player, as in the mock-up ("GÜNTER"). */
  title: string;
};

/** Intrinsic size travels with the file so next/image can reserve the box. */
export type Poster = {
  /** Path under /public/posters */
  src: string;
  width: number;
  height: number;
};

export type Film = {
  /** URL-safe id; also the poster filename. */
  slug: string;
  title: string;
  poster: Poster;
  /**
   * The cue that plays on this film's row. Undefined until the client sends
   * the audio — the row then renders poster and title with no player.
   */
  track?: Track;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  /** Cover art in /public/albums. Undefined until the client sends it. */
  cover?: string;
  track?: Track;
  /** Two territories: APM for the US, Extreme for everywhere else. */
  links: SocialLink[];
};

/**
 * The About copy, verbatim from the client's content doc, one entry per
 * paragraph.
 */
export const bio: string[] = [
  "Javier Navarrete was born in Teruel, Spain in 1956.",
  "At the age of thirteen, in the wake of the emerging psychedelic scene, he began to play the guitar and take music reading and piano lessons.",
  "In 1973, he moved to Barcelona, where he studied under Chilean composer Gabriel Brncic. During this time, Navarrete was active in the city’s unfolding avant-garde scene, collaborating with musicians like Carles Santos, Eduardo Polonia and Alberto Iglesias.",
  "His first compositions were electronic, consisting of meticulous tape montages of analog synthesizer sounds. He then returned to writing on paper, taking a minimalist approach that evolved with the inclusion of eclectic influences: liturgical music, impressionism and musical traditions over the world.",
  "His first assignments as a composer were for theater and contemporary dance groups.",
  "In 1986, he composed his first score for Tras el Cristal (In a Glass Cage), a film by Agustín Villaronga inspired by the story of Gilles de Rais, which remains a cult classic to this day.",
  "He worked on several Spanish and British film scores before his work with Guillermo del Toro: Devil’s Backbone (2001) and Pan’s Labyrinth (2006), the latter of which earned him nominations for the Academy Award and Grammy.",
  "Following this feat, he worked with American and European directors such as Neil Jordan, Joe Dante and Scott Cooper. To date, he has composed scores for over 50 films and series.",
  "The score for Hemingway and Gellhorn, directed by Philip Kaufman and starring Nicole Kidman and Clive Owen, earned him an Emmy Award in 2012.",
  "Navarrete is the author of an opera titled Los Amantes, produced with local talent in 2017 and 2018 in his hometown, based on the medieval legend of two star-crossed lovers in the city of Teruel.",
  "According to a 2017 IndieWire ranking, Javier was deemed one of the top 12 composers of the 21st Century.",
  "Currently, he is working on compiling his electronic music from throughout the years.",
];

/**
 * Order is the content doc's own. It labels the list "chronological"; note that
 * Raoul Taburin (2018) sits last there, after Sound of Freedom (2023) — kept as
 * the client wrote it rather than silently resorted.
 *
 * The doc asks for "no additional info about the movie" beyond the title, so
 * there is deliberately no year or director here.
 */
/** Sourced from the content doc. See LOW_RES_POSTERS for the two that need replacing. */
export const films: Film[] = [
  { slug: "in-a-glass-cage", title: "In a Glass Cage", poster: { src: "/posters/in-a-glass-cage.webp", width: 190, height: 281 }, track: { src: "/audio/in-a-glass-cage.mp3", title: "Ritual" } },
  { slug: "devils-backbone", title: "Devil’s Backbone", poster: { src: "/posters/devils-backbone.webp", width: 900, height: 1350 }, track: { src: "/audio/devils-backbone.mp3", title: "Eso soy yo" } },
  { slug: "pans-labyrinth", title: "Pan’s Labyrinth", poster: { src: "/posters/pans-labyrinth.webp", width: 900, height: 1343 }, track: { src: "/audio/pans-labyrinth.mp3", title: "A Princess" } },
  { slug: "cracks", title: "Cracks", poster: { src: "/posters/cracks.webp", width: 300, height: 409 }, track: { src: "/audio/cracks.mp3", title: "Out of Bounds / Seduction" } },
  { slug: "hemingway-and-gellhorn", title: "Hemingway and Gellhorn", poster: { src: "/posters/hemingway-and-gellhorn.webp", width: 900, height: 1333 }, track: { src: "/audio/hemingway-and-gellhorn.mp3", title: "The Joy of Irrigation" } },
  { slug: "wrath-of-the-titans", title: "Wrath of the Titans", poster: { src: "/posters/wrath-of-the-titans.webp", width: 610, height: 904 }, track: { src: "/audio/wrath-of-the-titans.mp3", title: "Cyclops / To the Battle" } },
  { slug: "byzantium", title: "Byzantium", poster: { src: "/posters/byzantium.webp", width: 900, height: 1200 }, track: { src: "/audio/byzantium.mp3", title: "Whore" } },
  { slug: "zhongkui", title: "Zhongkui: Snow Girl and the Dark Crystal", poster: { src: "/posters/zhongkui.webp", width: 900, height: 1257 }, track: { src: "/audio/zhongkui.mp3", title: "Little Snow / If I Were a Demon" } },
  { slug: "antlers", title: "Antlers", poster: { src: "/posters/antlers.webp", width: 900, height: 1350 }, track: { src: "/audio/antlers.mp3", title: "Face Off / Aiden Is Just Sick" } },
  { slug: "sound-of-freedom", title: "Sound of Freedom", poster: { src: "/posters/sound-of-freedom.webp", width: 900, height: 1260 }, track: { src: "/audio/sound-of-freedom.mp3", title: "Sound of Freedom" } },
  { slug: "raoul-taburin", title: "Raoul Taburin", poster: { src: "/posters/raoul-taburin.webp", width: 900, height: 1350 }, track: { src: "/audio/raoul-taburin.mp3", title: "Rêverie" } },
];

/** The two library albums, licensable through APM (US) and Extreme (elsewhere). */
export const albums: Album[] = [
  {
    slug: "winter-gothic",
    title: "Winter Gothic",
    description:
      "Winter-themed cinematic cues with a darkly romantic edge, recorded at Abbey Road with live orchestra and the Trinity Boys Choir.",
    track: { src: "/audio/winter-gothic.mp3", title: "Grundtvig Prayer" },
    links: [
      { label: "United States (APM)", href: "https://www.apmmusic.com/albums/KPM-2080/KPM_KPM_2080_00901" },
      {
        label: "Outside the US (Extreme)",
        href: "https://www.extrememusic.com/albums/10186?match=eyJpZHMiOlsyNDgzNzRdLCJxIjoiV2ludGVyIEdvdGhpYyJ9",
      },
    ],
  },
  {
    slug: "states-of-mind",
    title: "States of Mind",
    description:
      "Cinematic minimalism exploring human emotions, recorded at British Grove Studios in London.",
    track: { src: "/audio/states-of-mind.mp3", title: "Panic" },
    links: [
      { label: "United States (APM)", href: "https://www.apmmusic.com/albums/KPM-2002/KPM_KPM_2002_01301" },
      {
        label: "Outside the US (Extreme)",
        href: "https://www.extrememusic.com/albums/10108?match=eyJpZHMiOlsyNDcwOThdLCJxIjoiU3RhdGVzIG9mIE1pbmQifQ%3D%3D",
      },
    ],
  },
];

/**
 * These two came through the content doc at thumbnail size and will look soft
 * beside the rest. The doc offers: "If you need me to find a higher resolution
 * image of the poster, LMK!" — ask, then drop the replacement into
 * /public/posters and update the width/height above.
 */
export const LOW_RES_POSTERS = ["in-a-glass-cage", "cracks"] as const;

/** A photo in the /opera carousel. All are 3:2 landscape, so no per-photo size. */
export type OperaPhoto = {
  /** Path under /public/opera */
  src: string;
  alt: string;
};

/** From the client's "fotos opera" folder, first and last kept where the filenames put them. */
export const operaPhotos: OperaPhoto[] = [
  { src: "/opera/primera.webp", alt: "Musicians and a dancer among candles and scattered flowers on the church floor" },
  { src: "/opera/mg-5898.webp", alt: "A bearded singer in a dark tunic mid-aria, dancers behind him" },
  { src: "/opera/mg-6019.webp", alt: "A line of robed clergy holding candles and censers" },
  { src: "/opera/isabel.webp", alt: "Isabel in white, singing before the gilded altarpiece" },
  { src: "/opera/costumes.webp", alt: "A spectral figure touching Juan’s face in front of the altarpiece" },
  { src: "/opera/make-up.webp", alt: "Juan, face darkened, in a pale shawl beside a masked figure" },
  { src: "/opera/drums.webp", alt: "Hooded drummers striking the bass drums in the candlelit nave" },
  { src: "/opera/ultima.webp", alt: "The choir in white along the carved gallery, lit gold against blue" },
  { src: "/opera/representacion.webp", alt: "A figure in red standing over a fallen man, candles all around" },
];

export type OperaSection = {
  heading: string;
  body: string;
};

/** The Opera copy, verbatim from the content doc. */
export const operaText: OperaSection[] = [
  {
    heading: "Plot",
    body: "XIII Century Teruel: Youthful commoner Juan de Marcilla, hoping to become worthy enough of marrying his childhood love, the noble Isabel de Segura, leaves Teruel to build his fortune. Five years later, he returns home sickly and wounded, only to find that Isabel has married Don Pedro de Azagra. Devastated, he receives a visit in his dreams by magic healers Saint Cosme and Saint Damian, who help lift his curse and encourage him to reunite with Isabel against all social sanctions.",
  },
  {
    heading: "Production",
    body: "Produced by the Fundación Amantes de Teruel, the Los Amantes opera was performed in 2017 and 2018 in the gothic Church of San Pedro, enveloped in the setting’s unique artistic treasures and passionately displaying the best of local talent. Soloists, male and children choirs, three instrumental ensembles, two giant bass drums custom built for the production, church bells, make-up and lighting artists, choreographers, sculptors and painters all worked together in the creative journey that delved deeper into the myth and emotion of the Lovers.",
  },
  {
    heading: "Tradition",
    body: "The tradition behind the Lovers of Teruel has been passed on through generations for eight hundred years as the epitome of courtly love. Adapted by poets, playwrights and composers across five centuries, and crucially rooted in popular imagination and storytelling, the legend of the lovers lives between the Middle Ages and Romanticism. While love, death, adventure and homecoming drive the original story, Navarrete’s version also explores themes of violence between classes, spiritual healing and the meaning of dreams.",
  },
];
