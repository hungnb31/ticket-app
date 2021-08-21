import * as mongoose from "mongoose";

// defined all attributes needed when create an user
interface UserAttrs {
  email: string;
  password: string;
}

// definded all fields and methods that user model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

// defined all fields that user document has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
