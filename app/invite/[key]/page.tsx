import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

import { getGoogleSheetRows } from "@/lib/google-sheets";

import { Gift } from "./_sections/Gift";
import { Hero } from "./_sections/Hero";
import { RSVP } from "./_sections/RSVP";

type Props = {
  params: { key: string };
};

const Page: React.FC<Props> = async ({ params }) => {
  const { key } = params;
  noStore();
  const rows = await getGoogleSheetRows();
  const row = rows.find((row) => row.get("key") === key);

  if (!row) {
    notFound();
  }

  const title: string = row.get("title");
  const names = getNamesFromTitle(title);
  const response = row.get("response");
  const olderKids = row.get("olderKids") === "1";
  const canPlusOne = row.get("canPlusOne") === "1";

  return (
    <main>
      <Hero title={title} response={response} />
      <RSVP {...{ _key: key, names, olderKids, canPlusOne, response }} />
      <Gift />
    </main>
  );
};

export default Page;

const getNamesFromTitle = (title: string) => {
  const firstSplit = title.split(" and ");
  if (firstSplit.length === 1) {
    return firstSplit;
  }
  const secondSplit = firstSplit[0].split(",");
  return [...secondSplit, firstSplit[1]];
};
