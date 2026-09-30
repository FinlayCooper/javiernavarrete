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

/** A linked phrase inside a paragraph. */
export type InlineLink = {
  text: string;
  href: string;
};

/** A paragraph of copy: plain, or a run of text with linked phrases in it. */
export type Paragraph = string | (string | InlineLink)[];

/** The paragraph with its links flattened to their text, e.g. for meta tags. */
export function plainText(paragraph: Paragraph): string {
  return typeof paragraph === "string"
    ? paragraph
    : paragraph.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

export type NewsPost = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-09-03". Optional; not every post comes with one. */
  date?: string;
  /** Shown under the title. Path under /public/news. */
  image?: { src: string; width: number; height: number; alt: string };
  body: Paragraph[];
  /** Streaming links shown under the post, e.g. for a score it mentions. */
  listen?: SocialLink[];
};

export const siteName = "Javier Navarrete";

/**
 * Order matches the bottom nav in the approved design. The Media tab (briefly
 * renamed Listen) was cut at the client's request as repetitive of the footer;
 * /media and /listen redirect home.
 */
export const sections: Section[] = [
  { slug: "about", label: "ABOUT", image: "/backgrounds/about.webp" },
  { slug: "movies", label: "MOVIES", image: "/backgrounds/movies.webp" },
  { slug: "opera", label: "OPERA", image: "/backgrounds/opera.webp" },
  { slug: "library", label: "LIBRARY", image: "/backgrounds/library.webp" },
  { slug: "news", label: "NEWS", image: "/backgrounds/news.webp" },
  { slug: "contact", label: "CONTACT", image: "/backgrounds/contact.webp" },
];

export const coverImage = "/backgrounds/cover.webp";

/** Shown in the footer on every page. */
export const socials: SocialLink[] = [
  { label: "YouTube", href: "https://music.youtube.com/channel/UCNbV8jd_rYjyujdV9IBIzAg" },
  { label: "Spotify", href: "https://open.spotify.com/artist/6Ayc7FBYR3HjkGQb7SZrzQ" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/javier-navarrete/186244621" },
];

export const contactEmail = "asianavarretearts@gmail.com";

/** Newest first. Copy verbatim from the content doc's General/Visual tab. */
export const newsPosts: NewsPost[] = [
  {
    id: "pans-labyrinth-20th-anniversary",
    title: "20th Anniversary of Pan’s Labyrinth",
    image: {
      src: "/news/pans-labyrinth-20th.webp",
      width: 399,
      height: 501,
      alt: "Pan’s Labyrinth 20th Anniversary poster: the faun leaning over Ofelia amid twisting branches",
    },
    body: [
      "This autumn marks the 20th anniversary of the Academy Award-winning dark fantasy with a return to the big screen. Pan’s Labyrinth takes place in Franco’s Spain, where young Ofelia escapes into a haunting fantasy realm and embarks on a dangerous mission.",
      [
        "Directed by Guillermo del Toro and scored by Javier Navarrete, this anniversary offers audiences the rare opportunity to experience this modern classic in theaters across the U.S. from October 8—15. For tickets and more information, visit the ",
        { text: "official re-release site", href: "https://panslabyrinth20.com/" },
        ".",
      ],
    ],
    listen: [
      { label: "YouTube", href: "https://youtube.com/playlist?list=PLRW80bBvVD3UApJXm-hJA9IvKkweu_uls" },
      { label: "Spotify", href: "https://open.spotify.com/album/5b5tWFo32wYBLMweeiL8vE" },
      { label: "Apple Music", href: "https://music.apple.com/ca/album/pans-labyrinth-original-motion-picture-soundtrack/1535111909" },
    ],
  },
];

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
  /**
   * Length in whole seconds, so the player can show it without fetching the
   * file first. Get it with `ffprobe -v error -show_entries format=duration -of csv=p=0 <file>`.
   */
  duration: number;
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
  /** The score's album on Spotify, linked as "Keep Listening" under the player. */
  album?: string;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  /** Cover art in /public/albums; without one the card shows a "Cover to come" tile. */
  cover?: string;
  track?: Track;
  /** Streaming, for people who just want to hear it. */
  listen: SocialLink[];
  /** Licensing is split by territory: APM in the US, Extreme everywhere else. */
  license: LicenseLink[];
};

export type LicenseLink = SocialLink & {
  /** The library behind the link; kept out of the visible label, which names the territory. */
  library: string;
};

