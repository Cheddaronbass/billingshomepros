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
