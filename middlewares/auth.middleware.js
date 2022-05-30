import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const jwtDecode = async (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)._id
}
export const authenticate = async (req, res, next) => {
    const allow = ['/', '/login', '/register']
    if (!allow.includes(req.path) || req.cookies.token) {
        if (!req.cookies.token) return res.redirect('/login')
        try {
            const token = req.cookies.token
            const decoded = await jwtDecode(token)
            const findUser = await User.findOne({_id: decoded})
            if (findUser) {
                if(req.path.split('/')[1] === 'admin' && findUser.role !== 'admin') {
                    return res.status(401).redirect('/')
                }
                res.locals.user = findUser
            } else {
                res.clearCookie('token')
                return res.status(401).json({
                    error: 'Unauthorized.'
                })
            }
        } catch (error) {
            return res.status(400).send('Invalid token!')
        }
    }
    next()
}
