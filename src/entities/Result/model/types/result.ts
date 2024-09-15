interface ResultSchema {
  result?: ResultResponse;
}

interface ResultResponse {
  body: string;
  status: number | string;
}

export { type ResultSchema, type ResultResponse };
