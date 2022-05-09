const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;


mongoose.plugin(slug);


const News = new Schema({
    name: {type: String, required: true},
    description: {type: String, maxLength: 255},
    image:{type:String},
    date:{type: String},
    author: {type: String},
    body: {type: String},
    createdAt: {type: Date},
    updatedAt: { type: Date},
    slug: { type: String, slug: "name", unique: true }
   
 
},{
    timestamps: true,
    
});

//Add plugins
News.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('News', News);