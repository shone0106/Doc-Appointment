import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notifcation: {
        type: Array,
        default: [],
    }
})

type User = mongoose.InferSchemaType<typeof userSchema>

export default mongoose.model<User>('user', userSchema)