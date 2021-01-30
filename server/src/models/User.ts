import { requireType } from './functions';
import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
export interface IUser extends Document {
  email: string;
  password: string;
  items: { item: Schema.Types.ObjectId; target?: number }[];
  isConfirmed: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date | number;
  generatePasswordReset: () => void;
}

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: requireType(String),
  google: {
    id: String,
    email: String,
  },
  items: [{ item: { type: Schema.Types.ObjectId, ref: 'Item' }, target: Number, _id: false }],
  isConfirmed: { type: Boolean, default: false },
  resetPasswordToken: {
    type: String,
    required: false,
  },

  resetPasswordExpires: {
    type: Date,
    required: false,
  },
});

UserSchema.pre<IUser>('save', function (this, next) {
  if (!this.isModified('password')) return next();
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  return next();
});

UserSchema.methods.generatePasswordReset = function (this: IUser) {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

export default model<IUser>('User', UserSchema);
