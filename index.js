require('dotenv').config()

const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs");
const cookieParser = require('cookie-parser')

var cors = require('cors')
app.use(express.json())
const router = require("./routes/router")
const port = process.env.PORT || 3000
app.use(cors())
app.use(router)

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})