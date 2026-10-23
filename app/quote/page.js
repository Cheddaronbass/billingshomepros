"use client";

import { Suspense, useRef, useState } from "react";
import TurnstileField from "../components/TurnstileField";
import { formatUSPhoneNumber } from "../lib/formatUSPhoneNumber";

const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
import { useSearchParams } from "next/navigation";

function QuoteForm() {
  const searchParams = useSearchParams();

  const businessId = searchParams.get("businessId");
  const businessName =
    searchParams.get("businessName") || "a local contractor";

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    project_type: "",
    project_details: "",
  });

  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "customer_phone" ? formatUSPhoneNumber(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setMessage("Complete the security verification before submitting.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_id: businessId ? Number(businessId) : null,
          business_name: businessName,
          ...formData,
          turnstile_token: turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Unable to submit your request.");
        return;
      }

      setStatus("success");
            if (typeof window.gtag === "function") {
        window.gtag("event", "quote_request_submitted", {
          business_id: businessId || "",
          business_name: businessName,
        });
      }
      // A saved quote request is not necessarily delivered to the contractor:
      // contractor email forwarding requires a verified lead address.
      setMessage(
        `Request received by Billings Home Pros for ${businessName}. We'll forward it to the contractor when a verified contact is available.`
      );

      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        project_type: "",
        project_details: "",
      });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      // Turnstile responses expire after one verification attempt.
      turnstileRef.current?.reset();
    }
  }

  return (
    <section className="quotePage">
      <div className="quoteFormCard">
        <div className="eyebrow">REQUEST A QUOTE</div>

        <h1>Tell us about your project</h1>

        <p className="quoteBusiness">
          Requesting a quote from <strong>{businessName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="quoteForm">
          <label>
            Your Name *
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <div className="quoteFormRow">
            <label>
              Email
       <input
  type="email"
  name="customer_email"
  value={formData.customer_email}
  onChange={handleChange}
  autoComplete="email"
  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
  title="Please enter a complete email address, such as name@example.com"
/>
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="customer_phone"
                placeholder="406-555-0123"
                inputMode="tel"
                value={formData.customer_phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>
          </div>

          <p className="contactHint">
            Please provide at least an email address or phone number.
          </p>

          <label>
            Project Type
            <input
              type="text"
              name="project_type"
              placeholder="Example: Water heater replacement"
              value={formData.project_type}
              onChange={handleChange}
            />
          </label>

          <label>
            Tell us about the project *
            <textarea
              name="project_details"
              rows="6"
              placeholder="Describe what you need help with..."
              value={formData.project_details}
              onChange={handleChange}
              required
            />
          </label>

          <TurnstileField
            ref={turnstileRef}
            action="quote_request"
            onTokenChange={setTurnstileToken}
          />

          <button
            type="submit"
            className="quoteSubmitButton"
            disabled={status === "submitting" || (turnstileEnabled && !turnstileToken)}
          >
            {status === "submitting"
              ? "Sending..."
              : "Send Quote Request"}
          </button>

          {message && (
            <div
              className={
                status === "success"
                  ? "quoteMessage success"
                  : "quoteMessage error"
              }
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default function QuotePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="textBrand" href="/">
          <span className="brandMain">Billings Home Pros</span>
          <span className="brandSub">
            LOCAL HOME SERVICES • BILLINGS, MT
          </span>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="/#pros">For Contractors</a>
        </nav>
      </header>

      <Suspense
        fallback={
          <section className="quotePage">
            <div className="quoteFormCard">
              <p>Loading quote form...</p>
            </div>
          </section>
        }
      >
        <QuoteForm />
      </Suspense>

      <footer>
        <strong>Billings Home Pros</strong>
        <p>
          Connecting Billings-area homeowners with local home-service
          professionals.
        </p>
        <small>© 2026 BillingsHomePros.com</small>
      </footer>
    </main>
  );
}
