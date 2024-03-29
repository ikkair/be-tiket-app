const passport = require('passport')
const router = require('express').Router()
const authHelper = require("../helper/auth")

const CLIENT_URL = `https://buroq.vercel.app`

router.get('/login/success', (req, res) => {
  console.log(data)

  if (req.user) {
    const { id, displayName, photo, email } = req.user.profile
    const token = authHelper.generateToken({
      id : id,
      name : displayName,
      photo: photo,
      email: email,
      role: 'user'
    })

    res.status(200).json({
      success: true,
      message: 'success',
      token,
      data: req.user,
    })
  }else {
    res.status(401).json({
      success: false,
      message: 'Unauthenticate!',
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  })
})

router.get(`/logout`, (req, res) => {
  req.logout()
  res.redirect()
})

router.get(`/google`, passport.authenticate('google', { scope: ['profile'] }))

router.get(`/google/callback`,
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
  }
))

module.exports = router