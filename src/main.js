const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const { engine } = require('express-handlebars');
const path = require('path');

//!Initializations
const app = express();

//!Settings
app.set('port', process.env.PORT||4001);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//!Middlewars
app.use(session({ //Para mostrar los mensajes de Correo ya registrado
    secret:'msgSession',
    resave:false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//!Global Variables
app.use((req,res,next)=>{
    app.locals.error=req.flash('error');
    next();
});

//!Routes
app.use(require('./routes'));

//!Public
app.use(express.static(path.join(__dirname, 'public')));

//!Starting listen
app.listen(app.get('port'),()=>{
    console.log('Server on Port',app.get('port'))
});