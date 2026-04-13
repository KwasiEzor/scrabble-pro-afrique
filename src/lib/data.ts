export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  country: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  country: string;
  countryFlag: string;
  image: string;
  ranking: number;
  rating: number;
  titles: string[];
  tags: string[];
  bio: string;
  club: string;
  featured: boolean;
}

export interface Competition {
  id: string;
  slug: string;
  name: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
  description: string;
  participants: number;
  type: string;
  tags: string[];
  results?: { rank: number; player: string; country: string; score: number }[];
}

export interface Country {
  id: string;
  slug: string;
  name: string;
  code: string;
  flag: string;
  image: string;
  federation: string;
  clubs: number;
  players: number;
  description: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'championnat-afrique-2025-senegal-domine-dakar',
    title: "Championnat d'Afrique 2025 : Le Sénégal domine à Dakar",
    excerpt: "Le Sénégal remporte le titre continental pour la troisième fois consécutive lors d'une compétition mémorable qui a rassemblé 24 nations.",
    content: "Une édition historique du Championnat d'Afrique de Scrabble s'est tenue à Dakar...",
    image: '/images/tournament.jpg',
    category: 'Compétition',
    tags: ['Championnat', 'Sénégal', 'Dakar', 'Afrique'],
    country: 'Sénégal',
    author: 'Amadou Diallo',
    authorImage: '/images/player1.jpg',
    date: '2025-01-15',
    readTime: '5 min',
    featured: true
  },
  {
    id: '2',
    slug: 'fatou-ndiaye-portrait-championne-hors-norme',
    title: "Fatou Ndiaye : portrait d'une championne hors norme",
    excerpt: "À seulement 23 ans, Fatou Ndiaye est devenue la plus jeune championne d'Afrique de l'histoire du Scrabble francophone.",
    content: "Fatou Ndiaye incarne la nouvelle génération du Scrabble africain...",
    image: '/images/player2.jpg',
    category: 'Portrait',
    tags: ['Portrait', 'Championne', 'Sénégal', 'Jeunesse'],
    country: 'Sénégal',
    author: 'Marie Kouassi',
    authorImage: '/images/player4.jpg',
    date: '2025-01-10',
    readTime: '8 min',
    featured: true
  },
  {
    id: '3',
    slug: 'cote-ivoire-programme-national-scrabble-scolaire',
    title: "La Côte d'Ivoire lance son programme national de Scrabble scolaire",
    excerpt: "Un ambitieux programme vise à introduire le Scrabble dans 500 écoles ivoiriennes d'ici 2026.",
    content: "Le ministère de l'Éducation nationale de Côte d'Ivoire a annoncé...",
    image: '/images/country-cotedivoire.jpg',
    category: 'Éducation',
    tags: ['Éducation', 'Scolaire', 'Côte d\'Ivoire', 'Jeunesse'],
    country: "Côte d'Ivoire",
    author: 'Ibrahim Touré',
    authorImage: '/images/player3.jpg',
    date: '2025-01-08',
    readTime: '4 min',
    featured: false
  },
  {
    id: '4',
    slug: 'cameroun-jeux-francophonie-scrabble-2026',
    title: 'Le Cameroun accueillera les Jeux de la Francophonie du Scrabble 2026',
    excerpt: "Douala a été choisie comme ville hôte pour le plus grand événement francophone de Scrabble de l'année prochaine.",
    content: "C'est officiel : le Cameroun accueillera les Jeux de la Francophonie...",
    image: '/images/country-cameroun.jpg',
    category: 'Événement',
    tags: ['Événement', 'Cameroun', 'Douala', 'Francophonie'],
    country: 'Cameroun',
    author: 'Paul Mbarga',
    authorImage: '/images/player1.jpg',
    date: '2025-01-05',
    readTime: '3 min',
    featured: false
  },
  {
    id: '5',
    slug: 'strategies-avancees-maitriser-mots-2-3-lettres',
    title: 'Stratégies avancées : maîtriser les mots de 2 et 3 lettres',
    excerpt: 'Découvrez les techniques des champions pour maximiser vos scores avec les mots courts.',
    content: 'Les mots de 2 et 3 lettres sont la clé du Scrabble compétitif...',
    image: '/images/scrabble-tiles.jpg',
    category: 'Stratégie',
    tags: ['Stratégie', 'Technique', 'Formation', 'Débutant'],
    country: 'International',
    author: 'Dr. Kofi Mensah',
    authorImage: '/images/player3.jpg',
    date: '2025-01-03',
    readTime: '10 min',
    featured: false
  },
  {
    id: '6',
    slug: 'open-dakar-2025-inscriptions-ouvertes',
    title: 'Open de Dakar 2025 : inscriptions ouvertes',
    excerpt: "L'Open international de Dakar revient pour sa 12e édition avec un prize pool record.",
    content: "L'Open de Dakar est devenu l'un des tournois les plus prestigieux...",
    image: '/images/country-senegal.jpg',
    category: 'Compétition',
    tags: ['Open', 'Dakar', 'Sénégal', 'Inscriptions'],
    country: 'Sénégal',
    author: 'Amadou Diallo',
    authorImage: '/images/player1.jpg',
    date: '2024-12-28',
    readTime: '4 min',
    featured: false
  }
];

