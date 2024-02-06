import User from "../../database/schemas/User/User";
import crypto from 'crypto';
import { decrypt, encrypt } from "../../utils";
import { IEncryptedData, IUserData } from "../../interfaces";
class authController {
    constructor() { }
    //https://www.youtube.com/watch?v=Dlt0IGls_hA implementar isso depois
    public async signUp(username: string, email: string, password: string) {
        try {
            const user: any = await User.findOne({ email });
            if (user) {
                return {
                    error: true,
                    message: `User already exists!`,
                    return: undefined,
                    status: 409,
                }
            } else {
                const uId: string = crypto.randomBytes(16).toString('hex');
                const accessToken: string = crypto.randomBytes(16).toString('hex');
                let userData: IUserData = {
                    uId,
                    accessToken,    
                    username,
                    email,
                    createdAt: new Date(),
                }

                let encryptedPass: IEncryptedData = encrypt(password);

                await User.create({
                    uId,
                    accessToken,
                    username,
                    email,
                    password: encryptedPass,
                }).catch(err => {
                    return {
                        error: true,
                        message: `A error is ocurred on create user db.`,
                        return: err,
                        status: 500,
                    }
                });

                return {
                    error: false,
                    message: `User ${username} created!`,
                    return: userData,
                    status: 201,
                }
            }
        } catch (error) {
            return {
                error: true,
                message: `A error is ocurred: ${error}`,
                return: undefined,
                status: 500,
            }
        }
    }

    public async signIn(email: string, password: string) {
        try {
            const user: any = await User.findOne({ email, password });
            if (user) {
                let encryptedPass: IEncryptedData = user.password;
                let descryptedPass = decrypt(encryptedPass.encryptedData, encryptedPass.key, encryptedPass.iv);
                if (password === descryptedPass) {
                    user.password = undefined;
                    return {
                        error: false,
                        message: `User ${user.username} logged!`,
                        return: user,
                        status: 200,
                    }
                } else {
                    return {
                        error: true,
                        message: `Password incorrect!`,
                        return: undefined,
                        status: 401,
                    }
                }
            } else {
                return {
                    error: true,
                    message: `User not found!`,
                    return: undefined,
                    status: 404,
                }
            }
        } catch (error) {
            return {
                error: true,
                message: `A error is ocurred: ${error}`,
                return: undefined,
                status: 500,
            }
        }
    }
}

export default authController;