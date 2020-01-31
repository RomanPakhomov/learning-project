import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema(
    {
        login:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
        },
        birthDate: {
            type: String,
        },
        userId: {
            type: String,
            default: uuid(),
        },
        token: {
            type: String,
            default: uuid,
        }
    },
    {
        timestamps: true
    }
);

export default schema;