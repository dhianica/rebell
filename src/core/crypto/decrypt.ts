import crypto from 'crypto';

export const decrypt = (decryptText: string, key: string, iv: string): string => {
  const decipher = crypto.createDecipheriv('aes256', key, Buffer.from(iv, 'hex'));
  const decryptedMessage = decipher.update(decryptText, 'hex', 'utf-8') + decipher.final('utf8');
  return decryptedMessage.toString()
}
