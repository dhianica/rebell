import crypto, { BinaryToTextEncoding } from 'crypto';
import dotenv from 'dotenv'
import ShortCrypt from 'short-crypt';
import { IEncryptTypes } from '../type';
dotenv.config()

export const getHash = (text: string,
  length: number,
  algorithm: string = 'sha256',
  encoding: BinaryToTextEncoding = 'hex'): string =>
  crypto.createHash(algorithm).update(text).digest(encoding).substring(0, length)

export const encrypt= (originalText: string, key: string): IEncryptTypes => {
  const iv = crypto.randomBytes(4);
  const cipher = crypto.createCipheriv('aes256', key, iv);
  const encryptedText = cipher.update(originalText, 'utf8', 'hex') + cipher.final('hex')
  const result: IEncryptTypes = {
    key,
    encryptedText,
    iv
  }
  return result
}

export const shortEncrypt = (text: string): string => {
  const sc = new ShortCrypt(process.env.KEY);
  return sc.encryptToURLComponent(text);
}


