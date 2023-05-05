import mongoose from 'mongoose';

const summarySchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    categories: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;