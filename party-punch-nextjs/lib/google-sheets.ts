import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '1do5dpqF9ztGcEG-QD4T9b3UP3Sfuwq4QfIBK2KiXslA';
const WORKSHEET_NAME = process.env.NEXT_PUBLIC_WORKSHEET_NAME || 'Events';

// Server-side only credentials
const getAuthClient = () => {
  const credentials = {
    type: 'service_account',
    project_id: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
    private_key_id: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: `${process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID}@appspot.gserviceaccount.com`,
    client_id: '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID}%40appspot.gserviceaccount.com`,
  };

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
};

export type RawEventInfo = {
  eventName: string;
  description?: string;
  date: string;
  time?: string;
  facebookEventURL?: string;
  location?: string;
  price?: string;
};

export async function fetchEventsFromSheet(): Promise<RawEventInfo[]> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${WORKSHEET_NAME}!A:H`, // Adjust columns as needed
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Skip header row
    const [headers, ...dataRows] = rows;

    // Map rows to EventInfo objects
    return dataRows.map((row, index) => ({
      eventName: row[1] || '',
      date: row[2] || '',
      time: row[3] || '',
      description: row[4] || '',
      price: row[5] || '',
      facebookEventURL: row[6] || '',
      location: row[7] || '',
    }));
  } catch (error) {
    console.error('Error fetching events from Google Sheets:', error);
    throw error;
  }
}
