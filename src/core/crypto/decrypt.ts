import crypto from 'crypto';

export const decrypt = (decryptText: string, key: string, iv: string): string => {
  const decipher = crypto.createDecipheriv('aes256', key, Buffer.from(iv, 'hex'));
  const decryptedMessage = decipher.update(decryptText, 'hex', 'utf-8') + decipher.final('utf8');
  return decryptedMessage.toString()
}

export const decryptNotSafed = (text: string): string => {
  const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

