import mongoose from 'mongoose'

export default new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email_address: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        createdAt: 'created_at',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        updatedAt: 'updated_at',
    },
})
