import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { movies, TICKET_PRICES } from "../data/movies";
import { SeatMap } from "../components/SeatMap";
import { TicketSelector } from "../components/TicketSelector";
import { BookingForm } from "../components/BookingForm";

export const BookingPage = ({ addReservation, getOccupiedSeats }) => {
  const { movieId, showtime } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === Number(movieId));

  const currentShowtime = movie && showtime && movie.showtimes.includes(showtime)
    ? showtime
    : (movie ? movie.showtimes[0] : "");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [tickets, setTickets] = useState({ normal: 0, student: 0 });
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowtimeChange = (newTime) => {
    setSelectedSeats([]);
    setTickets({ normal: 0, student: 0 });
    setErrors({});
    navigate(`/rezerwacja/${movie.id}/${newTime}`);
  };

  const handleSeatToggle = (seat) => {
    const exists = selectedSeats.some((s) => s.id === seat.id);
    let updated;
    if (exists) {
      updated = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      updated = [...selectedSeats, seat];
    }
    setSelectedSeats(updated);

    const count = updated.length;
    if (count === 0) {
      setTickets({ normal: 0, student: 0 });
    } else {
      const studentCount = Math.min(tickets.student, count);
      setTickets({ normal: count - studentCount, student: studentCount });
    }

    if (updated.length > 0) {
      setErrors((prev) => ({ ...prev, seats: undefined }));
    }
  };

  const totalPrice = tickets.normal * TICKET_PRICES.NORMAL + tickets.student * TICKET_PRICES.STUDENT;

  const validateForm = () => {
    const newErrors = {};

    if (!userData.firstName.trim()) {
      newErrors.firstName = "Proszę podać imię.";
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = "Proszę podać nazwisko.";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Proszę podać adres e-mail.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email.trim())) {
        newErrors.email = "Niepoprawny format adresu e-mail.";
      }
    }

    if (selectedSeats.length === 0) {
      newErrors.seats = "Proszę wybrać przynajmniej jedno miejsce.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const bookingData = {
      movieId: movie.id,
      movieTitle: movie.title,
      showtime: currentShowtime,
      seats: selectedSeats,
      tickets: tickets,
      totalPrice: totalPrice,
      user: {
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.trim()
      }
    };

    const newRes = addReservation(bookingData);
    navigate(`/podsumowanie/${newRes.id}`);
  };

  if (!movie) {
    return (
      <div className="container py-5 text-center">
        <h3>Nie znaleziono filmu</h3>
        <Link to="/" className="btn btn-primary mt-3">Wróć do repertuaru</Link>
      </div>
    );
  }

  const occupiedSeats = getOccupiedSeats(movie.id, currentShowtime);

  return (
    <div className="container pb-5">
      <div className="card p-3 mb-4 bg-white shadow-sm">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <h2 className="mb-1">{movie.title}</h2>
            <div className="text-muted small">
              Gatunek: {movie.genre} | Czas: {movie.duration} min
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            <span className="fw-bold">Godzina seansu:</span>
            {movie.showtimes.map((time) => (
              <button
                key={time}
                type="button"
                className={`btn btn-sm ${currentShowtime === time ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handleShowtimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-7">
          <SeatMap
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
            occupiedSeats={occupiedSeats}
            rowsCount={6}
            colsCount={8}
          />
        </div>

        <div className="col-12 col-lg-5">
          <TicketSelector
            selectedCount={selectedSeats.length}
            tickets={tickets}
            onTicketChange={setTickets}
            totalPrice={totalPrice}
          />

          <BookingForm
            userData={userData}
            onUserDataChange={setUserData}
            errors={errors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            selectedSeatsCount={selectedSeats.length}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};
