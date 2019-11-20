import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import { PlatformError } from "../utils/error";
import {
  currentAuthKey,
  issuer,
  authExpiration,
  currentRsaAlgType,
  getSecretByKey,
  getPublicKey,
  IExchangeToken,
  ObjectKeyString
} from "../utils/lib";
import { TokenType } from "../app/models/interfaces/custom/GlobalEnum";
import { SignInOptions } from "../app/models/interfaces/custom/Global";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import UserBusiness from "../app/business/UserBusiness";
import { AuthPayload } from "../app/models/interfaces";
import { AppConfig } from "../app/models/interfaces/custom/AppConfig";
const config: AppConfig = require("../config/keys");
import JwtHelper from "../utils/wrappers/JwtHelper";
import { TokenResult } from "../app/models/interfaces/custom/Account";

declare global {
  interface JSON {
    parse(text: Buffer, reviver?: (key: any, value: any) => any): any;
  }
}

export async function requireAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization: string = req.headers["authorization"] || "";
    const encodedJWT = authorization.substr("Bearer ".length);
    if (!encodedJWT) {
      return next(
        new PlatformError({
          code: 400,
          message: "Please provide a valid token"
        })
      );
    }
    const verifyOptions = {
      issuer: config.AUTH_ISSUER_SERVER,
      audience: req.body.audience,
      type: TokenType.AUTH,
      expiresIn: authExpiration,
      algorithms: [currentRsaAlgType],
      keyid: currentAuthKey
    };
    const publicKey = getPublicKey(currentAuthKey);
    const decoded: TokenResult = await JwtHelper.JwtInitializer().verifyToken(
      encodedJWT,
      publicKey,
      verifyOptions
    );
    if (decoded.error) {
      return next(
        new PlatformError({
          code: 400,
          message: "Invalid token."
        })
      );
    }
    req.user = decoded.data.sub;
    return next();
  } catch (err) {
    return next(
      new PlatformError({
        code: 500,
        message: "Internal Server error occured. Please try again later."
      })
    );
  }
}
