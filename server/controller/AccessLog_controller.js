const AccessLog = require("../model/accessLog");
const Energy = require("../model/energy");

module.exports.createLog = async (req, res)=>{
    try {
        const {accessTime, accessDate, employeeName, algo_status} = req.body;
        if(!accessTime || !accessDate || !employeeName){
            return res.status(400).json({
                message: "kindly give the required details!",
                success: false
            })
        }
        const newLog = await AccessLog.create({
            accessTime: accessTime,
            accessDate:accessDate,
            employeeName: employeeName || req.user.name,
            algo_status: algo_status
        })

        const filterData = await Energy.find({algo_status: algo_status}).select("algo_status total_kwh");
        return res.status(200).json({
            message: "log created successFully",
            success: true,
            data: filterData,
            logDate: newLog

        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in createLog",
            success: false
        })
    }
}

module.exports.getLog = async (req, res)=>{
    try {
        const logData = await AccessLog.find({}).sort({accessTime: 1});
        if(!logData || logData.length === 0){
            return res.status(400).json({
                message: "No logs available!",
                success: false
            })
        }
        return res.status(200).json({
            message: "Logs Data fetched successfully!",
            data: logData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in fetching the log data!",
            success: false
        })
    }
}