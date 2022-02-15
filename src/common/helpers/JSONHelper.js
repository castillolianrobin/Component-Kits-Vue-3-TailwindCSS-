

export function stringToJSON(value, defaultVal = null) {
  // (value.includes('{') || value.includes('['))
  if (!value) {
    return defaultVal;
  } else {
    return JSON.parse(value);
  }
}