export function extractCountryCode(phoneNumber: string) {
  // Define a regular expression to match country codes
  const countryCodeRegex = /^\+(\d+)/;

  // Use the regular expression to match the country code
  const matches = phoneNumber.match(countryCodeRegex);

  // If a match is found, return the country code, otherwise return null
  if (matches && matches.length > 1) {
    return matches[1];
  } else {
    return null;
  }
}
