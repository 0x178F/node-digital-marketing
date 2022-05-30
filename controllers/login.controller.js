import user_model from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginIndex = (req, res) => {
  res.render('pages/login')
}
export const registerIndex = (req, res) => {
  res.render('pages/register')
}

export const registerHandler = async (req, res) => {
  const { firstname, lastname, username, email, phone, password } = req.body
  try {
    await user_model.create({ firstname, lastname, username, email, phone, password })
    req.message(res, {
      success: 'Your registration has been successfully done.'
    })
    res.redirect('/')
  } catch (error) {
    console.log(error)
    req.message(res, { error: 'Your registration failed.' }, 400)
  }
}

export const loginHandler = async (req, res) => {
  const { username, password } = req.body
  try {
    const findUser = await user_model.findOne({ username })
    if (findUser) {
      bcrypt.compare(password, findUser.password, function(err, result) {
        if (result) { 
          const token = jwt.sign({ _id: findUser._id },process.env.SECRET_KEY,{ expiresIn: '24h' })
          res.cookie('token', token, {maxAge: 1440 * 60 * 1000,htpOnly: true})
          return res.json({ success: 'You have successfully logged in.' })
        } else {
          return res.status(401).json({ error: 'Your password is wrong.' })
        }
      })
    } else {
      return res.status(401).json({ error: 'User not found.' })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Login is failed.' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
}