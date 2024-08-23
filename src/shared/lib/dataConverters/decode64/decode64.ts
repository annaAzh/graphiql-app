export const decode64 = (value: string) => {
  return Buffer.from(value, 'base64').toString();
};
