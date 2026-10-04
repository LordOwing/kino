import { TICKET_PRICES } from "../data/movies";

export const TicketSelector = ({
  selectedCount,
  tickets,
  onTicketChange,
  totalPrice
}) => {
  const { normal, student } = tickets;

  const handleNormalChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    const newStudent = Math.max(0, selectedCount - val);
    onTicketChange({ normal: Math.min(val, selectedCount), student: newStudent });
  };

  const handleStudentChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    const newNormal = Math.max(0, selectedCount - val);
    onTicketChange({ normal: newNormal, student: Math.min(val, selectedCount) });
  };

  return (
    <div className="card p-3 mb-4">
      <h5 className="card-title mb-3">Wybór biletów</h5>

      {selectedCount === 0 ? (
        <div className="alert alert-info py-2 small mb-0">
          Zaznacz najpierw wolne miejsca na planie sali.
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label className="form-label d-flex justify-content-between">
              <span>Bilet normalny ({TICKET_PRICES.NORMAL} zł):</span>
              <span className="fw-bold">{normal} szt.</span>
            </label>
            <div className="btn-group w-100">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (normal > 0) {
                    onTicketChange({ normal: normal - 1, student: student + 1 });
                  }
                }}
                disabled={normal <= 0}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center rounded-0"
                value={normal}
                min={0}
                max={selectedCount}
                onChange={handleNormalChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (student > 0) {
                    onTicketChange({ normal: normal + 1, student: student - 1 });
                  }
                }}
                disabled={normal >= selectedCount}
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-between">
              <span>Bilet ulgowy ({TICKET_PRICES.STUDENT} zł):</span>
              <span className="fw-bold">{student} szt.</span>
            </label>
            <div className="btn-group w-100">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (student > 0) {
                    onTicketChange({ normal: normal + 1, student: student - 1 });
                  }
                }}
                disabled={student <= 0}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center rounded-0"
                value={student}
                min={0}
                max={selectedCount}
                onChange={handleStudentChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  if (normal > 0) {
                    onTicketChange({ normal: normal - 1, student: student + 1 });
                  }
                }}
                disabled={student >= selectedCount}
              >
                +
              </button>
            </div>
          </div>

          <div className="alert alert-light border p-2 mb-0 d-flex justify-content-between align-items-center">
            <span>Łączna cena:</span>
            <strong className="fs-5 text-primary">{totalPrice} zł</strong>
          </div>
        </div>
      )}
    </div>
  );
};
