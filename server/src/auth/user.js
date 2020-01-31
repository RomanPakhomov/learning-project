import db from '../db/connection.js';

export default function(server){
  console.log('test')
  server.auth.strategy('user','bearer-access-token', {
    validate: async (request, token, h) => {
      console.log(token)
      const user = await db.User.findOne({ token });
      if(user){
        console.log('success authorization');
        return {
          isValid: true,
          credentials: user,
          artifacts: {} 
        }
      } else {
        console.log('error authorization')
      }
      return {
        isValid: false,
        credentials: {},
        artifacts: {}
      }
    }
  })
}