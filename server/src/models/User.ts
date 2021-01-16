import { requireType } from './functions';
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  items: { item: Schema.Types.ObjectId; target?: number }[];
  isConfirmed: boolean;
}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: requireType(String),
  items: [{ item: { type: Schema.Types.ObjectId, ref: 'Item' }, target: Number, _id: false }],
  isConfirmed: { type: Boolean, default: false },
});

export default model<IUser>('User', UserSchema);
