export default function ContactStatus({ business }) {
  const established = business.contact_status === "contact_verified" && Boolean(business.contact_verified_at);
  if (!established) return null;

  const explanation = business.lead_email_verified
    ? "Contact verified: we received a direct business email response. This does not verify licensing, quality, or availability."
    : "Contact established: this business contacted Billings Home Pros directly. Email ownership and business claim may still be pending.";

  return (
    <span
      title={explanation}
      role="img"
      aria-label={explanation}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9199a3",
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1,
        marginLeft: 6,
        verticalAlign: "middle"
      }}
    >
      ✓
    </span>
  );
}
