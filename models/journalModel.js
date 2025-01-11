import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: [true, 'Journal content is required'],
        trim: true,
    },
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;