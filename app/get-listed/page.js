"use client";

import { useRef, useState } from "react";
import TurnstileField from "../components/TurnstileField";
import { formatUSPhoneNumber } from "../lib/formatUSPhoneNumber";

const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export default function GetListedPage() {
  const featuredCheckoutEnabled =
    process.env.NEXT_PUBLIC_FEATURED_CHECKOUT_ENABLED === "true";
  const [requestType, setRequestType] = useState("claim");

  const [featuredBusinessName, setFeaturedBusinessName] = useState("");
  const [featuredStatus, setFeaturedStatus] = useState("idle");
  const [featuredMessage, setFeaturedMessage] = useState("");

  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    website: "",
    category: "",
    service_area: "",
    message: "",
  });

  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "contact_phone" ? formatUSPhoneNumber(value) : value,
    }));
  }

  async function handleFeaturedCheckout() {
    if (!featuredBusinessName.trim()) {
      setFeaturedStatus("error");
      setFeaturedMessage("Please enter your business name.");
      return;
    }

    setFeaturedStatus("loading");
    setFeaturedMessage("");

    try {
      const response = await fetch("/api/create-featured-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: featuredBusinessName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFeaturedStatus("error");
        setFeaturedMessage(
          result.error || "Unable to start checkout."
        );
        return;
      }

      window.location.href = result.url;
    } catch {
      setFeaturedStatus("error");
      setFeaturedMessage(
        "Something went wrong. Please try again."
      );
    }
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
      const response = await fetch("/api/contractor-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_type: requestType,
          ...formData,
          turnstile_token: turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(
          result.error || "Unable to submit your request."
        );
        return;
      }

      setStatus("success");

      // Only track a conversion after the server confirms the request was saved.
      if (typeof window.gtag === "function") {
        window.gtag(
          "event",
          requestType === "claim"
            ? "contractor_claim_submitted"
            : "contractor_listing_submitted"
        );
      }

      setMessage(
        requestType === "claim"
          ? "Your claim request has been submitted. You can upgrade to Featured now using your business name below. Featured placement begins after we review your claim."
          : "Your business listing request has been submitted for review."
      );

      setFormData({
        business_name: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        website: "",
        category: "",
        service_area: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      // Turnstile tokens are single-use and must be refreshed after any POST.
      turnstileRef.current?.reset();
    }
  }

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
          <a href="/#services">Find a Pro</a>
          <a href="/get-listed">For Contractors</a>
        </nav>
      </header>

      <section className="quotePage">
        <div className="quoteFormCard">
          <div className="eyebrow">
            FOR BILLINGS HOME-SERVICE PROFESSIONALS
          </div>

          <h1>Reach More Billings-Area Homeowners</h1>

          <p className="quoteBusiness">
            Billings Home Pros helps local homeowners find trusted
            professionals for the work they need. Claim your existing
            listing or add your business to make sure customers can find
            accurate information about your services.
          </p>

          <div className="contractorBenefits">
            <span>✓ Local Billings-area visibility</span>
            <span>✓ Showcase your services</span>
            <span>✓ Receive quote requests</span>
          </div>

          <div className="listingTrustNote">
            <strong>Claiming or adding a business is free.</strong>
            <span>
              We review submissions to help keep Billings Home Pros accurate
              and useful for local homeowners.
            </span>
          </div>

          <p className="requestChoiceHelp">
            Choose the option that fits your business:
          </p>

          <div className="contractorRequestChoices">
            <button
              type="button"
              className={
                requestType === "claim"
                  ? "requestChoice activeRequestChoice"
                  : "requestChoice"
              }
              onClick={() => setRequestType("claim")}
            >
              Claim an Existing Business
            </button>

            <button
              type="button"
              className={
                requestType === "new_listing"
                  ? "requestChoice activeRequestChoice"
                  : "requestChoice"
              }
              onClick={() => setRequestType("new_listing")}
            >
              Add My Business
            </button>
          </div>

          <form onSubmit={handleSubmit} className="quoteForm">
            <label>
              Business Name *
              <input
                type="text"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Your Name *
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
              />
            </label>

            <div className="quoteFormRow">
              <label>
                Email *
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="contact_phone"
                placeholder="406-555-0123"
                inputMode="tel"
                  value={formData.contact_phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Business Website
              <input
                type="url"
                name="website"
                placeholder="https://"
                value={formData.website}
                onChange={handleChange}
              />
            </label>

            <label>
              Primary Service
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="plumbing">Plumbing</option>
                <option value="hvac">Heating & Cooling</option>
                <option value="electrical">Electrical</option>
                <option value="roofing">Roofing</option>
                <option value="contractors-remodeling">Contractors &amp; Remodeling</option>
                <option value="landscaping">Landscaping</option>
                <option value="painting">Painting</option>
                <option value="flooring">Flooring</option>
                <option value="concrete">Concrete</option>
                <option value="fencing">Fencing</option>
                <option value="windows-doors">Windows &amp; Doors</option>
                <option value="handyman">Handyman</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Service Area
              <input
                type="text"
                name="service_area"
                placeholder="Example: Billings, Laurel and surrounding areas"
                value={formData.service_area}
                onChange={handleChange}
              />
            </label>

            <label>
              {requestType === "claim"
                ? "Anything we should know about your claim?"
                : "Tell us about your business and services"}

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <TurnstileField
              ref={turnstileRef}
              action="contractor_request"
              onTokenChange={setTurnstileToken}
            />

            <button
              type="submit"
              className="quoteSubmitButton"
              disabled={status === "submitting" || (turnstileEnabled && !turnstileToken)}
            >
              {status === "submitting"
                ? "Sending..."
                : requestType === "claim"
                ? "Submit Claim Request"
                : "Submit Listing Request"}
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

          <div className="featuredUpgrade">
            <div className="eyebrow">
              STAND OUT TO LOCAL HOMEOWNERS
            </div>

            <h2>Upgrade to a Featured Listing</h2>

            <p>
              Put your business above standard listings and make it easier
              for Billings-area homeowners to find you. Your business must
              already be listed on Billings Home Pros. You can upgrade after submitting a claim; Featured placement starts after claim review.
            </p>

                <div className="featuredBenefits">
  <span>✓ Priority placement above standard listings</span>
  <span>✓ Featured badge that stands out to homeowners</span>
<span>✓ Receive homeowner quote requests directly</span>
</div>
            <div className="featuredPrice">
              <strong>$29.99</strong>
              <span>/ month</span>
            </div>

            {featuredCheckoutEnabled ? (
              <>
              <input
                type="text"
                className="featuredBusinessInput"
                placeholder="Enter your business name"
                value={featuredBusinessName}
                onChange={(event) =>
                  setFeaturedBusinessName(event.target.value)
                }
              />
  
              <button
                type="button"
                className="featuredUpgradeButton"
                onClick={handleFeaturedCheckout}
                disabled={featuredStatus === "loading"}
              >
                {featuredStatus === "loading"
                  ? "Opening Checkout..."
                  : "Upgrade to Featured"}
              </button>
  
              {featuredMessage && (
                <p className="featuredMessage">
                  {featuredMessage}
                </p>
              )}
  
              <small>Cancel anytime.</small>
              </>
            ) : (
              <p className="featuredMessage">
                Featured upgrades are coming soon. You can claim or add your
                business for free in the meantime.
              </p>
            )}
          </div>
        </div>
      </section>

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
