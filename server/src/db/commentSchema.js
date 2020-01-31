import mongoose from 'mongoose';
import uuid from 'uuid';

const schema = new mongoose.Schema(
    {
        storyId:{
            type: String,
            required: true,
        },
        userId:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        commentId: {
            type: String,
            default: uuid,
        },
    },
    {
        timestamps: true
    }
);

export default schema;