export const players: Player[] = [
  {
    id: '1',
    slug: 'ndongo-samba-sylla',
    name: 'Ndongo Samba Sylla',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    image: '/images/player1.jpg',
    ranking: 1,
    rating: 2145,
    titles: ["Champion d'Afrique 2024", "Champion d'Afrique 2023", 'Open de Dakar 2024'],
    tags: ['Champion', 'Expert', 'Sénégal'],
    bio: "Considéré comme le plus grand scrabbleur africain de sa génération, Ndongo domine le circuit depuis 5 ans.",
    club: 'Club de Scrabble de Dakar',
    featured: true
  },
  {
    id: '2',
    slug: 'fatou-ndiaye',
    name: 'Fatou Ndiaye',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    image: '/images/player2.jpg',
    ranking: 2,
    rating: 2089,
    titles: ["Championne d'Afrique Féminine 2024", 'Open de Lomé 2024'],
    tags: ['Championne', 'Féminin', 'Sénégal'],
    bio: "Prodige du Scrabble sénégalais, Fatou a révolutionné le jeu féminin en Afrique.",
    club: 'AS Scrabble Dakar',
    featured: true
  },
  {
    id: '3',
    slug: 'kouadio-yao',
    name: 'Kouadio Yao',
    country: "Côte d'Ivoire",
    countryFlag: '🇨🇮',
    image: '/images/player3.jpg',
    ranking: 3,
    rating: 2034,
    titles: ["Champion de Côte d'Ivoire 2024", 'Grand Prix d\'Abidjan 2024'],
    tags: ['Champion', 'Offensif', 'Côte d\'Ivoire'],
    bio: "Leader du Scrabble ivoirien, Kouadio est réputé for son style offensif et ses coups spectaculaires.",
    club: 'Scrabble Club Abidjan',
    featured: false
  },
  {
    id: '4',
    slug: 'aicha-bamba',
    name: 'Aïcha Bamba',
    country: 'Cameroun',
    countryFlag: '🇨🇲',
    image: '/images/player4.jpg',
    ranking: 4,
    rating: 1998,
    titles: ['Championne du Cameroun 2024', 'Open de Douala 2024'],
    tags: ['Arbitre', 'Championne', 'Cameroun'],
    bio: "Arbitre internationale et joueuse d'exception, Aïcha incarne l'excellence camerounaise.",
    club: 'Scrabble Club Douala',
    featured: false
  }
];

