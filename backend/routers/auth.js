import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../Schema/user.js';
import generateToken from "../utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";
import setSessionId from "../service/auth.js";
import asyncHanlder from "express";
import {checkAuth, verifyJWT} from "../middlewares/checkAuth.js";
import userToken from "../Schema/userToken.js";
const router = Router();
const secret = process.env.SECRET;

// import {accessToken, refreshToken} from '../utils/generateToken.js';
// import {checkAuthByCookies} from "../middlewares/checkAuth.js";

router.get('/hello', checkAuth , async (req, res) => {
    try {
        res.status(200).json({
            "msg" : "Check done"
        })
    } catch (e) {
        console.log("in try")
        res.status(404).json({
            "e" : e
        })
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({
                "error" : "Email already registered"
            })
        }

        if (!email || !password || !confirmPassword) {
            return res.status(404).json({
                "message" : "Please input all the required fields"
            })
        }

        if (password!==confirmPassword) {
            return res.status(400).json({
                "error" : "Passwords do not match"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword
        })
        const saveUser = await newUser.save();
        return res.status(201).json({
            message: 'User registered successfully',
            user: saveUser
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
    next();
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email });

    // if (!foundUser || !foundUser.active) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    const comparePassword = await bcrypt.compare(password, foundUser.password)
    if (!comparePassword) return res.status(401).json({ message: 'Unauthorized' })

    const payload = {id:foundUser._id, roles:foundUser.roles}

    const accessToken = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        // secure: true, //only for https
        sameSite: 'None', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match r
    })

    const Token = await userToken.findOne({userId:foundUser._id})
    if (Token) await userToken.deleteOne();
    await new userToken({userId: foundUser._id, token: refreshToken}).save();

    // Send accessToken containing username and roles
    res.status(200).json({
        "message" : "login success",
        "accessToken" : accessToken,
        "refreshToken" : refreshToken
    })
})

router.get('/refresh', async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.SECRET,
        asyncHanlder(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            const foundUser = await User.findOne({ email: decoded.email }).exec()
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.email,
                        "roles": foundUser.roles
                    }
                },
                process.env.SECRET,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        })
    )
})

router.post('/logout', async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
})

/*router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                "message" : "Please provide both details"
            })
        }
        const user = await User.findOne({email});
        const isPassword = await bcrypt.compare(password, user.password);
        if (!user || !isPassword) {
            return res.status(401).json({
                "error" : "Invalid credentials"
            })
        }

        //Setup of auth (cookies)

        // const sessionId = uuidv4();
        // // setSessionId(sessionId, user);
        // res.cookie('uid', sessionId);

        const { accessToken, refreshToken } = await generateToken(user, res);

        res.status(200).json({
            "message": "login success",
            "accessToken": accessToken,
            "refreshToken": refreshToken
        })
    } catch (err) {
        console.error("error", err)
        res.status(500).json({
            error: err.message
        });
    }
    next();
})*/

export default router;