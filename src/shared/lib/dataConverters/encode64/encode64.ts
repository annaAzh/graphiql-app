export const encode64 = (value?: string) => {
  return Buffer.from(value || '').toString('base64');
};