export const competitions: Competition[] = [
  {
    id: '1',
    slug: 'championnat-afrique-2025',
    name: "Championnat d'Afrique 2025",
    location: 'Dakar, Sénégal',
    country: 'Sénégal',
    startDate: '2025-03-15',
    endDate: '2025-03-20',
    status: 'upcoming',
    image: '/images/tournament.jpg',
    description: "Le plus grand événement de Scrabble francophone en Afrique. 24 nations attendues.",
    participants: 240,
    type: 'Continental',
    tags: ['Continental', 'Sénégal', 'Majeur']
  },
  {
    id: '2',
    slug: 'open-international-lome-2025',
    name: 'Open International de Lomé',
    location: 'Lomé, Togo',
    country: 'Togo',
    startDate: '2025-02-10',
    endDate: '2025-02-13',
    status: 'upcoming',
    image: '/images/community.jpg',
    description: "L'Open de Lomé accueille les meilleurs joueurs de la sous-région.",
    participants: 120,
    type: 'International',
    tags: ['International', 'Togo', 'Open']
  },
  {
    id: '3',
    slug: 'grand-prix-abidjan-2025',
    name: "Grand Prix d'Abidjan",
    location: 'Abidjan, Côte d\'Ivoire',
    country: "Côte d'Ivoire",
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    status: 'ongoing',
    image: '/images/country-cotedivoire.jpg',
    description: 'Le rendez-vous incontournable du Scrabble ivoirien.',
    participants: 80,
    type: 'National',
    tags: ['National', 'Côte d\'Ivoire', 'Grand Prix']
  },
  {
    id: '4',
    slug: 'coupe-cameroun-2025',
    name: 'Coupe du Cameroun 2025',
    location: 'Douala, Cameroun',
    country: 'Cameroun',
    startDate: '2024-12-15',
    endDate: '2024-12-18',
    status: 'completed',
    image: '/images/country-cameroun.jpg',
    description: 'La coupe nationale du Cameroun a couronné ses nouveaux champions.',
    participants: 64,
    type: 'National',
    tags: ['National', 'Cameroun', 'Coupe'],
    results: [
      { rank: 1, player: 'Aïcha Bamba', country: 'Cameroun', score: 4520 },
      { rank: 2, player: 'Jean-Paul Nkodo', country: 'Cameroun', score: 4380 },
      { rank: 3, player: 'Marie Fotso', country: 'Cameroun', score: 4210 }
    ]
  }
];

export const countries: Country[] = [
  {
    id: '1',
    slug: 'senegal',
    name: 'Sénégal',
    code: 'SN',
    flag: '🇸🇳',
    image: '/images/country-senegal.jpg',
    federation: 'Fédération Sénégalaise de Scrabble',
    clubs: 45,
    players: 1200,
    description: 'Le Sénégal est la nation dominante du Scrabble francophone africain.',
    tags: ['Leader', 'Afrique de l\'Ouest', 'Expert']
  },
  {
    id: '2',
    slug: 'cote-ivoire',
    name: "Côte d'Ivoire",
    code: 'CI',
    flag: '🇨🇮',
    image: '/images/country-cotedivoire.jpg',
    federation: "Fédération Ivoirienne de Scrabble",
    clubs: 38,
    players: 950,
    description: "La Côte d'Ivoire est un pilier du Scrabble africain avec une tradition d'excellence.",
    tags: ['Pilier', 'Afrique de l\'Ouest', 'Tradition']
  },
  {
    id: '3',
    slug: 'cameroun',
    name: 'Cameroun',
    code: 'CM',
    flag: '🇨🇲',
    image: '/images/country-cameroun.jpg',
    federation: 'Fédération Camerounaise de Scrabble',
    clubs: 32,
    players: 780,
    description: 'Le Cameroun est une force montante du Scrabble francophone.',
    tags: ['Force montante', 'Afrique Centrale']
  },
  {
    id: '4',
    slug: 'gabon',
    name: 'Gabon',
    code: 'GA',
    flag: '🇬🇦',
    image: '/images/tournament.jpg',
    federation: 'Fédération Gabonaise de Scrabble',
    clubs: 15,
    players: 320,
    description: 'Le Gabon développe activement sa communauté de scrabbleurs.',
    tags: ['Développement', 'Afrique Centrale']
  },
  {
    id: '5',
    slug: 'togo',
    name: 'Togo',
    code: 'TG',
    flag: '🇹🇬',
    image: '/images/community.jpg',
    federation: 'Fédération Togolaise de Scrabble',
    clubs: 20,
    players: 450,
    description: 'Le Togo est reconnu pour ses tournois internationaux de qualité.',
    tags: ['Organisation', 'Afrique de l\'Ouest']
  },
  {
    id: '6',
    slug: 'mali',
    name: 'Mali',
    code: 'ML',
    flag: '🇲🇱',
    image: '/images/hero-scrabble.jpg',
    federation: 'Fédération Malienne de Scrabble',
    clubs: 18,
    players: 380,
    description: 'Le Mali possède une communauté passionnée et en pleine croissance.',
    tags: ['Passion', 'Sahel']
  }
];

export const categories = ['Tous', 'Compétition', 'Portrait', 'Éducation', 'Événement', 'Stratégie', 'Communauté'];
export const countryFilters = ['Tous', 'Sénégal', "Côte d'Ivoire", 'Cameroun', 'Togo', 'Gabon', 'Mali', 'International'];
