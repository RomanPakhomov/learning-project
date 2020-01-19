import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userSchema from './userSchema.js';
import storySchema from './storySchema.js';
import commentSchema from './commentSchema.js';
import likeSchema from './likeSchema.js';

dotenv.config()

// для подключения облачной версии MongoDB
//const mongoUri = process.env.MONGO_URI;

const hostPort = `${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}`;
mongoose.connect(`mongodb://${hostPort}/site`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => {
        const db = mongoose.connection;
        console.log('Successful connection to MongoDB')
        
    })
    .catch( err => console.error(err))

const User = mongoose.model('User', userSchema);
const Story = mongoose.model('Story', storySchema);
const Comment = mongoose.model('Comment', commentSchema);
const Like = mongoose.model('Like', likeSchema);

export default{
    User,
    Story,
    Comment,
    Like
}