/**
 * The About copy, verbatim from the client's content doc, one entry per
 * paragraph.
 */
export const bio: Paragraph[] = [
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
  [
    "According to a ",
    {
      text: "2017 IndieWire ranking",
      href: "https://www.indiewire.com/features/general/best-of-top-12-composers-of-the-21st-century-list-1201862553/",
    },
    ", Javier was deemed one of the top 12 composers of the 21st Century.",
  ],
  "Currently, he is working on compiling his electronic music from throughout the years.",
];

/** A photo with its intrinsic size and a photographer credit. */
export type CreditedPhoto = {
  /** Path under /public */
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
};

/**
 * Portrait for the bottom of /about. Undefined until the client sends it — the
 * page then shows nothing in its place. When it arrives, drop it in
 * /public/about/ and fill this in, e.g.
 * `{ src: "/about/portrait.webp", width, height, alt: "Javier Navarrete", photographer: "Jean-Jacques Annaud" }`.
 */
export const aboutPhoto: CreditedPhoto | undefined = undefined;

/**
 * Order is the content doc's own. It labels the list "chronological"; note that
 * Raoul Taburin (2018) sits last there, after Sound of Freedom (2023) — kept as
 * the client wrote it rather than silently resorted.
 *
 * The doc asks for "no additional info about the movie" beyond the title, so
 * there is deliberately no year or director here.
 */
/** Sourced from the content doc; the soft ones replaced with larger copies of the same artwork. */
export const films: Film[] = [
  { slug: "in-a-glass-cage", title: "In a Glass Cage", poster: { src: "/posters/in-a-glass-cage.webp", width: 720, height: 1026 }, track: { src: "/audio/in-a-glass-cage.mp3", title: "Ritual", duration: 408 } },
  { slug: "devils-backbone", title: "Devil’s Backbone", poster: { src: "/posters/devils-backbone.webp", width: 720, height: 1080 }, track: { src: "/audio/devils-backbone.mp3", title: "Eso soy yo", duration: 174 }, album: "https://open.spotify.com/album/5jnf0YsCbky09dkhAamHcu" },
  { slug: "pans-labyrinth", title: "Pan’s Labyrinth", poster: { src: "/posters/pans-labyrinth.webp", width: 720, height: 1074 }, track: { src: "/audio/pans-labyrinth.mp3", title: "A Princess", duration: 244 }, album: "https://open.spotify.com/album/5b5tWFo32wYBLMweeiL8vE" },
  { slug: "cracks", title: "Cracks", poster: { src: "/posters/cracks.webp", width: 720, height: 1080 }, track: { src: "/audio/cracks.mp3", title: "Out of Bounds / Seduction", duration: 286 }, album: "https://open.spotify.com/album/6jcdFGK4BiOGc3hbXkkgxT" },
  { slug: "hemingway-and-gellhorn", title: "Hemingway and Gellhorn", poster: { src: "/posters/hemingway-and-gellhorn.webp", width: 720, height: 1066 }, track: { src: "/audio/hemingway-and-gellhorn.mp3", title: "The Joy of Irrigation", duration: 174 }, album: "https://open.spotify.com/album/4bpglRxu8xvO0Pjt76IjHs" },
  { slug: "wrath-of-the-titans", title: "Wrath of the Titans", poster: { src: "/posters/wrath-of-the-titans.webp", width: 720, height: 1067 }, track: { src: "/audio/wrath-of-the-titans.mp3", title: "Cyclops / To the Battle", duration: 440 }, album: "https://open.spotify.com/album/3LNisntgd0P3SlJY0X0RmZ" },
  { slug: "byzantium", title: "Byzantium", poster: { src: "/posters/byzantium.webp", width: 720, height: 960 }, track: { src: "/audio/byzantium.mp3", title: "Whore", duration: 189 }, album: "https://open.spotify.com/album/6L0Zq3lBNbiq16uYASfMQc" },
  { slug: "zhongkui", title: "Zhongkui: Snow Girl and the Dark Crystal", poster: { src: "/posters/zhongkui.webp", width: 720, height: 1006 }, track: { src: "/audio/zhongkui.mp3", title: "Little Snow / If I Were a Demon", duration: 214 }, album: "https://open.spotify.com/album/44erO4UfQqWGSlv73O4nSo" },
  { slug: "antlers", title: "Antlers", poster: { src: "/posters/antlers.webp", width: 720, height: 1080 }, track: { src: "/audio/antlers.mp3", title: "Face Off / Aiden Is Just Sick", duration: 448 }, album: "https://open.spotify.com/album/2qfLia4kxG1AvcauAnTsdf" },
  { slug: "sound-of-freedom", title: "Sound of Freedom", poster: { src: "/posters/sound-of-freedom.webp", width: 720, height: 1008 }, track: { src: "/audio/sound-of-freedom.mp3", title: "Sound of Freedom", duration: 217 }, album: "https://open.spotify.com/album/5tUwBlIdWi25jFdXbimk7V" },
  { slug: "raoul-taburin", title: "Raoul Taburin", poster: { src: "/posters/raoul-taburin.webp", width: 720, height: 1080 }, track: { src: "/audio/raoul-taburin.mp3", title: "Rêverie", duration: 244 } },
];

