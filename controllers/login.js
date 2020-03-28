
exports.getLogin = (req, res, next) => {
    res.render('login');
}

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    if (req.body.username == 'capo' && req.body.pass == 'capo') {
        req.session.isLogged = true;
        res.redirect('/index');
    }
    else if (req.body.username == 'admin' && req.body.pass == 'admin123') {
        req.session.isLogged = true;
        req.session.isAdmin = true;
        res.redirect('/index');
    }
    else {
        res.redirect('/login');
    }
}

exports.index = (req, res, next) => {

    if (req.session.isLogged == true && req.session.isAdmin == true) {
        res.render('index', { isAdmin: true });
    } else if (req.session.isLogged == true) {
        res.render('index', { isAdmin: false });
    } else {
        res.render('login');
    }

}