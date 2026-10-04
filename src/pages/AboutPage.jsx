import { Link } from "react-router-dom";
import { cinemaInfo } from "../data/cinemaInfo";

export const AboutPage = () => {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="mb-3 text-center">O kinie Lolo</h2>
            <p className="lead">{cinemaInfo.about}</p>

            <h5 className="mt-4 mb-2">Nasza sala:</h5>
            <p>
              Nasza sala kinowa posiada 48 wygodnych miejsc podzielonych na 6 rzędów po 8 foteli.
              Dzięki temu każdy widz ma doskonałą widoczność ekranu i komfortowy seans.
            </p>

            <h5 className="mt-3 mb-2">Cennik:</h5>
            <ul>
              <li>Bilet normalny: 25 zł</li>
              <li>Bilet ulgowy: 18 zł (uczniowie, studenci, seniorzy)</li>
            </ul>

            <div className="text-center mt-4">
              <Link to="/" className="btn btn-primary">
                Zobacz dzisiejszy repertuar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
