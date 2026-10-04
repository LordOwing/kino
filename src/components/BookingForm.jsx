export const BookingForm = ({
  userData,
  onUserDataChange,
  errors,
  onSubmit,
  isSubmitting,
  selectedSeatsCount,
  totalPrice
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUserDataChange((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card p-3">
      <h5 className="card-title mb-3">Dane osoby rezerwującej</h5>

      <form onSubmit={onSubmit} noValidate>
        {errors.seats && (
          <div className="alert alert-danger py-2 small mb-3">
            {errors.seats}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Imię *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            value={userData.firstName}
            onChange={handleChange}
            placeholder="Wpisz imię"
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Nazwisko *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            value={userData.lastName}
            onChange={handleChange}
            placeholder="Wpisz nazwisko"
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Adres e-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={userData.email}
            onChange={handleChange}
            placeholder="Wpisz adres e-mail"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">Wybrane miejsca: {selectedSeatsCount}</span>
          <span className="fw-bold">Razem: {totalPrice} zł</span>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 py-2 fw-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wysyłanie..." : `Zatwierdź rezerwację (${totalPrice} zł)`}
        </button>
      </form>
    </div>
  );
};
