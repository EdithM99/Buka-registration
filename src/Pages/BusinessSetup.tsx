import React, { FormEvent, useState } from "react";

type BusinessSetupProps = {
  onComplete: (business: {
    businessName: string;
    category: string;
    location: string;
    phone: string;
    currency: string;
  }) => void;
};

function BusinessSetup({ onComplete }: BusinessSetupProps) {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("LSL");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!businessName.trim() || !category || !location.trim()) {
      setError("Please complete your business name, category and location.");
      return;
    }

    setError("");

    onComplete({
      businessName,
      category,
      location,
      phone,
      currency,
    });
  };

  return (
    <main className="setup-page">
      <div className="setup-decoration setup-decoration-one" />
      <div className="setup-decoration setup-decoration-two" />

      <div className="setup-container">
        <div className="setup-brand">
          <div className="brand-mark">♡</div>

          <div>
            <strong>BUKA</strong>
            <span>small business, made simple</span>
          </div>
        </div>

        <div className="setup-progress">
          <div className="progress-step active">
            <span>1</span>
            <p>Your business</p>
          </div>

          <div className="progress-line" />

          <div className="progress-step">
            <span>2</span>
            <p>Workspace</p>
          </div>
        </div>

        <section className="setup-card">
          <div className="setup-heading">
            <p className="eyebrow">LET'S SET YOU UP</p>

            <h1>
              Tell us about your
              <em> business.</em>
            </h1>

            <p>
              Just a few details and we'll create a workspace that works for
              you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="setup-form">
            <label>
              <span>Business name</span>

              <input
                type="text"
                placeholder="e.g. Mpho Enterprise"
                value={businessName}
                onChange={(event) => {
                  setBusinessName(event.target.value);
                  setError("");
                }}
              />
            </label>

            <label>
              <span>What type of business do you run?</span>

              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setError("");
                }}
              >
                <option value="">Select a category</option>
                <option value="Retail">Retail</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Beauty & Wellness">Beauty & Wellness</option>
                <option value="Fashion">Fashion</option>
                <option value="Professional Services">
                  Professional Services
                </option>
                <option value="Construction">Construction</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              <span>Business location</span>

              <input
                type="text"
                placeholder="e.g. Maseru, Lesotho"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setError("");
                }}
              />
            </label>

            <label>
              <span>Business phone <small>(optional)</small></span>

              <input
                type="tel"
                placeholder="5X XXX XXXX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>

            <label>
              <span>Currency</span>

              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="LSL">🇱🇸 LSL — Lesotho Loti</option>
                <option value="ZAR">🇿🇦 ZAR — South African Rand</option>
                <option value="BWP">🇧🇼 BWP — Botswana Pula</option>
                <option value="USD">🇺🇸 USD — US Dollar</option>
              </select>
            </label>

            {error && <p className="setup-error">{error}</p>}

            <button className="primary-button setup-button" type="submit">
              Create my workspace <span>→</span>
            </button>
          </form>

          <p className="setup-footer">
            ♡ You can change these details anytime from Settings.
          </p>
        </section>

        <p className="prototype-note">
          BUKA prototype · Your information stays private and secure.
        </p>
      </div>
    </main>
  );
}

export default BusinessSetup;