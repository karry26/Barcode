var express = require("express")
var path = require("path")
var app = express()
var session = require("express-session");
var bodyparser = require("body-parser");
var multer = require("multer");

var {
    db
} = require("./config/database")
var usersCol = require("./models/users")
app.set('view engine', 'ejs');
const SESS_name = "sid";
app.use(session({
    name: SESS_name,
    resave: false,
    saveUninitialized: false,
    secret: "shhshh",
    cookie: {}
}));
app.use(express.static("public"))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({
    storage: storage
});

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
app.use(bodyparser.urlencoded({
    "extended": true
}));


app.use((req, res, next) => {
    const {
        userid
    } = req.session
    if (userid) {
        async function set(req, res) {
            await usersCol.findOne({
                    email: userid
                })
                .then(function (result) {

                    if (result) {
                        res.locals.user = result;

                    }


                })
                .catch(function (msg) {
                    res.send({
                        err: msg
                    });
                });
            next();
        }
        set(req, res);

    } else
        next();

})
app.get('/', (req, res) => {
    const {
        userid
    } = req.session;
    var bool = "false";
    if (userid) bool = "true";
    res.render("index1", {
        bool: bool
    })

})
app.get('/home', redirectLogin, (req, res) => {
    const {
        user
    } = res.locals;
    res.render("home", {
        user: res.locals.user
    });

})



app.get('/login', redirectHome, (req, res) => {
  
    res.render("login", {
        error: ""
    })
})

app.get('/register', redirectHome, (req, res) => {
    res.render("register", {
        error: ""
    })
})

app.get('/profile', redirectLogin, (req, res) => {
    res.render("profile", {
        user: res.locals.user
    });
})
app.post("/profile", redirectLogin, upload.single('pic'), (req, res) => {
    if (req.file) {
        req.body.pic = req.file.filename;
    } else {
        req.body.pic = req.body.hdn;
    }
    usersCol.findOneAndUpdate({
        email: req.body.email
    }, {
        $set: {
            mobile: req.body.mobile,

            pic: req.body.pic,
            occupation: req.body.occupation,
            address: req.body.address,
            dob: req.body.dob,
            city: req.body.city
        }
    }, {
        new: true
    }).then((docs) => {
        if (docs) {

            res.redirect("profile");
        } else {
            res.send("Error Occured");
        }
    })

})

app.post('/login', redirectHome, (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (email && password) {
        usersCol.findOne({
                email: email
            })
            .then(function (result) {

                if (result) {
                    req.session.userid = email;
                    res.redirect('/home')
                } else
                    return res.redirect('/login');

            })
            .catch(function (msg) {
                console.log(msg)
            });

    } else
        res.render('login', {
            error: "Please Fill Details Properly"
        });

})
app.post('/register', redirectHome, (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if (name && email && password) {
        usersCol.findOne({
                email: email
            })
            .then((data) => {
                if (data) {
                    console.log("user exist")
                    return res.render("register", {
                        error: "USER ALREADY EXISTS"
                    });
                }
                req.body.pic = "book.png";
                var collection = new usersCol(req.body);

             
               
                collection.save(function (err, doc) {
                    if (err)
                        console.log(err)
                  
                    req.session.userid = email;
                    res.redirect('/home')


                });



            })
    } else
        res.render("register", {
            error: "Please Fill Details Properly"
        })

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

app.get("/scan", redirectLogin, function (req, res) {
    var filePath = path.join(__dirname, "public", "scan.html");
    res.sendFile(filePath);
})
var scrapper = require("./cheerio.js")
app.use("/cheerio.js", scrapper.app)
app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found-invalid url");
});
app.listen(8081, function () {
    console.log("server started at 8081")

});