import express from 'express'
import userRoutes from './routes/user.routes.js'
import adminRoutes from './routes/admin.routes.js'
import cookieParser from 'cookie-parser'
import flashMessage from './helper/flashMessage.js'
import {authenticate} from './middlewares/auth.middleware.js'
import connectMongo from './models/connect.js'
import getSettings from './middlewares/settings.middleware.js'

const app = express()

//Database Connect
connectMongo.then(() => {
app.listen(process.env.PORT || 3000)
console.log("Server is up!");
}).catch((err) => {throw Error(err)})


//Css,js,img etc. set folder.
app.set('view engine', 'ejs');
app.use(express.static('public'))


//Middleware
app.use(cookieParser())
app.use(express.urlencoded({
    extended: false
}));
app.use(authenticate, flashMessage, getSettings)
app.use(userRoutes)
app.use('/admin', adminRoutes)
