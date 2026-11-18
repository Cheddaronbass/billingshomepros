# BHP Appliance Installation — implementation log (2026-11-18)

- Audited 147 business records in Supabase. Only Homewerx Services matched appliance/dryer-related keywords; its listed dryer vent and general installation work does **not** establish appliance installation. No contractor records changed or duplicated.
- Added `/appliance-installation` category landing page, with dishwasher, laundry, refrigerator, range/oven and built-in appliance filters; honest empty state and contractor sign-up.
- Added appliance-installation search routing, homepage related-services link, and sitemap entry.
- Appliance repair remains distinct; no repair businesses or installation services fabricated.
- Source commits: 599a9a7, 17ff7a1, 83fc9e1, 8db6f42.
- Pending: confirm final Vercel production deployment READY; verify mobile and desktop rendering; confirm actual installers before assigning listings. Main homepage remains 12 category tiles; new category is linked under related services.

## Installer discovery and listing update (2026-11-18)
- Verified public installation evidence for Homewerx Services (appliance/built-in installations), Handy Home Services (refrigerator installation), Solid Ground Property Services (official site and BBB), MT Delivery (appliance installation), and Radio Equipment Co (public business specialty listing).
- Checked Supabase for existing business names before adding entries. Cross-listed Homewerx ID 109 and Handy Home ID 111 using `Appliance Installation` service tag, retaining canonical profiles.
- Created new unclaimed records: Solid Ground ID 159, Radio Equipment Co ID 160, MT Delivery ID 161. Added only documented broad installation service, not unconfirmed appliance-specific specialties.
- Updated shared CategoryPage query to include canonical cross-category listings with the installation tag (commit e6926c2).
- No outreach sent; no claim/contact verification asserted. Follow up on business contacts and installation specialties separately.
- Sources: https://solidgroundpropertyservices.com/ ; https://www.bbb.org/us/mt/billings/profile/general-contractor/solid-ground-property-services-inc-1296-1000194421 ; public business directory records for MT Delivery, Radio Equipment Co, Homewerx and Handy Home Services.
- Pending final deployment and live rendering verification.

## Listing follow-up — 2026-11-18
- MT Delivery (Supabase ID 161): attached confirmed official website https://www.mtdeliveryllc.com/ . Official company logo remains pending: no verifiable downloadable brand asset was obtained; do not substitute an invented mark or unrelated delivery icon.
- Radio Equipment Co (ID 160): old listed site http://radioappliance.com/ could not be opened by user. Flag as potential website repair/replacement outreach opportunity, subject to confirming contact and prior outreach history before sending. Do not describe as definitively offline or without a website.
- No outreach sent in this update.

## Radio Equipment Co outreach preparation — 2026-11-18
- Gmail searches for Radio Equipment, radioappliance.com and John Eastman did not identify prior relevant contractor correspondence (some unrelated name matches).
- Confirmed phone (406) 256-9778 and business address 1205 Monad Rd, Billings, MT 59101 from public directory/business results. Listed website radioappliance.com not opening for user; no assumption of permanent outage.
- Prepared personalized website-update / Eby Media website-help email; not sent because no verified recipient email was found. Next action: obtain confirmed email via phone or official business contact channel, then send and log message ID. Avoid duplicates.

## Confirmation outreach sent — 2026-11-18
- MT Delivery: sent confirmation email to mtdeliveryllc@gmail.com, Gmail message ID 1a1efc7143f54d27. Asked for listing confirmation, logo, and installation specifics.
- Solid Ground Property Services: sent confirmation email to support@solidgroundpropertyservices.com, Gmail message ID 1a1efc71b6c822c6. Asked for listing and services confirmation and logo.
- Gmail pre-send searches found no previous matching outreach to these businesses.
- Radio Equipment Co: website-help draft prepared but NOT sent; no reliable email recipient found. Email-first only; no cold calls.
- Existing Homewerx and Handy Home were cross-listed, not newly added businesses; no new confirmation email sent to them in this batch.

## Replacement prospect audit — 2026-11-18
- Per owner direction, deleted Radio Equipment Co (ID 160) from Supabase listings; no outreach sent.
- Cross-listed existing Houser Plumbing LLC (ID 4) and Elevated Handyman and Construction LLC (ID 63) with `Appliance Installation` service tag, preserving their original profiles and avoiding duplicate entries. Houser official kitchen plumbing page explicitly advertises dishwasher installation; BBB profile for Elevated explicitly lists appliance installation.
- Houser website https://www.houserplumbing.com/kitchen-plumbing publishes jeffh@houserplumbing.com; Gmail history shows prior BHP outreach to this address. Do not resend generic confirmation.
- Elevated website https://elevatedconstructionbillings.com/ and BBB business contact channel exist; no confirmed direct email yet. Gmail searches showed no previous messages matching company/domain.
- Additional candidates researched but not added without stronger local service/contact verification: A&M Mobile Handyman (info@ammobilehandyman.com, appliance-specific scope unconfirmed), A-1 Appliance Repair (appliance install listed but no verified email).
- No new outreach sent during replacement audit.

## Fred's Appliance listing — 2026-11-18
- Added new unclaimed Fred's Appliance Billings listing, Supabase business ID 162, category appliance-installation. Confirmed row after insert.
- Official Billings storefront: 2649 King Ave W, Billings MT 59102, (406) 894-2310; https://www.fredsappliances.com/locations/billings.
- Fred's official site confirms delivery and installation for purchased appliances; some appliances require certified installation partners. Description reflects this limitation.
- Published service email SVC.Requests@fredsappliances.com recorded as lead_email, but NOT contact-verified. No outreach sent.
- Logo pending authentic verified asset; no logo fabricated.

## MT Delivery forwarded contact and Fred's outreach — 2026-11-18
- MT Delivery old Gmail sent automated notice forwarding to mattg@mtdeliveryllc.com (message 1a1efc726a725826). Original address said no longer active; NOT a delivery failure. Existing BHP business ID 161 retained; lead_email updated to new address, still unverified/unclaimed.
- Sent new confirmation request to mattg@mtdeliveryllc.com, Gmail message ID 1a1efcd36f20a9ea; do not send again until reply/follow-up review.
- Fred's Appliance business ID 162 remains unclaimed. Drafted tailored email to SVC.Requests@fredsappliances.com; NOT sent pending user review.
