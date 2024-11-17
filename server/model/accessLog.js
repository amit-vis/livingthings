const mongoose = require("mongoose");

const accessLogSchema = mongoose.Schema({
    accessTime:{
        type: String,
        required: true
    },
    accessDate:{
        type: Date,
        required: true
    },
    employeeName:{
        type: String,
        required: true
    },
    algo_status:{
        type: Number,
        required: true
    },
},{
    timestamps: true
})

const AccessLog = mongoose.model("AccessLog", accessLogSchema);
module.exports = AccessLog;