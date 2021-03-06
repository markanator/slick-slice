const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: `Mikes Pizza`,
    siteUrl: `https://mikespizza-waukegan.netlify.app`,
    description: 'Voted best pizza in Lake County!',
    twitter: '@Mark_Ambrocio1',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'p78p691d',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
