export function getErrorMessage(mes: string): string {
  const result = mes.replace(')', '').split('/').reverse();
  return result[0].replaceAll('-', ' ');
}
