export const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: 169,
    description: "Grupa badaczy wyrusza w podróż kosmiczną, aby znaleźć nowy dom dla ludzkości w obliczu katastrofy ekologicznej na Ziemi.",
    poster: "img/inter.webp",
    showtimes: ["16:00", "19:30"]
  },
  {
    id: 2,
    title: "Diuna: Część Druga",
    genre: "Sci-Fi",
    duration: 166,
    description: "Paul Atryda sprzymierza się z Fremenami i wkracza na wojenną ścieżkę zemsty przeciwko spiskowcom, którzy zniszczyli jego ród.",
    poster: "img/diuna.jpg",
    showtimes: ["17:00", "20:30"]
  },
  {
    id: 3,
    title: "Openheimer",
    genre: "Biograficzny",
    duration: 180,
    description: "Historia fizyka J. Roberta Oppenheimera i jego roli w skonstruowaniu pierwszej bomby atomowej w ramach Projektu Manhattan.",
    poster: "img/openheimer.jpg",
    showtimes: ["15:00", "18:45"]
  },
  {
    id: 4,
    title: "Incepcja",
    genre: "Sci-Fi",
    duration: 148,
    description: "Złodziej specjalizujący się w wykradaniu sekretów z ludzkiej podświadomości podczas snu otrzymuje zadanie zaszczepienia nowej myśli.",
    poster: "img/incepcja.jpg",
    showtimes: ["16:30", "19:45"]
  },
  {
    id: 5,
    title: "Mroczny Rycerz",
    genre: "Akcja",
    duration: 152,
    description: "Batman podejmuje walkę z groźnym Jokerem, który wprowadza w Gotham City anarchię i zmusza bohatera do przekroczenia granic.",
    poster: "img/mr.jpg",
    showtimes: ["17:30", "21:00"]
  },
  {
    id: 6,
    title: "Spider-Man: Poprzez multiwersum",
    genre: "Anmacja",
    duration: 140,
    description: "Miles Morales trafia do multiwersum, gdzie wraz z grupą innych Spider-bohaterów musi stawić czoła nowemu niebezpieczeństwu.",
    poster: "img/spider.webp",
    showtimes: ["14:30", "17:15"]
  }
];

export const TICKET_PRICES = {
  NORMAL: 25,
  STUDENT: 18
};

export const DEFAULT_OCCUPIED_SEATS = {
  "1-19:30": ["2-3", "2-4", "4-5", "4-6"],
  "2-20:30": ["3-3", "3-4", "3-5", "3-6"],
  "3-18:45": ["2-5", "2-6", "4-3", "4-4"],
  "5-21:00": ["3-4", "3-5", "4-5"]
};
