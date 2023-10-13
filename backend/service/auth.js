import user from "../Schema/user.js";

const mapSessionId = new Map()

const setSessionId = () => {
    mapSessionId.set(id, user);
}

const getSessionId = () => {
    mapSessionId.set(id, user);
}

export default {setSessionId, getSessionId};