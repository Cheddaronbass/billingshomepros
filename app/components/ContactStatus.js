export default function ContactStatus({ business }) {
  const verified = business.contact_status === "contact_verified" && Boolean(business.contact_verified_at);
  const issue = business.contact_status === "contact_issue";
  const label = verified ? "Contact verified" : issue ? "Contact details under review" : "Contact not yet verified";
  return (
    <span title="Contact checks confirm a working communication method, not contractor quality, availability, licensing, or insurance." style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:8,padding:"5px 10px",borderRadius:20,border:"1px solid "+(verified?"#188eac":"#77777755"),color:verified?"#11a8cc":"inherit",fontSize:12,fontWeight:600}}>
      {verified ? "✓" : "○"} {label}
    </span>
  );
}
