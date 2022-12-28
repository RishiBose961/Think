const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const validateEmail = require('../helpers/vaildateEmail')
const createToken = require('../helpers/createToken')
const Post = require('../models/postModel')

//google login
const { google } = require("googleapis");
const { OAuth2 } = google.auth


const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, avatar, companyname, password } = req.body

            if (!username || !email || !avatar || !companyname || !password) {
                return res.status(400).json({ message: 'please fill all' })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'email is not valid' })
            }
            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'user already exists' })
            }
            if (password.length < 6) {
                return res.status(400).json({ message: 'password is too short' })
            }
            //hashing the password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            //check user
            const check = await User.findOne({ email })
            if (check) {
                return res.status(400).json({ message: "This Email already Register" })
            }
            //add user
            const newUsers = new User({
                username, email, avatar, companyname, password: hashPassword
            })
            await newUsers.save();
            //activation sucess
            res.status(200).json({ message: "You can now Signin." })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    signing: async (req, res) => {
        try {
            //get cred
            const { username, email, password } = req.body;
            //check email
            const user = await User.findOne({
                $or: [
                    { email },
                    { username }
                ]
            })
            if (!user)
                return res.status(400).json({ message: "This Email is not Register in our Server" })
            //check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: "This password is incrrect." })

            //refresh token
            const rf_token = createToken.refresh({ id: user._id })
            res.cookie("_apprftoken", rf_token, {
                httpOnly: true,
                path: "/api/auth/access",
                maxAage: 24 * 60 * 60 * 1000
            });
            //siging success
            res.status(200).json({ message: "Sigin Success" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    access: async (req, res) => {
        try {
            // rf token
            const rf_token = req.cookies._apprftoken;
            if (!rf_token) return res.status(400).json({ msg: "Please sign in." });
            // validate
            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please sign in again." });
                // create access token
                const ac_token = createToken.access({ id: user.id });
                // access success
                return res.status(200).json({ ac_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    info: async (req, res) => {
        try {
            //get info  -password
            const user = await User.findById(req.user.id).select("-password");
            //return user
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createPost: async (req, res) => {
        try {
            const { title, category, createdby, thumbnail, description } = req.body
            if (!title || !category || !createdby || !description) {
                return res.status(402).json({ error: "Plz add all the fields" })
            }

            const post = new Post({
                title,
                category,
                createdby,
                thumbnail,
                description,
                postedBy: req.user.id
            })
            post.save().then(posts => {
                res.json({ post: posts })
            }).catch(error => console.log(error))
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getallposts: async (req, res) => {
        Post.find()
            .populate("postedBy", "username avatar companyname followers following")
            .sort({ createdAt: -1 })
            .then(posts => {
                res.json({ posts })
            })
            .catch(err => {
                console.log(err);
            })
    },
    likeposts: async (req, res) => {
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user.id }
        }, {
            new: true
        }).populate("postedBy", "username avatar companyname").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
    },
    dislikeposts: async (req, res) => {
        Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user.id }
        }, {
            new: true
        }).populate("postedBy", "username avatar companyname").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            else {
                res.json(result)
            }
        })
    },
    getallpostSearch: async (req, res) => {
        Post.find()
            .populate("postedBy", "username avatar companyname")
            .sort({ likes: -1, createdAt: -1 }).limit(10)
            .then(searchlist => {
                res.json({ searchlist })
            })
            .catch(err => {
                console.log(err);
            })
    },
    updatepic: async (req, res) => {
        User.findByIdAndUpdate(req.user.id, {
            $set: { avatar: req.body.avatar }
        }, { new: true }, (err, result) => {
            if (err) {
                return res.status(422).json({ err: "Pic Cannot Avatar" })
            }
            res.json(result)
        })
    },
    postbyid: async (req, res) => {
        Post.find({ postedBy: req.user.id })
            .populate("postedBy", "_id username")
            .then(mypost => {
                res.json({ mypost })
            })
            .catch(err => {
                console.log(err);
            })
    },
    //To search Specific User through email username
    allSearchUser: async (req, res) => {
        let userPattern = new RegExp("^" + req.body.query)
        User.find({
            $or: [
                { username: { $regex: userPattern } },
                { email: { $regex: userPattern } },
            ],
        })
            .select("_id email username avatar")
            .then(user => {
                res.json({ user })
            }).catch(err => {
                console.log(err)
            })
    },
    // get indidual post by n user
    getIndividualpost: async (req, res) => {
        try {
            // console.log(req.params);
            const { id } = req.params;
            const postindividual = await Post.findById({ _id: id });
            // console.log(postindividual);
            res.status(201).json(postindividual)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    //to see other user profile or info
    getuserid: (req, res) => {
        User.findOne({ _id: req.params.id })
            .select("-password")
            .then(user => {
                Post.find({ postedBy: req.params.id })
                    .populate("postedBy", "_id name")
                    .exec((err, posts) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        }
                        res.json({ user, posts })
                    })
            }).catch(err => {
                return res.status(404).json({ error: "User not found", err })
            })
    },

    // followuser: async(req, res)=>{
    //     User.findByIdAndUpdate(req.body.followId,{
    //         $push:{followers:req.user.id}
    //     },{new:true},(err,result)=>{
    //         if (err) {
    //             return res.status(422).json({error:err})
    //         }
    //         User.findByIdAndUpdate(req.user.id,{
    //             $push:{following:req.body.followId}
    //         },{new:true}).select("-password")
    //         .exec((err, result) => {
    //             if (err) {
    //                 return res.status(422).json({ error: err })
    //             }
    //             else {
    //                 res.json(result)
    //             }
    //         })
    //     })
    // },
    // unfollowuser: (req, res)=>{
    //     User.findByIdAndUpdate(req.body.unfollowId,{
    //         $pull:{followers:req.user.id}
    //     },{new:true},(err,results)=>{
    //         if (err) {
    //             return res.status(422).json({error:err})
    //         }
    //         User.findByIdAndUpdate(req.user.id,{
    //             $pull:{following:req.body.unfollowId}
    //         },{new:true}).select("-password")
    //         .then(results=>{
    //             res.status(200).json(results)
    //         }).catch(err=>{
    //             return res.status(422).json({error:err})
    //         })
    //     })
    // },

    SpecificPost: async (req, res) => {
        const keyword = req.query.search
            ? {
                $or: [
                    { category: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};
        const posts = await Post.find(keyword).find();
        res.send(posts);
    },

    google: async (req, res) => {
        try {
            const { tokenId } = req.body;

            const client = new OAuth2(process.env.G_CLIENT_ID)

            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.G_CLIENT_ID
            })


            const { email_verified, name, email, given_name } = verify.payload


            // console.log(verify.payload);
            if (!email_verified)
                return res.status(400).json({ msg: "Email verification failed." });

            // passed verification
            const user = await User.findOne({ email });

            if (user) {
                // refresh token
                const rf_token = createToken.refresh({ id: user._id });
                // store cookie
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000, // 24hrs
                });
                res.status(200).json({ msg: "Signing with Google success." });
            } else {
                // new user / create user
                const password = email + process.env.G_CLIENT_ID;
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new User({
                    username: name,
                    email,
                    avatar,
                    companyname: given_name,
                    password: hashPassword
                });
                await newUser.save();
                // sign in the user
                // refresh token
                const rf_token = createToken.refresh({ id: user._id });
                // store cookie
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000, // 24hrs
                });
                // success
                res.status(200).json({ msg: "Signing with Google success." });
            }
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }




    },
    signout: async (req, res) => {
        try {
            res.clearCookie("_apprftoken", { path: "/api/auth/access" })
            res.status(200).json({ message: "Signout Successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
}


module.exports = userController