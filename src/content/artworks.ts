export interface SacredArtwork { path: string; title: string; author: string; license: string; licenseUrl: string; source: string; position: string; generated?: boolean; smallPath?: string; }
export const ARTWORKS: Record<string, SacredArtwork> = {
"galilee":{"path": "assets/images/galilee.webp", "smallPath": "assets/images/galilee-small.webp", "title": "Khung cảnh Galilê · minh họa AI", "author": "Marian Light Journey", "license": "Minh họa AI", "licenseUrl": "", "source": "", "position": "75% 50%", "generated": true},
"candle":{"path": "assets/images/candle-reflection.webp", "smallPath": "assets/images/candle-reflection-small.webp", "title": "Ánh nến và lời nguyện · minh họa AI", "author": "Marian Light Journey", "license": "Minh họa AI", "licenseUrl": "", "source": "", "position": "75% 50%", "generated": true},

  "virgin-prayer": {"path": "assets/images/virgin-in-prayer.webp", "title": "Đức Maria cầu nguyện", "author": "Giovanni Battista Salvi da Sassoferrato", "license": "Public Domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "source": "https://commons.wikimedia.org/wiki/File:Sassoferrato_-_Jungfrun_i_b%C3%B6n.jpg", "position": "50% 45%"},
  "mary": {
    "path": "assets/images/virgin-annunciate.webp",
    "title": "Virgin Annunciate",
    "author": "Antonello da Messina",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Antonello_da_Messina_-_Virgin_Annunciate_-_Galleria_Regionale_della_Sicilia,_Palermo.jpg",
    "position": "50% 28%"
  },
  "glass": {
    "path": "assets/images/chartres-glass.webp",
    "title": "Kính màu Chartres",
    "author": "David Whelan",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Stained_glass_window,_Chartres_Cathedral,_France_(25846429952).jpg",
    "position": "50% 50%"
  },
  "annunciation": {
    "path": "assets/images/annunciation.webp",
    "title": "Truyền Tin",
    "author": "Fra Angelico",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:La_Anunciaci%C3%B3n,_by_Fra_Angelico,_from_Prado_in_Google_Earth.jpg",
    "position": "70% 35%"
  },
  "immaculate": {
    "path": "assets/images/immaculate.webp",
    "title": "Đức Maria Vô Nhiễm",
    "author": "Bartolomé Esteban Murillo",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Murillo_immaculate_conception.jpg",
    "position": "50% 26%"
  },
  "madonna-child": {
    "path": "assets/images/madonna-child.webp",
    "title": "Đức Maria và Hài Nhi",
    "author": "Raphael",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Raffael_051.jpg",
    "position": "50% 12%"
  },
  "crucifixion": {
    "path": "assets/images/crucifixion.webp",
    "title": "Dưới chân Thập Giá",
    "author": "Pietro Perugino; reproduction Walters Art Museum",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Perugino_-_The_Crucifixion_-_Walters_371174.jpg",
    "position": "50% 40%"
  },
  "visitation": {
    "path": "assets/images/visitation.webp",
    "title": "Đức Maria thăm viếng bà Êlisabét",
    "author": "Giotto; reproduction Web Gallery of Art",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Giotto,_Lower_Church_Assisi,_The_Visitation_01.jpg",
    "position": "50% 45%"
  },
  "joachim-anne": {
    "path": "assets/images/joachim-anne.webp",
    "title": "Cuộc gặp gỡ tại Cổng Vàng",
    "author": "Giotto; reproduction Web Gallery of Art",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-06-_-_Meeting_at_the_Golden_Gate.jpg",
    "position": "50% 45%"
  },
  "assumption": {
    "path": "assets/images/assumption.webp",
    "title": "Đức Maria Hồn Xác Lên Trời",
    "author": "Titian",
    "license": "Public Domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Assumption_of_the_Virgin_–_Titian.jpg",
    "position": "50% 45%"
  },
  "fatima": {
    "path": "assets/images/fatima.webp",
    "title": "Nghệ thuật Đức Mẹ Fatima",
    "author": "Unknown artist; uploaded by Twillisjr; Saint Mary’s Cathedral, Colorado Springs",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/wiki/File:Our_Lady_of_Fatima.jpg",
    "position": "50% 35%"
  }
};
// Art provides context; titles are withheld during a live question to avoid textual answer hints.
export const QUIZ_ARTWORKS: Record<string, string> = {
 q01:'immaculate', q02:'madonna-child', q03:'assumption', q04:'mary', q05:'crucifixion',
 q06:'immaculate', q07:'visitation', q08:'fatima', q09:'annunciation', q10:'candle',
};
export const REFLECTION_ARTWORKS: Record<string, string> = {
 r01:'joachim-anne', r02:'galilee', r03:'annunciation', r04:'mary', r05:'visitation',
 r06:'immaculate', r07:'madonna-child', r08:'mary', r09:'assumption', r10:'candle', r11:'madonna-child', r12:'crucifixion',
};
