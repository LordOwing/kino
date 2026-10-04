import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RepertoirePage } from "./pages/RepertoirePage";
import { BookingPage } from "./pages/BookingPage";
import { SummaryPage } from "./pages/SummaryPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DEFAULT_OCCUPIED_SEATS } from "./data/movies";

const STORAGE_KEY = "kino_rezerwacje";

export default function App() {
  const [reservations, setReservations] = useState(() => {
    try {
      const savedReservations = localStorage.getItem(STORAGE_KEY);
      return savedReservations ? JSON.parse(savedReservations) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (bookingData) => {
    const newReservation = {
      ...bookingData,
      id: "RES-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString()
    };

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const cancelReservation = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const getOccupiedSeats = (movieId, showtime) => {
    const defaultSeats = DEFAULT_OCCUPIED_SEATS[`${movieId}-${showtime}`] || [];
    const reservedSeats = reservations
      .filter((res) => res.movieId === Number(movieId) && res.showtime === showtime)
      .flatMap((res) => res.seats.map((seat) => seat.id));

    return [...new Set([...defaultSeats, ...reservedSeats])];
  };

  const getReservationById = (id) => {
    return reservations.find((res) => res.id === id);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar reservationsCount={reservations.length} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<RepertoirePage />} />
            <Route
              path="/rezerwacja/:movieId/:showtime"
              element={<BookingPage addReservation={addReservation} getOccupiedSeats={getOccupiedSeats} />}
            />
            <Route
              path="/rezerwacja/:movieId"
              element={<BookingPage addReservation={addReservation} getOccupiedSeats={getOccupiedSeats} />}
            />
            <Route
              path="/podsumowanie/:bookingId"
              element={<SummaryPage getReservationById={getReservationById} cancelReservation={cancelReservation} />}
            />
            <Route
              path="/rezerwacje"
              element={<ReservationsPage reservations={reservations} cancelReservation={cancelReservation} />}
            />
            <Route path="/o-kinie" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
