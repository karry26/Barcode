var express=require("express")
var path=require("path")
var app=express()
var session = require("express-session");
var bodyparser= require("body-parser");
app.set('view engine', 'ejs'); 
const SESS_name = "sid";
app.use(session({
    name: SESS_name,
    resave: false,
    saveUninitialized: false,
    secret: "shhshh",
    cookie: {}
}));
var users = [{
        id: 1,
        name: 'Kairav',
        email: 'kairavbansal@gmail.com',
        password: 'secret'
    },
    {
        id: 2,
        name: 'Khyati',
        email: 'khyati@gmail.com',
        password: 'secret'
    },
    {
        id: 3,
        name: 'Arshita',
        email: 'arshita@gmail.com',
        password: 'secret'
    }
]

const redirectLogin = (req, res, next) => {
    if (!req.session.userid) {
        res.redirect('/login')
    } else {
        next();
    }
}
const redirectHome = (req, res, next) => {
    if (req.session.userid) {
        res.redirect('/home')
    } else {
        next();
    }
}
app.use(bodyparser.urlencoded({"extended":true}));

app.use(express.static("public"))
app.use((req, res, next) => {
    const {
        userid
    } = req.session
    if (userid) {
        res.locals.user = users.find(
            user => user.id === userid
        )
    }
    next();
})
app.get('/', (req, res) => {
    const {
        userid
    } = req.session;
    var bool="false";
    if(userid) bool="true";
    res.render("index1",{bool:bool})
  
})
app.get('/home', redirectLogin, (req, res) => {
    const {
        user
    } = res.locals;
    var filePath=path.join(__dirname,"public","home.html");
    res.render("home",{user:res.locals.user});
   
})



app.get('/login', redirectHome, (req, res) => {
    res.render("login")
})

app.get('/register', redirectHome, (req, res) => {
    res.render("register")
})

app.get('/profile',(req,res)=>{
    res.render("profile");
})

app.post('/login', redirectHome, (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (email && password) {
        const user = users.find(user => user.email === email && user.password === password)
        if (user) {
            req.session.userid = user.id;
            return res.redirect('/home')
        }
    }
    res.redirect('/login');

})
app.post('/register', redirectHome, (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    if (name && email && password) {
        const exists = users.some(
            user => user.email === email
        )
        if (!exists) {
            const user = {
                id: users.length + 1,
                name,
                email,
                password
            }
            users.push(user);
            req.session.userid = user.id

            return res.redirect('/home');
        }
    }

    res.redirect('/register');

})
app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }
        res.clearCookie(SESS_name);
        res.redirect('/');
    })

})

app.get("/scan",redirectLogin,function(req,res)
{
    var filePath=path.join(__dirname,"public","scan.html");
    res.sendFile(filePath);
})
var scrapper=require("./cheerio.js")
app.use("/cheerio.js",scrapper.app)
app.use((req,res,next)=>{
    res.status(404).send("<h1>Page not found-invalid url");
});
app.listen(8082,function(){
    console.log("server started at 8081")

});
