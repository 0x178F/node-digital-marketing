import express from "express";
import * as indexController from '../controllers/admin/index.controller.js';
import * as categoryController from '../controllers/admin/category.controller.js'
import * as accountController from '../controllers/admin/account.controller.js'
import * as multer from '../middlewares/multer.middleware.js'
import * as paymentController from '../controllers/admin/payment.controller.js'
import * as userController from '../controllers/admin/user.controller.js'
import * as settingsController from '../controllers/admin/settings.controller.js'
import * as paymentMethods from '../controllers/admin/paymentMethods.controller.js'


const route = express.Router()

route.get('/', indexController.index)
route.get('/categories', categoryController.getCategory)
route.post('/categories', multer.fileUpload, categoryController.addCategory)
route.post('/categories/updateStatus', categoryController.updateStatus)
route.post('/categories/delete', categoryController.deleteCategory)
route.get('/accounts', accountController.getAccounts)
route.get('/accounts/add', accountController.addAccountIndex)
route.post('/accounts/add', accountController.addAccount)


route.post('/payments/delete', paymentController.deletePayment)
route.post('/payments/update', paymentController.updatePayment)
route.get('/payments', paymentController.index)

route.get('/payments/methods', paymentMethods.methodsIndex)
route.post('/payments/bank', multer.fileUpload, paymentMethods.addBank)
route.get('/payments/bank/:id', paymentMethods.getBank)
route.post('/payments/bank/:id/update', multer.fileUpload, paymentMethods.updateBank)
route.post('/payments/bank/:id/delete', paymentMethods.deleteBank)
            

route.get('/users', userController.index)
route.get('/users/:uid', userController.specificUser)
route.post('/users/:uid/update', userController.update)

route.get('/settings', settingsController.index)
route.post('/settings/update', multer.fileUpload, settingsController.update)


export default route