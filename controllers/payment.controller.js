import payment_model from '../models/payment.model.js'
import bankmethods_model from '../models/bankMethods.model.js'

export const index = async (req, res) => {
    const user = res.locals.user
    const payments = await payment_model.find({user_id: user._id}).sort({date: -1})
    const bankMethods = await bankmethods_model.find({status: 1}).sort({createdAt: -1})
    res.render('pages/payments', {payments, bankMethods})
}

export const generateCode = async(req, res) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
}

export const pay = async (req, res) => {
    if(req.params)
    {
        if(req.params.type) {
            const amount = parseFloat(req.body.amount)

            const minAmount = res.locals.settings.settings.paymentLimit
            if(isNaN(amount) || amount < minAmount) return res.status(400).json({error: `Minimum amount is ${minAmount}₺`})
            
            const user = res.locals.user
            const now = new Date()
            const fiveminAgo = new Date(now.getTime() - 5 * 60 * 1000)

            const prevPay = await payment_model.find({user_id: user._id, date: {$gte: fiveminAgo, $lte: now}})
            if(prevPay.length >= 1) return res.status(400).json({error: 'There is currently an active payment notification. Try again in 5 minutes.'})

            await payment_model.create({user_id: user._id, type: req.params.type, amount: amount})
            return res.json({success: 'Your payment notification has been sent!'})
        }
    }
    return res.status(400).json({error: 'payment error'})
}
