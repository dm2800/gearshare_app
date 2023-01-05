const mongoose = require("mongoose");

const InstrumentSchema = new mongoose.Schema({

    title:{
        type: String, 
        required: [true, "Name required."]
    }, 

    price: {
        type: Number, 
        required: [true, "Price is required."],
        min: [1, "Price must be more than $1."]
    },


    description: {
        type: String, 
        required: [true, "Description required."]
    }, 

    image: {
        type: String,
        required: [true, "Image required."]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})

const Instrument = mongoose.model("Instrument", InstrumentSchema);

module.exports = Instrument; 

