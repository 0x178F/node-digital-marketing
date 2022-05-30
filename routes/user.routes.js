import express from 'express'
import * as loginController from '../controllers/login.controller.js'
import * as indexController from '../controllers/index.controller.js'
import * as categoryController from '../controllers/category.controller.js'
import * as buyController from '../controllers/buy.controller.js'
import * as myAccounts from '../controllers/myaccounts.controller.js'
import * as paymentController from '../controllers/payment.controller.js'
import * as userProfile from '../controllers/userprofile.controller.js'

const route = express.Router()
route.get('/', indexController.index)
route.get('/profile', userProfile.index)
route.post('/profile/update', userProfile.update)
route.get('/MyAccounts', myAccounts.index)
route.get('/category/:slug', categoryController.index)
route.get('/payments', paymentController.index)
route.post('/payments/pay/:type', paymentController.pay)

route.get('/login', loginController.loginIndex)
route.post('/login', loginController.loginHandler)
route.get('/register', loginController.registerIndex)
route.post('/register', loginController.registerHandler)
route.get('/logout', loginController.logout)

//download account
route.get('/dl/:cid', myAccounts.downloadHandler)

//buy
route.post('/account/buy', buyController.single)
route.post('/account/buy/:count', buyController.bulk)
route.get('/account/check/:count', buyController.checkStock)

export default route
