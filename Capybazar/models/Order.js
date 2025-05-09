import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    state: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'entregado'], default: 'pendiente' },
    paymentMethod: { type: String, required: true }
});

export default mongoose.model('Order', OrderSchema);
