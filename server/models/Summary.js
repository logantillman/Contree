import mongoose from 'mongoose';

const summarySchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    //TODO add date property
    categories: {
        type: Object,
        required: true
    }
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;