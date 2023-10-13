import {format} from "date-fns";
import { v4 as uuid } from "uuid";
import path from "path";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsDir = path.join(__dirname, '..', 'logs');
        const logFilePath = path.join(logsDir, logFileName);

        if (!await fsPromises.stat(logsDir).catch(() => null)) {
            await fsPromises.mkdir(logsDir, { recursive: true });
        }
        await fsPromises.appendFile(logFilePath, logItem);
    } catch (err) {
        console.log(err)
    }
}

const logger = async (req, res, next) => {
    await logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

export { logEvents, logger };