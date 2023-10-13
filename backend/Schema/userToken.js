import mongoose, {Schema} from "mongoose";

const tokenSchema = new mongoose.Schema(
{
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expiresIn: 30 * 864000
    }
});

const userToken = mongoose.model('userToken', tokenSchema);

export default userToken;