import crypto from 'crypto';
import dotenv from 'dotenv'
import ShortCrypt from 'short-crypt';

dotenv.config()

export const decrypt = (decryptText: string, key: string, iv: string): string => {
  const decipher = crypto.createDecipheriv('aes256', key, Buffer.from(iv, 'hex'));
  const decryptedMessage = decipher.update(decryptText, 'hex', 'utf-8') + decipher.final('utf8');
  return decryptedMessage.toString()
}

export const shortDecrypt = (decryptText: string): string => {
  const sc = new ShortCrypt(process.env.KEY);
  const result1: Uint8Array = sc.decryptURLComponent(decryptText) as Uint8Array;
  return Buffer.from(result1).toString('utf8')
}

