const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
},{timestamps: true})

//Middleware do Mongoose para hashear a senha antes de salvar
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // só hasheia se a senha foi alterada
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('users', UserSchema)
module.exports = User