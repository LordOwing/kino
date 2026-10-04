import { useParams, Link, useNavigate } from "react-router-dom";

export const SummaryPage = ({ getReservationById, cancelReservation }) => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const res = getReservationById(bookingId);

  if (!res) {
    return (
      <div className="container py-5 text-center">
        <h3>Nie znaleziono rezerwacji</h3>
        <Link to="/" className="btn btn-primary mt-3">Wróć do repertuaru</Link>
      </div>
    );
  }

  const { movieTitle, showtime, seats, tickets, totalPrice, user, id } = res;

  const handleCancel = () => {
    const confirmed = window.confirm(`Czy na pewno chcesz anulować rezerwację na film "${movieTitle}"?`);
    if (confirmed) {
      cancelReservation(id);
      navigate("/rezerwacje");
    }
  };

  return (
    <div className="container py-4">
      <div className="alert alert-success text-center mb-4 no-print">
        <h4 className="alert-heading mb-1">Rezerwacja powiodła się!</h4>
        <p className="mb-0">Dziękujemy za złożenie rezerwacji w naszym kinie.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card p-4 border border-secondary border-2 bg-white mb-4">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
              <h3 className="mb-0">Podsumowanie rezerwacji</h3>
              <span className="badge bg-secondary fs-6">#{id}</span>
            </div>

            <div className="mb-3">
              <h4 className="text-primary mb-1">{movieTitle}</h4>
              <p className="text-muted mb-0">Godzina seansu: <strong>{showtime}</strong></p>
            </div>

            <div className="card p-3 mb-3 bg-light">
              <h6 className="fw-bold mb-2">Wybrane miejsca ({seats.length}):</h6>
              <div>
                {seats.map((seat) => (
                  <span key={seat.id} className="badge bg-primary me-2 mb-1">
                    Rząd {seat.row}, Miejsce {seat.col}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-3 mb-3 bg-light">
              <h6 className="fw-bold mb-2">Bilety:</h6>
              <ul className="list-unstyled mb-0">
                {tickets.normal > 0 && (
                  <li>Bilet normalny: {tickets.normal} × 25 zł = {tickets.normal * 25} zł</li>
                )}
                {tickets.student > 0 && (
                  <li>Bilet ulgowy: {tickets.student} × 18 zł = {tickets.student * 18} zł</li>
                )}
                <li className="border-top pt-2 mt-2 fw-bold text-end fs-5">
                  Do zapłaty: {totalPrice} zł
                </li>
              </ul>
            </div>

            <div className="border-top pt-2">
              <h6 className="fw-bold mb-1">Dane rezerwującego:</h6>
              <p className="mb-0">{user.firstName} {user.lastName}</p>
              <p className="text-muted small mb-0">{user.email}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between no-print flex-wrap gap-2">
            <Link to="/" className="btn btn-outline-secondary">
              Wróć do repertuaru
            </Link>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleCancel}
              >
                Anuluj rezerwację
              </button>
              <Link to="/rezerwacje" className="btn btn-primary">
                Moje Rezerwacje
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

