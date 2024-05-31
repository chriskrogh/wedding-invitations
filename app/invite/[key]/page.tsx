import { notFound } from "next/navigation";

import { getGoogleSheetRows } from "@/lib/google-sheets";

import { Gift } from "./_sections/Gift";
import { Hero } from "./_sections/Hero";
import { RSVP } from "./_sections/RSVP";

export async function generateStaticParams() {
  const rows = await getGoogleSheetRows();
  return rows
    .filter((row) => !!row.get("title"))
    .map((row) => ({ key: row.get("key") }));
}

type Props = {
  params: { key: string };
};

const Page: React.FC<Props> = async ({ params }) => {
  const { key } = params;
  const rows = await getGoogleSheetRows();
  const row = rows.find((row) => row.get("key") === key);

  if (!row) {
    notFound();
  }

  return (
    <main>
      <Hero title={row.get("title")} response={row.get("response")} />
      <RSVP />
      <Gift />
    </main>
  );
};

export default Page;
