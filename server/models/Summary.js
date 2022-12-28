import mongoose from 'mongoose';

const summarySchema = mongoose.Schema({
    categories: {
        type: Object,
        required: true
    }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;