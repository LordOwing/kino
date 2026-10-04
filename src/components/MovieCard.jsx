import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={movie.poster}
          className="card-img-top bg-dark"
          style={{ height: "320px", objectFit: "contain" }}
          alt={movie.title}
          onError={(e) => {
            e.target.src = "/src/img/film.jpg";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movie.title}</h5>
          <div className="mb-2">
            <span className="badge bg-secondary me-2">{movie.genre}</span>
            <span className="text-muted small">{movie.duration} min</span>
          </div>
          <p className="card-text text-muted small flex-grow-1">
            {movie.description}
          </p>

          <div className="mt-3 pt-2 border-top">
            <div className="small fw-bold mb-2">Godziny seansów:</div>
            <div className="d-flex gap-2">
              {movie.showtimes.map((time) => (
                <Link
                  key={time}
                  to={`/rezerwacja/${movie.id}/${time}`}
                  className="btn btn-outline-primary btn-sm flex-fill"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
