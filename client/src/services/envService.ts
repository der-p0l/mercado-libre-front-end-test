/**
 * Gets an environment variable value, throws error on undefined.
 */
export const getEnvVariable = (key: string) => {
  const value = process.env[`REACT_APP_${key}`];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};
