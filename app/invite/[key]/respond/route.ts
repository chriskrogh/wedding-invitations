import { z } from "zod";

import { getGoogleSheetRows } from "@/lib/google-sheets";

const bodySchema = z.array(
  z.object({
    name: z.string(),
    response: z.union([z.literal("1"), z.literal("0")]),
    plusOneName: z.string().optional(),
  })
);

export const POST = async (req: Request) => {
  const key = getKeyFromPathname(new URL(req.url).pathname);
  const allRows = await getGoogleSheetRows();
  console.log("key", key);
  const rows = allRows.filter((row) => row.get("key") === key);

  if (rows.length === 0) {
    return new Response(null, { status: 404 });
  }

  const responses = bodySchema.parse(await req.json());
  for (const response of responses) {
    const row = rows.find((row) => row.get("name") === response.name);
    if (!row) {
      continue;
    }
    row.assign(response);
    await row.save();
  }

  return new Response(null, { status: 200 });
};

const getKeyFromPathname = (pathname: string) => {
  const split = pathname.split("/");
  return split[2];
};
