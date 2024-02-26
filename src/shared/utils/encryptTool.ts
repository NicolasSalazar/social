import { BadRequestException } from "@nestjs/common";
import { createCipheriv, randomBytes, scryptSync, pbkdf2Sync } from "crypto";

export const encrypt = async (
    data: { [key: string]: boolean | string | number | [] | {} },
    secret_encrypt: string
  ): Promise<string> => {
    try {
      const random_byte = await randomBytes(16);
      const cipher = createCipheriv(
        "aes-256-gcm",
        scryptSync(secret_encrypt, "salt", 32),
        random_byte
      );
      let encrypted = cipher.update(JSON.stringify(data));
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return random_byte.toString("hex") + ":" + encrypted.toString("hex");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };
  
  export const decrypt = (data: string, secret_encrypt: string) => {
    const data_part = data.split(":");
    const random_byte = Buffer.from(data_part.shift(), "hex");
    const decrypted_data = Buffer.from(data_part.join(":"), "hex");
    const decipher = createCipheriv(
      "aes-256-gcm",
      scryptSync(secret_encrypt, "salt", 32),
      random_byte
    );
    let decrypted = decipher.update(decrypted_data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return JSON.parse(decrypted.toString());
  };

export const encryptPassword = (password: string, secret: string): string => {
    return pbkdf2Sync(password, secret, 100000, 64, "sha512").toString("hex");
  };