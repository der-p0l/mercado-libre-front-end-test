// TODO: use translations
const CONDITION_MAPPING: {
  [key: string]: string,
} = {
  new: "Nuevo",
  used: "Usado",
};
const UNKNOWN_CONDITION = "?";

/**
 * "Translates" one condition received from the API to the text that will be
 * shown to the user.
 */
export const mapCondition = (condition: string) => {
  const mapped = CONDITION_MAPPING[condition];

  if (mapped) {
    return mapped;
  }

  return UNKNOWN_CONDITION;
};
