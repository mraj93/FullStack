import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // if (allowedOrigins.includes(origin)) {

            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
            console.error("error is : Not allowed by CORS")
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}

export {corsOptions};
