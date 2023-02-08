import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    itemID: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;