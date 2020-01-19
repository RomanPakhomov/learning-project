import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true
        },
        mainImage: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true
        },
        images: {
            type: String,
        },
        storyId: {
            type: String,
            default: uuid,
        },
        public: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

export default schema;