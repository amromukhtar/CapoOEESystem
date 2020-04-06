const User = require('../Models/User');
// const bcrypt = require('bcrypt');
const crypt = require('../util/encrypt');

exports.getLogin = (req, res, next) => {
    res.render('login');
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = crypt.encrypt(req.body.password);
    User.findOne({ name: username, password: password })
        .then((user) => {
            if (!user) {
                return res.redirect('/');
            } else {
                req.session.isLoggedIn = true;
                req.session.user = user.name;
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
        username: req.session.user,
    });
}