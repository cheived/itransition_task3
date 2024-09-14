import crypto from "node:crypto";

export default class HMACGenerator {
  getHmac(key: string, value: string) {
    return crypto.createHmac("sha3-256", key).update(value).digest("hex");
  }
}
