import { useState } from "react";
import { cinemaInfo } from "../data/cinemaInfo";

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Kontakt</h2>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-5">
          <div className="card p-3 h-100 shadow-sm">
            <h5>Dane kina</h5>
            <p className="mb-1"><strong>Adres:</strong> {cinemaInfo.address}</p>
            <p className="mb-1"><strong>Telefon:</strong> {cinemaInfo.phone}</p>
            <p className="mb-1"><strong>E-mail:</strong> {cinemaInfo.email}</p>
            <p className="mb-1"><strong>Godziny otwarcia:</strong> {cinemaInfo.hours}</p>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="card p-3 h-100 shadow-sm">
            <h5>Formularz kontaktowy</h5>

            {sent && (
              <div className="alert alert-success py-2">
                Dziękujemy za wiadomość! Odpowiemy wkrótce.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small">Imię i nazwisko</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">Adres e-mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small">Wiadomość</label>
                <textarea
                  name="message"
                  rows="3"
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Wyślij
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Najczęściej zadawane pytania</h5>
        {cinemaInfo.faq.map((item, idx) => (
          <div key={idx} className="mb-3 pb-2 border-bottom">
            <h6 className="fw-bold">{item.q}</h6>
            <p className="text-muted small mb-0">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
