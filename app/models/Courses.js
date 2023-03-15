let mongoose = require("mongoose")
let Schema = mongoose.Schema
let slug = require('mongoose-slug-generator')
let mongooseDelete = require("mongoose-delete")


let Courses = new Schema ({
    name : {
        type: String,
    },
    description : {
        type: String, 
    },
    img : {
        type: String,
    },
    videoID:{
        type: String
    },
    slug : {
        type: String,
        slug: "name",
        unique: true,
    },
    level : {
        type: String
    },
}, { timestamps: true })
// Plugins
mongoose.plugin(slug),
mongoose.plugin(mongooseDelete,{ 
    overrideMethods: true,
    deletedAt: true,
})


module.exports = mongoose.model("Courses", Courses)