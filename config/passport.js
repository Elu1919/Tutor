const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')

const { User, Admin } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

let isAdmin = 0

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  // authenticate user
  (req, email, password, cb) => {

    if (req.params.admin === 'admin') {
      isAdmin = 1
      Admin.findOne({ where: { email } })
        .then(admin => {
          if (!admin) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          bcrypt.compare(password, admin.password).then(res => {
            if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            return cb(null, admin)
          })
        })
    } else {
      isAdmin = 0
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
          bcrypt.compare(password, user.password).then(res => {
            if (!res) return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'))
            return cb(null, user)
          })
        })
    }
  }
))

// passportJWT
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
  User.findByPk(jwtPayload.id, {

  })
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

// serialize and deserialize user
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  if (isAdmin <= 0) {
    User.findByPk(id).then(user => {
      user = user.toJSON()
      return cb(null, user)
    })
  } else {
    Admin.findByPk(id).then(admin => {
      admin = admin.toJSON()
      return cb(null, admin)
    })
  }
})

// Google Login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json

      User.findByPk(email, { raw: true })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  )
)

module.exports = passport