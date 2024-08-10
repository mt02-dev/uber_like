export const REQUEST_STATE = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
}

export const HTTP_STATUS_CODE = {
  NOT_ACCEPTABLE: 406,
}

export type RequestState = typeof REQUEST_STATE[keyof typeof REQUEST_STATE];
export type HttpStatusCode = typeof HTTP_STATUS_CODE[keyof typeof HTTP_STATUS_CODE];
