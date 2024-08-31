export const checkIsValidJson = async (value?: string) => {
  try {
    if (value === undefined) throw new Error('Invalid value');
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};
