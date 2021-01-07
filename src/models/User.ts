import { requireType } from "./functions";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  items: string[];
}

const UserSchema = new Schema({
  username: requireType(String),
  password: requireType(String),
  items: [{ type: String }],
});

export default model<IUser>("User", UserSchema);
