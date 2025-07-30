const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignmembers', // Reference to Asignmembers collection
        required: true
    },
    task: {
        type: String,
        required: true
    },
    TaskDescription: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'on progress'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('AsignTask', taskSchema);