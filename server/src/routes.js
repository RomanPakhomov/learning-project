import Joi from '@hapi/joi';
import controllers from './controllers.js';

export default [
    {
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: './public',
                redirectToSlash: true,
                index: true,
            }
        }
    },
    {
        method: 'GET',
        path: '/user/profile',
        handler: controllers.getUserProfile,
        options: {
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: controllers.userLogin,
        options: {
            validate: {
                payload: Joi.object({
                    login: Joi.string().required(),
                    password: Joi.string().required(),
                }).required()
            },
            response: {
                failAction: 'log'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/register',
        handler: controllers.registerUser,
        options: {
            validate: {
                payload: Joi.object({
                    login: Joi.string().required(),
                    password: Joi.string().required(),
                    password2: Joi.string().required(),
                    name: Joi.string().required(),
                    surname: Joi.string(),
                    birthDate: Joi.date(),
                }).required()
            }
        }
    },
    {
        method: 'POST',
        path: '/user/change',
        handler: controllers.changeUserInfo,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    surname: Joi.string(),
                    birthDate: Joi.date(),
                }).required()
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/change-password',
        handler: controllers.changeUserPassword,
        options: {
            validate: {
                payload: Joi.object({
                    passwordOld: Joi.string().required(),
                    password: Joi.string().required(),
                    password2: Joi.string().required()
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/create-story',
        handler: controllers.createStory,
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    content: Joi.string().required(),
                    category: Joi.number().required(),
                    mainImage: Joi.string().required(),
                    public: Joi.boolean().required(),
                    images: Joi.string()
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/update-story',
        handler: controllers.updateStory,
        options: {
            validate: {
                payload: Joi.object({
                    storyId: Joi.string().required(),
                    title: Joi.string().required(),
                    content: Joi.string().required(),
                    category: Joi.number().required(),
                    mainImage: Joi.string().required(),
                    public: Joi.boolean().required(),
                    images: Joi.string()
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/new-comment',
        handler: controllers.addComment,
        options: {
            validate: {
                payload: Joi.object({
                    storyId: Joi.string().required(),
                    comment: Joi.string().required()
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/user/like/',
        handler: controllers.like,
        options: {
            validate: {
                payload: Joi.object({
                    storyId: Joi.string().required(),
                })
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: controllers.getUsers,
        options: {
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'GET',
        path: '/stories',
        handler: controllers.getAllStories
    },
    {
        method: 'GET',
        path: '/stories/categories',
        handler: controllers.getStoriesCategories,
    },
    {
        method: 'GET',
        path: '/stories/{categoryId}',
        handler: controllers.getStoriesByCategory,
        options: {
            validate: {
                params: Joi.object({
                    categoryId: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/stories/user/',
        handler: controllers.getStoryByUserId,
        options: {
            validate: {
                query: Joi.object({
                    userId: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/story',
        handler: controllers.getStoryById,
        options: {
            validate: {
                query: Joi.object({
                    storyId: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/story/comments',
        handler: controllers.getStoryComments,
        options: {
            validate: {
                query: Joi.object({
                    storyId: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/story/likes',
        handler: controllers.getStoryLikes,
        options: {
            validate: {
                query: Joi.object({
                    storyId: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/story/public',
        handler: controllers.changeStoryPublicStatus,
        options: {
            validate: {
                query: Joi.object({
                    storyId: Joi.string().required(),
                    status: Joi.string().required()
                }).required()
            },
            auth: {
                strategy: 'user'
            }
        }
    },
    {
        method: 'POST',
        path: '/story/delete',
        handler: controllers.deleteStory,
        options: {
            validate: {
                payload: Joi.object({
                    storyId: Joi.string().required(),
                }).required()
            },
            auth: {
                strategy: 'user'
            }
        }
    }
]