import dotenv from 'dotenv';
import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert';
import AuthBearer from 'hapi-auth-bearer-token';
import routes from './routes.js';
import makeUserAuth from './auth/user.js';

dotenv.config();

const init = async () => {

    const server = Hapi.server({
        port: parseInt(process.env.PORT || '5000'),
        host: process.env.HOST || 'localhost',
        routes: {
            cors: true,
            validate: {
                failAction: (request, h, err) => {
                    if(process.env.NODE_ENV === 'production'){
                        console.error('ValidationError: ', err.message);
                        throw new Error('Invalid request payload input');
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    })

    await server.register([Inert, AuthBearer]);

    makeUserAuth(server);

    server.route(routes)
    await server.start()
    console.log('Server running on ', server.info.uri)

}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()