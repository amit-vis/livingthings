const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

const app = express();
const db = require("./config/db");
const auth = require("./config/auth")

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

app.use("/", require("./routes"))
app.listen(port, (err)=>{
    if(err){
        console.error("error in listining the port", err)
    }
    console.log("server is litening the port", port);
})