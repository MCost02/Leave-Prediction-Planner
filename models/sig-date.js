const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({
    date: { type: String, required: [true] },
    description: { type: String },
    instructor: { type: Schema.Types.ObjectId, ref: 'User' },
}
);

module.exports = mongoose.model('sigDate', dateSchema);