import { JWT } from "google-auth-library";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const getGoogleSheet = async () => {
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
  if (process.env.NODE_ENV === "development") {
    const row = new DummyRow();
    return [row];
  }
  const sheet = await getGoogleSheet();
  if (!sheet) return [];
  return await sheet.getRows();
};

type Variant = "multi" | "single" | "single+1";

const VARIANT: Variant = "single+1";

class DummyRow extends GoogleSpreadsheetRow {
  constructor() {
    super({} as any, 0, []);
  }

  getMulti(field: string) {
    switch (field) {
      case "key":
        return "SzASX3sn5D";
      case "name":
        return "Sheahan";
      case "title":
        return "Sheahan and David";
      case "olderKids":
        return "1";
      case "response":
        return "";
      case "canPlusOne":
        return "0";
      default:
        return "";
    }
  }

  getSingle(field: string) {
    switch (field) {
      case "key":
        return "SzASX3sn5D";
      case "name":
        return "Alayna";
      case "title":
        return "Alayna";
      case "olderKids":
        return "0";
      case "response":
        return "";
      case "canPlusOne":
        return "0";
      default:
        return "";
    }
  }

  getSinglePlusOne(field: string) {
    switch (field) {
      case "key":
        return "SzASX3sn5D";
      case "name":
        return "Aliea";
      case "title":
        return "Aliea";
      case "olderKids":
        return "0";
      case "response":
        return "";
      case "canPlusOne":
        return "1";
      default:
        return "";
    }
  }

  get(field: string) {
    switch (VARIANT) {
      case "multi":
        return this.getMulti(field);
      case "single":
        return this.getSingle(field);
      case "single+1":
        return this.getSinglePlusOne(field);
    }
  }
}
