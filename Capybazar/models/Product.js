import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: String,
    image: String, // Guardaremos imágenes en Base64 o URL
    rating: { type: Number, default: 0 },
    reviews: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    deletedAt: Date
});

export default mongoose.model('Product', ProductSchema);
