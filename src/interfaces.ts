export interface IEncryptedData {
    encryptedData: string;
    key: Buffer;
    iv: Buffer;
}

export interface IUserData {
    uId: string;
    accessToken: string;
    username: string;
    email: string;
    createdAt: Date;
}

export interface ISignUpData {
    username: string,
    email: string,
    password: string
}

export interface IControllerResponse {
    error: boolean, 
    message: string,
    return: any, 
    status: number
}