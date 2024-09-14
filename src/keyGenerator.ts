import crypto from "node:crypto";
export default class KeyGenerator {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }
}
