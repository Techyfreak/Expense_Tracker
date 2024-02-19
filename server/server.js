const express = require("express")
const app = express();
const cors = require('cors')


require('dotenv').config({path:'./config.env'});
const port = process.env.PORT||3001

app.use(cors());
app.use(express.json());

const con = require("./db/connection")

app.use(require("./routes/routes"))

con.then(db=>{
    if (!db) return process.exit(1);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.on("error",err=>console.log(`Failed to connect with http server:${err}`));

}).catch(error=>{
    console.log(`Connection Failed..!${error}`);
})
