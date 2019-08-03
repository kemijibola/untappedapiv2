import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformError } from '../utils/error';
import {
  currentKey,
  issuer,
  authExpiration,
  rsaAlgType,
  getSecretByKey,
  getPublicKey,
  IExchangeToken,
  ObjectKeyString,
  tokenExchange
} from '../utils/lib';
import { TokenType } from '../app/models/interfaces/custom/GlobalEnum';
import { SignInOptions } from '../app/models/interfaces/custom/Global';
import { RequestWithUser } from '../app/models/interfaces/custom/RequestHandler';
import UserBusiness from '../app/business/UserBusiness';
import { AuthPayload } from '../app/models/interfaces';

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
    const authorization: string = req.headers['authorization'] || '';
    let audience = '';
    let subject = '';
    if (authorization === '' || typeof authorization === 'undefined') {
      return next(
        PlatformError.error({
          code: 400,
          message: 'Header is not set.'
        })
      );
    }
    const encodedJWT = authorization.substr('JWT '.length);
    const parts = encodedJWT.split('.');
    if (parts.length !== 3) {
      return next(
        PlatformError.error({
          code: 400,
          message: 'Token is invalid.'
        })
      );
    }

    const header = JSON.parse(Buffer.from(parts[0], 'base64'));
    const payload = JSON.parse(Buffer.from(parts[1], 'base64'));

    audience = payload.aud;
    subject = payload.sub;
    if (header.kid !== currentKey) {
      return next(
        PlatformError.error({
          code: 400,
          message: 'Token is invalid.'
        })
      );
    }
    if (payload.usage !== TokenType.AUTH) {
      return next(
        PlatformError.error({
          code: 400,
          message: 'Token is invalid.'
        })
      );
    }
    const verifyOptions = {
      issuer: payload.iss,
      subject: payload.sub,
      audience: payload.aud,
      expiresIn: authExpiration,
      algorithms: [rsaAlgType],
      keyid: currentKey
    };
    const publicKey = getPublicKey(currentKey);
    const decoded = await jwt.verify(encodedJWT, publicKey, verifyOptions);
    if (!decoded) {
      return next(
        PlatformError.error({
          code: 400,
          message: 'Token is invalid.'
        })
      );
    }
    const destinationResourceUrl = `${issuer}${req.originalUrl}`;
    if (destinationResourceUrl === payload.iss) {
      req.user = decoded;
      return next();
    }

    const userBusiness = new UserBusiness();
    const user = await userBusiness.findUserForExchange(payload.sub);

    if (user.data) {
      const permissionParams: IExchangeToken = {
        destinationUrl: req.originalUrl.toLowerCase(),
        roles: [...user.data.roles]
      };
      const permissions: ObjectKeyString = await tokenExchange(
        permissionParams
      );
      const signInOptions: SignInOptions = {
        issuer: destinationResourceUrl,
        audience: audience,
        expiresIn: authExpiration,
        algorithm: rsaAlgType,
        keyid: currentKey,
        subject: subject
      };
      const payload: AuthPayload = {
        usage: TokenType.AUTH,
        permissions: Object.keys(permissions)
      };
      const privateKey: string = getSecretByKey(currentKey);
      if (privateKey === '') {
        return next(
          PlatformError.error({
            code: 500,
            message: 'Token is invalid'
          })
        );
      }
      const userToken: string = await user.data.generateToken(
        privateKey,
        signInOptions,
        payload
      );
      res.setHeader('authorization', userToken);
      req.user = {
        _id: user.data._id,
        email: user.data.email,
        fullName: user.data.fullName,
        roles: [...user.data.roles],
        token: userToken
      };
      return next();
    }
  } catch (err) {
    console.log(err);
    return next(
      PlatformError.error({
        code: 500,
        message: `${err.message}. Please generate another token.`
      })
    );
  }
}
