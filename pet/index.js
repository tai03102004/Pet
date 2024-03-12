const express = require('express');
const app = express();

var morgan = require('morgan');

const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/locales',
    defaultLocale: 'en'
});

// Khởi tạo i18n cho mỗi yêu cầu
app.use((req, res, next) => {
    i18n.init(req, res);
    next();
});

// Flash
const flash = require("express-flash");
app.use(flash());

// Cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser("LHNASDASDAD"));

// Session
const session = require("express-session");
app.use(session({ cookie: { maxAge: 60000 } }));

var path = require('path');

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// moment
const moment = require('moment');

// Hide important things
require("dotenv").config();

app.use(express.static(`${__dirname}/public`));

// app.use(morgan("combined"));

// Connected Databsae
const database = require("./config/database");
database.connect();

// file pug
app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

//method-override:  use patch , delete ,.. 
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Routes Client
const routeClient = require("./routes/client/index.route");
routeClient(app);

// Routes Admin
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);

// /admin
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// local moment
app.locals.moment = moment;

app.listen(port ,()=>{
    console.log(`listening on port ${port}`);
});