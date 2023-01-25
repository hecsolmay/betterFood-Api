const { Schema, model } = require('mongoose');

const ROLES = ["admin","user","moderator","employee"]

const roleSchema = new Schema({
    name: { type: String }
}, {
    versionKey: false,
})

module.exports = model('Role', roleSchema);