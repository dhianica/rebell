import crypto, { BinaryToTextEncoding } from 'crypto';
import { IEncryptTypes } from '../types';
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

export const encryptNotSafed = (text: string): string => {
  const cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}


