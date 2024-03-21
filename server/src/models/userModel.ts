import { type Query, Schema, model, Model, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  password: string;
  passwordChangedAt?: Date;
  refreshToken: string[];
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  isDeleted: boolean;
  deletedAt: Date | null;
}

export interface IUserDocument extends IUser, Document {
  generateJWTAcessToken(clientID: string): string;
}

const userSchema = new Schema<IUserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  passwordChangedAt: Date,
  refreshToken: [String],
  passwordResetToken: String,
  passwordResetExpires: Date,
  isDeleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  deletedAt: {
    type: Date,
    default: null,
    select: false,
  },
},
  { timestamps: true },
);

userSchema.methods.generateJWTAcessToken = function (clientID: string): string {
  const expiresInMunites = 120;
  let payload = {
    clientID: clientID,
    userID: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    expireMinutes: expiresInMunites,
    issuer: 'mindstar'
  };

  let secreteKey = process.env.JWT_ACCESS_TOKEN_KEY as string;
  let token = jwt.sign(payload, secreteKey, {
    expiresIn: expiresInMunites + "m"
  });
  return token;
};

export default model<IUserDocument>('User', userSchema);
