import crypto from 'crypto';
import dotenv from 'dotenv'
import ShortCrypt from 'short-crypt';
import { EErrorMessage, ECore, EErrorCode } from '../enum';
import { generateCode, getMethodName } from '../../utils/index.util'
import { setError } from '../error';

dotenv.config()

export const decrypt = (decryptText: string, key: string, iv: string): string => {
  try {
    const decipher = crypto.createDecipheriv('aes256', key, Buffer.from(iv, 'hex'));
    const decryptedMessage = decipher.update(decryptText, 'hex', 'utf-8') + decipher.final('utf8');
    return decryptedMessage.toString()
  } catch (error) {
    error.errorPath = `${EErrorCode.CORE}-${ECore.CRYPTO_DECRYPT}-${getMethodName(new Error())}`
    error.errorCode= `${EErrorCode.CORE}-${generateCode(4)}`
    error.errorMessage = error.message
    error.message= EErrorMessage.INVALID_SYNTAX
    setError(error)
    throw error
  }
}

export const shortDecrypt = (decryptText: string): string => {
  try {
    const sc = new ShortCrypt(process.env.KEY);
    const result1: Uint8Array = sc.decryptURLComponent(decryptText) as Uint8Array;
    return Buffer.from(result1).toString('utf8')
  } catch (error) {
    error.errorPath = `${EErrorCode.CORE}-${ECore.CRYPTO_DECRYPT}-${getMethodName(new Error())}`
    error.errorCode= `${EErrorCode.CORE}-${generateCode(4)}`
    error.errorMessage = error.message
    error.message= EErrorMessage.INVALID_SYNTAX
    setError(error)
    throw error
  }
}

