import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date
});

export default mongoose.model('Category', CategorySchema);
