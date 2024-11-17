const mongoose = require("mongoose");

const energySchema = mongoose.Schema({
    total_kwh:{
        type: Number,
        required: true
    },
    algo_status:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }
})

const Energy = mongoose.model("Energy", energySchema);
module.exports = Energy;