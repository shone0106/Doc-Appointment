import mongoose from "mongoose";

const validTokenSchema = new mongoose.Schema({
    token: String
})

type ValidToken = mongoose.InferSchemaType<typeof validTokenSchema>

export default mongoose.model<ValidToken>("Valid-Tokens", validTokenSchema)