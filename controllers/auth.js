const bcrypt = require('bcryptjs');
const User = require('../models/user');

const crypto = require('crypto');

exports.getLogin = (req, res) => {
	res.render('auth/login', { errorMessage: req.flash('error'), passMessage: req.flash('pass') });
};

exports.getSignUp = (req, res) => {
	// const isLoggedIn=(req.get("Cookie").split(";")[1].trim().split("=")[1])

	res.render('auth/sign-up', {
		oldInput: {
			email: '',
			password: ''
		},
		errorMessage:req.flash('userError')

	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				req.flash('error', 'Invalid email or password');
				console.log('User not found');
				return res.redirect('/login');
			}

			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						console.log('user logged in');
						req.session.isAuthenticated = true;
						req.session.user = user;

						// console.log(req.session.user)
						// req.session.user._id=user._id


						console.log("entering")
						req.session.save((err) => {
							console.log("Saving session to database")
							
							return res.redirect('/secret');
						});
					} else {
						req.flash('pass', 'incorrect password');
						console.log('incorrect password');
						res.redirect('back');
					}
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.logOut = (req, res, next) => {
	if (req.user) {
		req.logout();
		return res.redirect('/');
	}

	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postSignUp = (req, res, next) => {
	let password = req.body.password;
	let email = req.body.email;
	let username = req.body.username;


	User.findOne({ email: email })
		.then((user) => {
			if (user) {
				req.flash('userError','User already exists')
				console.log('user already exist');
				return res.redirect('/login');
			}

			bcrypt
				.hash(password, 12)
				.then((pass) => {
					const newUser = new User({
						password: pass,
						email: email,
						username:username
					});
					newUser
						.save()
						.then((user) => {
							console.log('new user registered');

							req.session.isAuthenticated = true;
						req.session.user = user;

						// console.log(req.session.user)
						// req.session.user._id=user._id


						console.log("entering")
						req.session.save((err) => {
							console.log("Saving session to database")
							
							return res.redirect('/secret');
						});
						})
						.catch((err) => {
							console.log(err);
							console.log('user not registered');
						});
				})
				.catch((err) => {
					console.log(err);
					console.log('password not hashed');
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
