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

app.set("view engine", "hbs");

const static_path = path.join(__dirname, "./public")
app.use(express.static(static_path))

app.use("/userImages",express.static("./uploads/userData/"))

const template_path = path.join(__dirname, "./templates/views")
const parials_path = path.join(__dirname, "./templates/partials")
app.set("views", template_path)
hbs.registerPartials(parials_path)

hbs.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,8);
    return new hbs.SafeString(theString)
});

hbs.registerHelper('eq', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a === b) ? next.fn(this) : next.inverse(this);
});

hbs.registerHelper('eachProperty', function(context, options) {
    var ret = "";
    for(var prop in context)
    {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
});

const router = require("./routes/router")
app.use(router)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})