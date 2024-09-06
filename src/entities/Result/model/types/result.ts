interface ResultSchema {
  result?: ResultResponse;
}

interface ResultResponse {
  body: string;
  status: number;
}

export { type ResultSchema, type ResultResponse };
