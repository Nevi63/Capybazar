import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: String,
    address: String,
    birthdate: Date,
    password: { type: String, required: true },
    userType: { type: String, enum: ['cliente', 'vendedor', 'admin'], default: 'cliente' },
    profilePicture: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date
});

export default mongoose.model('User', UserSchema);
