const appConfig = require('./appConfig');
require('dotenv').config();

const buildCredentials = ({ PROJECT_ID, PRIVATE_KEY, PRIVATE_KEY_ID }) => ({
  type: 'service_account',
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
  client_email: `${PROJECT_ID}@appspot.gserviceaccount.com`,
  client_id: '',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${PROJECT_ID}%40appspot.gserviceaccount.com`,
});

const SPREADSHEET_ID = '1do5dpqF9ztGcEG-QD4T9b3UP3Sfuwq4QfIBK2KiXslA';

const { theme, ...siteMetadata } = appConfig;

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-google-spreadsheets',
      options: {
        spreadsheetId: SPREADSHEET_ID,
        worksheetTitle: 'Events',
        credentials: buildCredentials(process.env),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/media`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: theme.brand,
        theme_color: theme.brand,
        display: 'minimal-ui',
        icon: 'src/images/punch-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    {
        resolve: `gatsby-plugin-s3`,
        options: {
            bucketName: 'partypunchband.com'
        },
    },
  ],
}
