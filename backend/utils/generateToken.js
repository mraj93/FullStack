dotenv.config();
import jwt from 'jsonwebtoken';
import user from "../Schema/user.js";
import dotenv from "dotenv";
import userToken from "../Schema/userToken.js";
const secret = process.env.SECRET;
import cookie from 'cookie';

const generateToken = async(user, res) => {
    try{
        const payload = {_id:user._id, roles:user.roles}

        const accessToken = jwt.sign(
            payload,
            secret,
            {expiresIn : "5m"}
        )
        const refreshToken = jwt.sign(
            payload,
            secret,
            {expiresIn : "30d"}
        )

        // const cookieOptions = {
        //     httpOnly: true,
        //     secure: true, // Set "secure" to true for HTTPS
        // };

        res.cookie()

        // res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken, cookieOptions));

        const Token = await userToken.findOne({userId:user._id})
        if (Token) await userToken.deleteOne();
        await new userToken({userId: user._id, token: refreshToken}).save()
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err)

        // res.status(400).json({
        //     "error" : error
        // })
    }
}

export default generateToken;