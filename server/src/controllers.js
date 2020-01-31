import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import db from './db/connection.js';
import categories from './categories/index.js';

function getStoriesId(stories){
    const idList = [];
    stories.forEach(function(item){
        idList.push(item.storyId)
    })
    return idList
}

async function addStoriesLike(stories){
    try {
        const idList = getStoriesId(stories);
        const likes = await db.Like.find().where('storyId').in(idList);
        if(likes){
            stories.map( function(story, i, stories){
                stories[i]['_doc'].likes = [];
                likes.map( like => {
                    if(like.storyId === story.storyId) {
                        stories[i]['_doc'].likes.push({userId: like.userId})
                    }
                })
            })
        }
        return stories;
    } catch(e) {
        console.error(e);
        return Boom.badRequest('Ошибка получения лайков историй');
    }
}

export default {
    async getUserProfile(req, h){
        const { credentials } = req.auth;
        return credentials;
    },
    async userLogin(req, h){
        try{
            const { login, password } = req.payload;
            const user = await db.User.findOne({login: login});
            if(user){
                const result = await bcrypt.compare(password,user.password);
                if(result){
                    return {
                        result: 'Авторизация прошла успешно',
                        user: user
                    };
                } else {
                    return Boom.unauthorized('Ошибка входа: неправильлная пара логин/пароль');
                }
            } else {
                return Boom.badRequest('Ошибка входа: пользователя не существует');
            }
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка входа, нарушена работа сервера');
        }
    },
    async registerUser(req, h){
        const check = await db.User.findOne({login: req.payload.login});
        if(check){
            return Boom.badRequest('Ошибка регистрации: данный логин уже используется');
        } else {
            const user = req.payload;
            if(user.password === user.password2){
                try{
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(user.password, salt);
                    await db.User.create({
                        login: user.login,
                        password: hash,
                        name: user.name,
                        surname: user.surname,
                        birthDate: user.birthDate,
                    });
                    return 'Регистрация прошла успешно, авторизуйтесь';
                } catch(e) {
                    console.error(e);
                    return Boom.badRequest('Ошибка регистрации: нарушена работа сервера');
                };
            } else {
                return Boom.badRequest('Ошибка регистрации: пароли не совпадают');
            }
        }
    },
    async changeUserInfo(req, h){
        const { credentials } = req.auth;
        const update = req.payload;
        const newInfo = {
            name: update.name || credentials.name,
            surname: update.surname || credentials.surname,
            birthDate: update.birthDate || credentials.birthDate
        }
        try{
            const user = await db.User.updateOne({
                token: credentials.token
            },
            {
                name: newInfo.name,
                surname: newInfo.surname,
                birthDate: newInfo.birthDate,
            })
            return {
                result: 'Данные пользователя обновлены успешно',
                user: user
            };
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка обновления информации: нарушена работа сервера');
        }
    },
    async changeUserPassword(req, h){
        const { credentials } = req.auth;
        const update = req.payload;
        const result = await bcrypt.compare(update.passwordOld,credentials.password);
        if(result){
            if(update.password == update.password2){
                try{
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(update.password, salt);
                    await db.User.updateOne({
                        token: credentials.token
                    },
                    {
                        password: hash
                    })
                    return 'Пароль обновлен успешно';
                } catch(e) {
                    console.log(e);
                    return Boom.badRequest('Ошибка обновлениия пароля: нарушена работа сервера');
                }
            } else {
                return Boom.badRequest('Ошибка обновлениия пароля: новые пароли не совпадают');
            }
        } else{
            return Boom.badRequest('Ошибка обновлениия пароля: настоящий пароль не совпадает');
        }
        
    },
    async getUsers(req, h){
        try {
            const users = await db.User.find({}, 
                'userId name surname login birthDate')
                .sort({ createdAt : -1});
            return users;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Невозможно получить данные пользователя: ошибка сервера');
        }
    },
    getStoriesCategories(){
        return categories;
    },
    async createStory(req, h){
        const { credentials } = req.auth;
        const story = req.payload;
        try{
            await db.Story.create({
                title: story.title,
                content: story.content,
                category: story.category,
                mainImage: story.mainImage,
                userId: credentials.userId,
                public: story.public,
                images: story.images,
            });
            return 'Новая история создана успешно';
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка создания истории: ошибка сервера');
        }
    },
    async updateStory(req, h){
        const story = req.payload;
        const { credentials } = req.auth;
        try{
            await db.Story.updateOne({
                storyId: story.storyId,
                userId: credentials.userId
            },
            {
                title: story.title,
                content: story.content,
                category: story.category,
                mainImage: story.mainImage,
                image: story.images,
                public: story.public
            });
            return 'История успешно обновлена';
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно обновить историю');
        }
    },
    async changeStoryPublicStatus(req, h){
        const storyId = req.query.storyId;
        const status = req.query.status;
        try {
            await db.Story.updateOne({
                storyId: storyId,
            },{
                public: status
            });
            return 'Статус публикации обновлен'
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно обновить статус истории');
        }
    },
    async deleteStory(req, h){
        const { credentials } = req.auth;
        const story = req.payload;
        try{
            await db.Story.deleteOne({
                storyId: story.storyId,
                userId: credentials.userId
            })
            return 'История успешно удалена'
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно удалить историю');
        }
    },
    async getAllStories(req, h){
        try{
            const result = await db.Story.find({})
                .where({public: true})
                .sort({createdAt : -1});
            const stories = await addStoriesLike(result);
            return stories;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить истории');
        }
    },
    async getStoryById(req, h){
        const storyId = req.query.storyId;
        try{
            const story = await db.Story.findOne({
                storyId: storyId
            });
            return story;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить историю');
        }
    },
    async getStoryByUserId(req, h){
        const userId = req.query.userId;
        try {
            const result = await db.Story.find({userId: userId}).sort({ createdAt : -1});
            const stories = await addStoriesLike(result);
            return stories;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить истории');
        }
    },
    async getStoriesByCategory(req, h){
        const categoryId = req.params.categoryId;
        try{
            const result = await db.Story.find({category: categoryId}).where({public: true}).sort({ createdAt : -1});
            const stories = await addStoriesLike(result);
            return stories;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить истории');
        }
    },
    async getStoryComments(req, h){
        const storyId = req.query.storyId;
        try {
            let comments = await db.Comment.find({storyId: storyId});
            const usersId = comments.map( item => item.userId);
            const users = await db.User.find().where('userId').in(usersId);
            comments.forEach((comment, i, comments) => {
                users.forEach((user)=>{
                    if(comment.userId === user.userId) {
                        comments[i]['_doc'].userName = user.name + ' ' + user.surname; 
                    }
                })
            })
            return comments;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить комментарии');
        }
    },
    async getStoryLikes(req, h){
        const storyId = req.query.storyId;
        try {
            const likes = await db.Like.find({storyId: storyId});
            return likes;
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно получить лайки'); 
        }
    },
    async addComment(req, h){
        const { credentials } = req.auth;
        const comment = req.payload;
        try{
            const result = await db.Comment.create({
                storyId: comment.storyId,
                userId: credentials.userId,
                content: comment.comment
            });
            return {
                message: 'Комментарий успешно добавлен',
                result: result
            }
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно добавить комментарий');
        }
    },
    async like(req, h){
        const { credentials } = req.auth;
        const like = req.payload;
        try{
            const find = await db.Like.findOne({
                storyId: like.storyId,
                userId: credentials.userId
            });
            if(find) {
                await db.Like.deleteOne({
                    storyId: like.storyId,
                    userId: credentials.userId
                });
            } else {
                await db.Like.create({
                    storyId: like.storyId,
                    userId: credentials.userId
                }); 
            }
            return 'like work'
        } catch(e) {
            console.error(e);
            return Boom.badRequest('Ошибка сервера: невозможно поставить / убрать лайк');
        }
    }
}