/** The two library albums: streamable, and licensable through APM (US) or Extreme (elsewhere). */
export const albums: Album[] = [
  {
    slug: "winter-gothic",
    title: "Winter Gothic",
    description:
      "Winter-themed cinematic cues with a darkly romantic edge, recorded at Abbey Road with live orchestra and the Trinity Boys Choir.",
    cover: "/albums/winter-gothic.webp",
    track: { src: "/audio/winter-gothic.mp3", title: "Grundtvig Prayer", duration: 225 },
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/album/7eV1PyQMHhu3qALBdc1Qx0" },
      { label: "Apple Music", href: "https://music.apple.com/us/album/javier-navarrete-winter-gothic/1458868228" },
    ],
    license: [
      { label: "United States", library: "APM", href: "https://www.apmmusic.com/albums/KPM-2080/KPM_KPM_2080_00901" },
      {
        label: "Rest of world",
        library: "Extreme Music",
        href: "https://www.extrememusic.com/albums/10186?match=eyJpZHMiOlsyNDgzNzRdLCJxIjoiV2ludGVyIEdvdGhpYyJ9",
      },
    ],
  },
  {
    slug: "states-of-mind",
    title: "States of Mind",
    description:
      "Cinematic minimalism exploring human emotions, recorded at British Grove Studios in London.",
    cover: "/albums/states-of-mind.webp",
    track: { src: "/audio/states-of-mind.mp3", title: "Panic", duration: 249 },
    listen: [
      { label: "Spotify", href: "https://open.spotify.com/album/7eJM0VlEFDVZfkLXVSCxTA" },
      { label: "Apple Music", href: "https://music.apple.com/us/album/javier-navarrete-states-of-mind/1194463843" },
    ],
    license: [
      { label: "United States", library: "APM", href: "https://www.apmmusic.com/albums/KPM-2002/KPM_KPM_2002_01301" },
      {
        label: "Rest of world",
        library: "Extreme Music",
        href: "https://www.extrememusic.com/albums/10108?match=eyJpZHMiOlsyNDcwOThdLCJxIjoiU3RhdGVzIG9mIE1pbmQifQ%3D%3D",
      },
    ],
  },
];

/** A photo in the /opera carousel. All are 3:2 landscape, so no per-photo size. */
export type OperaPhoto = {
  /** Path under /public/opera */
  src: string;
  alt: string;
};

/** In the order the client set in the doc's Feedback tab. */
export const operaPhotos: OperaPhoto[] = [
  { src: "/opera/primera.webp", alt: "Musicians and a dancer among candles and scattered flowers on the church floor" },
  { src: "/opera/isabel.webp", alt: "Isabel in white, singing before the gilded altarpiece" },
  { src: "/opera/costumes.webp", alt: "A spectral figure touching Juan’s face in front of the altarpiece" },
  { src: "/opera/mg-6019.webp", alt: "A line of robed clergy holding candles and censers" },
  { src: "/opera/representacion.webp", alt: "A figure in red standing over a fallen man, candles all around" },
  { src: "/opera/mg-5898.webp", alt: "A bearded singer in a dark tunic mid-aria, dancers behind him" },
  { src: "/opera/make-up.webp", alt: "Juan, face darkened, in a pale shawl beside a masked figure" },
  { src: "/opera/drums.webp", alt: "Hooded drummers striking the bass drums in the candlelit nave" },
  { src: "/opera/ultima.webp", alt: "The choir in white along the carved gallery, lit gold against blue" },
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
