import { requireType } from './functions';
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  items: string[];
  isConfirmed: boolean;
}

const UserSchema = new Schema({
  email: requireType(String),
  password: requireType(String),
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  isConfirmed: { type: Boolean, default: false },
});

export default model<IUser>('User', UserSchema);
