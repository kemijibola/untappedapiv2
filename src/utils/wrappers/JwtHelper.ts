import jwt from "jsonwebtoken";
import { SignInOptions } from "../../app/models/interfaces/custom/Global";
import { TokenResult } from "../../app/models/interfaces/custom/Account";

class JwtHelper {
  static JwtInitializer(): JwtHelper {
    return new JwtHelper();
  }

  generateToken(
    payload: any,
    options: SignInOptions,
    privateKey: string
  ): Promise<any> {
    const promise = new Promise(resolve => {
      let result: TokenResult = { data: "", error: "" };
      jwt.sign(payload, privateKey, options, function(err: any, token: any) {
        if (err) {
          result = { error: err, data: "" };
          resolve(result);
        }
        result = { error: "", data: token };
        resolve(result);
      });
    });
    return promise;
  }

  verifyToken(token: string, publicKey: string, options: any): Promise<any> {
    const promise = new Promise(resolve => {
      let result: TokenResult = { data: "", error: "" };
      jwt.verify(token, publicKey, options, function(err, decoded) {
        if (err) {
          result = { error: err.message, data: "" };
          resolve(result);
        }
        result = { error: "", data: decoded };
        resolve(result);
      });
    });
    return promise;
  }
}

Object.seal(JwtHelper);
export = JwtHelper;
