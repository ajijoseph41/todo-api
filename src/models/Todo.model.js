const mongoose = require('mongoose')
const fuzzy = require('mongoose-fuzzy-search');
const NAME_MAX_LEN = 25
const DESC_MAX_LEN = 150
const CATEGORY_MAX_LEN = 15

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Todo name is required!'],
        trim: true,
        maxlength: [NAME_MAX_LEN, `Todo name can't be more than ${NAME_MAX_LEN} char`],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [DESC_MAX_LEN, `The description can't be more than ${DESC_MAX_LEN} char`],
    },
    category: {
        type: String,
        trim: true,
        maxlength: [CATEGORY_MAX_LEN, `Category name can't be more than ${CATEGORY_MAX_LEN} char`],
        default: "general",
    },
    createdBy: {
        type: String,
        required: [true, 'Created by is required'],
    },
},{timestamps: true}
);

todoSchema.plugin(fuzzy, {fields: {name_tg: 'name'}})

module.exports = mongoose.model('Todo', todoSchema);