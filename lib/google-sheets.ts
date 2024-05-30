import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

export const getGoogleSheet = async () => {
  try {
    const creds = JSON.parse(process.env.GOOGLE_SHEETS_CREDS ?? "");
    const jwt = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: SCOPES,
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID ?? "", jwt);
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
  } catch (error) {
    console.error("Error loading Google Sheets:", error);
    return null;
  }
};

export const getGoogleSheetRows = async () => {
  const sheet = await getGoogleSheet();
  if (!sheet) return [];
  return await sheet.getRows();
};
