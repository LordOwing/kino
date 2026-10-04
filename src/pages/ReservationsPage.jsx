import { useState } from "react";
import { Link } from "react-router-dom";

export const ReservationsPage = ({ reservations, cancelReservation }) => {
  const [message, setMessage] = useState(null);

  const handleCancel = (res) => {
    const confirmed = window.confirm(`Czy na pewno chcesz anulować rezerwację na film "${res.movieTitle}"?`);
    if (confirmed) {
      cancelReservation(res.id);
      setMessage(`Rezerwacja #${res.id} została anulowana.`);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Moje Rezerwacje</h2>
        <Link to="/" className="btn btn-outline-primary btn-sm">
          Nowa rezerwacja
        </Link>
      </div>

      {message && (
        <div className="alert alert-info alert-dismissible fade show">
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="card text-center p-5">
          <p className="lead mb-3">Nie masz obecnie żadnych zapisanych rezerwacji.</p>
          <div>
            <Link to="/" className="btn btn-primary">Przejdź do repertuaru</Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {reservations.map((res) => (
            <div key={res.id} className="col-12 col-md-6 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{res.movieTitle}</h5>
                    <span className="badge bg-secondary">#{res.id}</span>
                  </div>

                  <p className="text-muted small mb-2">
                    Godzina seansu: <strong>{res.showtime}</strong>
                  </p>

                  <div className="mb-2">
                    <small className="fw-bold d-block">Miejsca:</small>
                    {res.seats.map((s) => (
                      <span key={s.id} className="badge bg-primary me-1">
                        Rz {s.row}, M {s.col}
                      </span>
                    ))}
                  </div>

                  <div className="mb-3 small">
                    <div>Rezerwujący: {res.user.firstName} {res.user.lastName} ({res.user.email})</div>
                    <div className="fw-bold mt-1">Cena łączna: {res.totalPrice} zł</div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 border-top pt-2">
                    <Link to={`/podsumowanie/${res.id}`} className="btn btn-outline-secondary btn-sm">
                      Szczegóły
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(res)}
                    >
                      Anuluj rezerwację
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
