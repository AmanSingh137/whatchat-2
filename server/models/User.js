const mongoose = require('mongoose');
const brcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Please enter your name"]
    }, 
    email: {
        type: String, 
        required: [true, "Please enter your email"],
        unique: [true, "Duplicate"], 
        lowercase: true, 
        validate: [isEmail, "Please enter a valid email address"]
    }, 
    password: {
        type: String, 
        required: [true, "Please enter a password"], 
        minlength: [8, "The password should be atleast 8 characters long"]
    }
})

userSchema.pre('save', async function(next){
    const salt = await brcrypt.genSalt() ;
    this.password = await brcrypt.hash(this.password, salt);
    console.log('before save', this)
    next()
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const isAuthenticated = await brcrypt.compare
        (password, user.password);
        if(isAuthenticated)
        {
            return user;
        }
        throw Error('incorrect pwd');
    } else{
        throw Error('incorrect Email');
    }
}

userSchema.post('save', function(doc, next){
    console.log('after save', doc)
    next()
})

const User = mongoose.model('user', userSchema);
module.exports = User;