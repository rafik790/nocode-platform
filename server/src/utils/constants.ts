import type { CookieOptions } from 'express';

export const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://easyformbuilder.netlify.app',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://127.0.0.1:3200',
];

export const accessTokenExpiresIn = '1h';
export const refreshTokenExpiresIn = '7d';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const SYS_MESSAGE = {
  SUCCESS: {
    CODE: "ER0000",
    MSG: "success"
  },
  BAD_REQUEST: {
    CODE: "ER0400",
    MSG: "bad request"
  },

  INTERNAL_SERVER_ERROR: {
    CODE: "ER0500",
    MSG: "We have encountered some problem. Please try again later."
  },
  INCORRECT_CREDENTIAL: {
    CODE: "ER0020",
    MSG: "The credentials you have entered are not valid"
  },
  TOKEN_EXPIRED: {
    CODE: "ER0320",
    MSG: "The link you followed has expired"
  },
  ACCESS_TOKEN_EXPIRED: {
    CODE: "ER0034",
    MSG: "Access Token Expired.",
  },
  NOT_FOUND: {
    CODE: "ER0400",
    MSG: "Data not found"
  },
  BAD_PARAMETER: {
    CODE: "ER0042",
    MSG: "Parameters are not valid."
  }
};
