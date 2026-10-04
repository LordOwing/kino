import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Nie znaleziono wybranej strony.</p>
      <Link to="/" className="btn btn-primary">
        Wróć do repertuaru
      </Link>
    </div>
  );
};
