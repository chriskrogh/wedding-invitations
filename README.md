# Wedding Invites

Most wedding invite services require you to pay per invite, but the only cost to the provider is hosting the template...

I'd feel pretty bad to pay for something that I can make myself, so I made a configurable wedding invite template.

## Using the template

To use this yourself, you just want to

- Fork this repo.
- Replace the contents of `configuration.ts` with information about your wedding and whatever photos you'd like.
- Create a [google sheet](https://sheets.new) that matches this template: TODO.
- Create a [google service account](https://cloud.google.com/iam/docs/service-accounts-create) that can write to the sheet.
- Deploy this to Vercel.
- Add the following env variables
  - `GOOGLE_SHEET_ID`: the ID of the google sheet you created.
  - `GOOGLE_SHEETS_CREDS`: the stringified service account JSON.
- Send the invites & let the responses roll in!
