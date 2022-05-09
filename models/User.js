const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const passportLocalMongoose = require("passport-local-mongoose");
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;


mongoose.plugin(slug);


const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: { type: String },
    password: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    slug: { type: String, slug: "username", unique: true },
    isAdmin: { type: Boolean, default: false }


}, {
    timestamps: true,

});



User.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

//Add plugins
User.plugin(passportLocalMongoose);
User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('User', User);