//const DEFAULT_BASE_URL = 'https://qa-ui-pricing-tool.azurewebsites.net/';
//const DEFAULT_BASE_URL = 'https://pricingtool-ui.azurewebsites.net/';

const DEFAULT_BASE_URL = 'https://pricing-tool-dev.test.insightglobal.com/';


function getBaseUrl() {
  const raw = process.env.PLAYWRIGHT_BASE_URL || DEFAULT_BASE_URL;
  return raw.endsWith('/') ? raw : `${raw}/`;
}

/** Label text for the Microsoft account picker in the SSO popup (e.g. user's display name). */
function getMicrosoftAccountLabel() {
  return process.env.PLAYWRIGHT_MS_ACCOUNT_NAME || 'Elijah Paul';
}

module.exports = { getBaseUrl, getMicrosoftAccountLabel, DEFAULT_BASE_URL };