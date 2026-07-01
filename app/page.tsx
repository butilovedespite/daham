import HomePage from "@/components/HomePage";
import { getProjectIdsWithDetailImages } from "@/lib/projectDetails.server";

export default function Home() {
  const detailProjectIds = getProjectIdsWithDetailImages();

  return <HomePage detailProjectIds={detailProjectIds} />;
}
