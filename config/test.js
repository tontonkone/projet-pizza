User.findOne({ email: email })
    .then(user => {

        if (user) {
            let match = bcrypt.compare(password, user.password)
            if (match) {

                console.log(user.is_admin)
                if (user.is_admin === 1) {
                    req.session.is_admin = user.is_admin;
                    req.session.user_id = user._id
                    res.redirect('/admin/home')
                } else {
                    req.session.user_id = user._id
                    req.session.user_new = true
                    res.redirect('/home')
                }
            }
        } else {
            res.render('login', { msg: 'not found' })
        }
    })