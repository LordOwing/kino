import { CinemaScreen } from "./CinemaScreen";

export const SeatMap = ({
  selectedSeats = [],
  onSeatToggle,
  occupiedSeats = [],
  rowsCount = 6,
  colsCount = 8
}) => {
  const rows = Array.from({ length: rowsCount }, (_, i) => i + 1);
  const cols = Array.from({ length: colsCount }, (_, i) => i + 1);

  const isSeatOccupied = (row, col) => {
    return occupiedSeats.includes(`${row}-${col}`);
  };

  const isSeatSelected = (row, col) => {
    return selectedSeats.some((s) => s.id === `${row}-${col}`);
  };

  const handleSeatClick = (row, col) => {
    if (isSeatOccupied(row, col)) return;
    onSeatToggle({ row, col, id: `${row}-${col}` });
  };

  return (
    <div className="card p-3 mb-4 text-center">
      <h6 className="card-title text-muted mb-3">Wybierz miejsca na sali</h6>

      <CinemaScreen />

      <div className="d-flex flex-column gap-2 align-items-center mb-4">
        {rows.map((row) => (
          <div key={`row-${row}`} className="d-flex align-items-center gap-2">
            <span className="fw-bold text-center" style={{ width: "24px" }}>
              {row}
            </span>

            {cols.map((col) => {
              const occupied = isSeatOccupied(row, col);
              const selected = isSeatSelected(row, col);

              let btnClass = "btn btn-success";
              if (occupied) btnClass = "btn btn-danger disabled";
              else if (selected) btnClass = "btn btn-primary";

              return (
                <button
                  key={`${row}-${col}`}
                  type="button"
                  className={`${btnClass} btn-sm rounded-circle p-0 fw-bold`}
                  style={{ width: "34px", height: "34px" }}
                  onClick={() => handleSeatClick(row, col)}
                  disabled={occupied}
                >
                  {col}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-4 py-2 border-top small">
        <div className="d-flex align-items-center gap-1">
          <span className="rounded-circle bg-success d-inline-block" style={{ width: "18px", height: "18px" }}></span>
          <span>Wolne</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <span className="rounded-circle bg-danger d-inline-block" style={{ width: "18px", height: "18px" }}></span>
          <span>Zajęte</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <span className="rounded-circle bg-primary d-inline-block" style={{ width: "18px", height: "18px" }}></span>
          <span>Wybrane</span>
        </div>
      </div>

      <div className="mt-2">
        <strong>Liczba wybranych miejsc: </strong>
        <span className="badge bg-primary fs-6">{selectedSeats.length}</span>
      </div>
    </div>
  );
};
