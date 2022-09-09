require('dotenv').config()

const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs");
const cookieParser = require('cookie-parser')

var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

const static_path = path.join(__dirname, "./public")
app.use(express.static(static_path))

app.set("view engine", "hbs");
const template_path = path.join(__dirname, "./templates/views")
const parials_path = path.join(__dirname, "./templates/partials")
app.set("views", template_path)
hbs.registerPartials(parials_path)

const router = require("./routes/router")
app.use(router)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})