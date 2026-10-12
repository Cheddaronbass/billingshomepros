"use client";

import { useState } from "react";

export default function GooglePlacesAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function search(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/admin/google-place-candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 401 ? "Incorrect admin key." : data.error || "Lookup failed.");
      setResult(data);
    } catch (err) {
      setError(err.message || "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 780, margin: "40px auto", padding: "0 20px", color: "#152f3d" }}>
      <h1>Google Places Matching</h1>
      <p>Administrator lookup only. Searches do not change contractor listings.</p>
      <form onSubmit={search} style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <label>Admin key
          <input aria-label="Admin key" type="password" autoComplete="off" required value={adminKey} onChange={(e) => setAdminKey(e.target.value)} style={inputStyle} />
        </label>
        <label>Contractor name
          <input required maxLength={150} value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} placeholder="Billings Landscaping, LLC" />
        </label>
        <label>Phone number
          <input required maxLength={40} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} placeholder="406-697-7553" />
        </label>
        <button type="submit" disabled={loading} style={{ padding: 14, background: "#174d64", color: "white", border: 0, borderRadius: 6, cursor: "pointer" }}>
          {loading ? "Searching…" : "Search Google Places"}
        </button>
      </form>
      {error && <p role="alert" style={{ color: "#9d2323" }}>{error}</p>}
      {result && (
        <section aria-live="polite" style={{ marginTop: 30 }}>
          <h2>Results ({result.candidates?.length || 0})</h2>
          <p>{result.exactPhoneMatches?.length || 0} exact phone match(es). Review name, address and status before approving any match.</p>
          {!result.candidates?.length && <p>No candidates found. Do not assume the business is invalid.</p>}
          {result.candidates?.map((place) => (
            <article key={place.placeId} style={{ border: "1px solid #c7d1d6", borderRadius: 8, padding: 18, marginBottom: 12 }}>
              <h3 style={{ marginTop: 0 }}>{place.name}</h3>
              <p>{place.address}<br />{place.phone}<br />{place.businessStatus}</p>
              <p><strong>Phone:</strong> {place.phoneMatches ? "Exact match" : "Does not match"} · <strong>Name:</strong> {place.nameMatches ? "Exact match" : "Review"}</p>
              <p><strong>Google Place ID:</strong> <code style={{ overflowWrap: "anywhere" }}>{place.placeId}</code></p>
              {place.website && <p><a href={place.website} target="_blank" rel="noopener noreferrer">Business website ↗</a></p>}
              <small>Read-only preview. No changes saved.</small>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const inputStyle = { display: "block", width: "100%", padding: 12, marginTop: 6, border: "1px solid #9eafb7", borderRadius: 6, boxSizing: "border-box" };
