import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
email: { type: String, unique: true, required: true, index: true },
name: String,
passwordHash: String,
provider: { type: String, enum: ['local', 'google','otp'], required: true }
}, { timestamps: true });


export const User = mongoose.model('User', userSchema);