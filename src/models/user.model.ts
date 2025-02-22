import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IUser {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true });

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(this.password,10);
        this.password = hashedPassword;
    }
    next();
})

const User = mongoose.models.User || mongoose.model<IUser>("User",userSchema)

export default User