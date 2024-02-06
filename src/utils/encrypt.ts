import crypto from 'crypto';

export function encrypt(data: string) {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    let encryptedInfos = {
        encryptedData: encrypted,
        key,
        iv
    }
    return encryptedInfos;
}

export function decrypt(encrypted: string, key: Buffer, iv: Buffer) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
