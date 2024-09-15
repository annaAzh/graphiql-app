export const decode64 = (value: string) => {
  return Buffer.from(decodeURIComponent(value), 'base64').toString();
};
