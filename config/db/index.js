let mongoose = require("mongoose")

async function connect(){
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_edu');
        await console.log("Connect To DB Successfully!!!")
    } catch (error) {
        await console.log("Error Encounter While Trying To Connect To DB!!![config/db/index.js]")
    }
}

module.exports = {connect}