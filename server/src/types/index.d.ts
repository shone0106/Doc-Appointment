import { Express } from "express-serve-static-core";
import { Types } from 'mongoose'

interface Payload {
    userId: Types.ObjectId;
}
declare module "express-serve-static-core" {
  interface Request {
    user: Payload;
  }
}
