const {Router} = require('express')
const userController = require('../controller/userController')
const auth = require('../middleware/auth')
const route = Router()

route.post('/api/auth/register',userController.registerUser)
route.post('/api/auth/login',userController.signing)
route.post('/api/auth/access', userController.access);
route.get('/api/auth/user',auth,userController.info);
route.post('/api/auth/createpost',auth,userController.createPost);
route.get('/api/auth/getallpost',userController.getallposts);
route.get('/api/auth/getpostsearch',userController.getallpostSearch);
route.get('/api/auth/getpostid',auth,userController.postbyid);
route.put('/api/auth/like',auth,userController.likeposts);
route.put('/api/auth/dislike',auth,userController.dislikeposts);
route.put('/api/auth/user_avatar',auth,userController.updatepic);
route.get('/api/auth/getsinglepost/:id',auth,userController.getIndividualpost);
route.get('/api/auth/getsingleuser/:id',userController.getuserid);
route.post('/api/auth/searchuser',userController.allSearchUser)
route.delete('/api/auth/deletepost/:profileId',auth, userController.deleteprofileImage);
route.get('/api/auth/getpost',userController.SpecificPost)
route.post('/api/auth/google_signing',userController.google);
route.get('/api/auth/signout', userController.signout);

module.exports = route;