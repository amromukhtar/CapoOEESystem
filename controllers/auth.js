const User = require('../Models/User');

const crypt = require('../util/encrypt');

exports.getLogin = (req, res, next) => {
    console.log('Hello')
    res.render('login', {
        error: false
    });
}

exports.postLogin = (req, res, next) => {
    const user = req.body.username;
    const password = crypt.encrypt(req.body.password);
    User.findOne({ user: user, password: password })
        .then((user) => {
            if (!user) {
                return res.render('login', {
                    error: true
                });
            } else {
                req.session.isLoggedIn = true;
                req.session.user = user.user;
                req.session.name = user.name;
                req.session.authority = user.authority;
                req.session.save((result) => {
                    res.redirect('/index');
                })
            }
            // bcrypt.compare(password, user.password)
            //     .then((doMatch) => {
            //         if (doMatch) {
            //             
            //         } else {
            //             res.redirect('/');
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

exports.index = (req, res, next) => {
    res.render('index', {
        isLoggedIn: req.session.isLoggedIn,
        authority: req.session.authority,
        username: req.session.name,
    });
}