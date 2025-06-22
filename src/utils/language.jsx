import { LANGUAGE_TO_FLAG } from '../constants/index';

export const LanguageFlag = ({ language }) => {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${langLower} flag`}
    />
  );
};

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);
