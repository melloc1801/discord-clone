export type TokenPayloadType = {
  email: string;
  username: string;
};

export type VerifiedTokenPayload = TokenPayloadType & {
  iat: number;
  exp: number;
};
