import getSessionId from '../service/auth.js'
import user from "../Schema/user.js";
import jwt from "jsonwebtoken";

// export const checkAuth = async (req, res, next) => {
//     const token = req.headers["x-access-token"]
//     if (!token) {
//         return res.status(403).json({
//             "message": "Invalid token"
//         })
//     }
//     try {
//         const tokenDetails = jwt.verify(
//             token,
//             process.env.SECRET
//         );
//         req.user = tokenDetails;
//         next();
//     } catch (err) {
//         res.status(403).json({
//             "error" : err
//         })
//     }
// }

export const checkAuthByCookies = async (req, res, next) => {
    try {
        const userUid = req.cookies.uid;
        if (!userUid) {
            return res.redirect("/login");
        }
        const user = await getSessionId(userUid);
        if (!user){
            return res.redirect("/login")
        }
        req.user= user;
        next();
    } catch (e) {
        console.error("error", e)
    }
}

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1]

    console.log("authHeader", authHeader)
    console.log("token", token)

    jwt.verify(
        token,
        process.env.SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            console.log("err", err);

            console.log("success");
            console.log("decoded", decoded);

            req.user = decoded._id
            req.roles = decoded.roles[0]
            next();
        }
    )

}