import mongoose from 'mongoose';
import { Language } from '~/types/language';

const languageSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    native: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model<Language>('Language', languageSchema);