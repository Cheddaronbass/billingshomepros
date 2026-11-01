import { withPageSocial } from "../../lib/seoMetadata";
import WinterChecklist from "./WinterChecklist";

export const metadata = withPageSocial({
  title: "Montana Winter Home Preparation Checklist",
  description: "Get your Billings home winter ready with 15 practical tasks, saved checkboxes, a printable checklist, and local professionals for heating, plumbing, and repairs.",
  alternates: { canonical: "/guides/winter-home-checklist" },
});

export default function WinterHomeChecklist() {
  return <WinterChecklist />;
}
