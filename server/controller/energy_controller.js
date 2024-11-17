const Energy = require("../model/energy");

module.exports.chartData = async (req, res)=>{
    try {
        const {startDate, endDate} = req.query;
        let query = {};

        if(startDate && endDate){
            query.createdAt = {$gte: new Date(startDate), $lte: new Date(endDate)};
        }

        const energyData = await Energy.find(query)
        .select("createdAt algo_status total_kwh")
        .sort({createdAt: 1});
        if(!energyData || energyData.length === 0){
            return res.status(400).json({
                message: "Data is not available or not exist",
                success: false
            })
        }
        return res.status(200).json({
            message: "data fetched successfully!",
            success: true,
            data: energyData
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in finding the data",
            success: false
        })
    }
}