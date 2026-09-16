
import React, { FormEvent, useState } from "react";
import BusinessSetup from "./Pages/BusinessSetup";
import Dashboard from "./Pages/Dashboard";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

type BusinessData = {
  businessName: string;
  category: string;
  location: string;
  phone: string;
  currency: string;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [screen, setScreen] = useState<
    "register" | "success" | "businessSetup" | "dashboard"
  >("register");

  const [business, setBusiness] = useState<BusinessData>({
    businessName: "",
    category: "",
    location: "",
    phone: "",
    currency: "LSL",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!form.fullName.trim()) {
      next.fullName = "Please enter your full name.";
    }

    if (!form.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      next.phone = "Please enter your phone number.";
    }

    if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }

    if (!form.terms) {
      next.terms = "Please accept the terms to continue.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setScreen("success");
  };

  if (screen === "businessSetup") {
    return (
      <BusinessSetup
        onComplete={(data) => {
          setBusiness(data);
          setScreen("dashboard");
        }}
      />
    );
  }

  if (screen === "dashboard") {
    return (
      <Dashboard
        businessName={business.businessName}
        category={business.category}
        currency={business.currency}
      />
    );
  }

  if (screen === "success") {
    return (
      <main className="page-shell">
        <div className="decor decor-one" />
        <div className="decor decor-two" />

        <section className="auth-card success-card">
          <div className="brand">
            <div className="brand-mark">♡</div>

            <div>
              <strong>BUKA</strong>
              <span>small business, made simple</span>
            </div>
          </div>

          <div className="success-icon">✓</div>

          <p className="eyebrow">ACCOUNT CREATED</p>

          <h1>
            Welcome to Buka, {form.fullName.split(" ")[0]}
          </h1>

          <p className="subtitle">
            Your account is ready. Next, we'll help you set up your business
            and get your Buka workspace ready.
          </p>

          <button
            className="primary-button"
            onClick={() => setScreen("businessSetup")}
          >
            Continue to business setup <span>→</span>
          </button>

          
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="decor decor-one" />
      <div className="decor decor-two" />
      <div className="decor decor-three" />

      <section className="left-panel">
        <div className="brand brand-light">
          <div className="brand-mark">♡</div>

          <div>
            <strong>BUKA</strong>
            <span>small business, made simple</span>
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">YOUR BUSINESS, YOUR WAY</p>

          <h2>
            Keep your business
            <em> beautifully simple.</em>
          </h2>

          <p>
            Track sales, expenses, customers and money in one lovely little
            place without an accountant.
          </p>

          <div className="feature-list">
            <div>
              <span>♡</span>
              <p>
                <strong>Know your numbers.</strong>
                <br />
                See what you sold, spent and made.
              </p>
            </div>

            <div>
              <span>✦</span>
              <p>
                <strong>Stay organised.</strong>
                <br />
                Keep invoices, receipts and customers together.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                <strong>Built for everyday business.</strong>
                <br />
                Cash, mobile money and bank payments.
              </p>
            </div>
          </div>
        </div>

        <div className="made-for">
          <span>♡</span> Made for small businesses in Lesotho
        </div>
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <div className="mobile-brand">
            <div className="brand-mark">♡</div>
            <strong>BUKA</strong>
          </div>

          <div className="form-heading">
            <p className="eyebrow">LET'S GET STARTED</p>

            <h1>Create your account</h1>

            <p>
              Start with your details. We'll set up your business next.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label>
              <span>Full name</span>

              <input
                type="text"
                placeholder="e.g. Pule Mofokeng"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={errors.fullName ? "input-error" : ""}
              />

              {errors.fullName && <small>{errors.fullName}</small>}
            </label>

            <label>
              <span>Email address</span>

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && <small>{errors.email}</small>}
            </label>

            <label>
              <span>Phone number</span>

              <div className="phone-input">
                <select aria-label="Country code" defaultValue="+266">
                  <option value="+266">🇱🇸 +266</option>
                  <option value="+27">🇿🇦 +27</option>
                </select>

                <input
                  type="tel"
                  placeholder="X XXX XXXX"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={errors.phone ? "input-error" : ""}
                />
              </div>

              {errors.phone && <small>{errors.phone}</small>}
            </label>

            <div className="two-columns">
              <label>
                <span>Password</span>

                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className={errors.password ? "input-error" : ""}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && <small>{errors.password}</small>}
              </label>

              <label>
                <span>Confirm password</span>

                <div className="password-input">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      update("confirmPassword", e.target.value)
                    }
                    className={errors.confirmPassword ? "input-error" : ""}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small>{errors.confirmPassword}</small>
                )}
              </label>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => update("terms", e.target.checked)}
              />

              <span>
                I agree to Buka's{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {errors.terms && (
              <small className="terms-error">{errors.terms}</small>
            )}

            <button className="primary-button" type="submit">
              Create my account <span>→</span>
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            className="google-button"
            type="button"
            onClick={() =>
              alert("Google sign-up will be connected later.")
            }
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Log in
            </a>
          </p>

          <p className="security-note">
            🔒 Your information is kept secure.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;