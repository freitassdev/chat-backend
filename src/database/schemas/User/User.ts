import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    uId: {
        type: String,
        required: true,
        unique: true,
    },
    accessToken: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        key: { type: Buffer, required: true },
        iv: { type: Buffer, required: true },
        encryptedData: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

const User = model('User', userSchema);

export default User;
