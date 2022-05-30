import payment_model from '../../models/payment.model.js'
import user_model from '../../models/user.model.js'

export const index = async (req, res) => {
    const payments = await payment_model.find({}, null, {sort: {date: -1}}).populate({path: 'user_id', model: user_model})
    res.render('admin/pages/payments', {payments})
}

export const deletePayment = async (req, res) => {
    const {_delete} = req.body
    await payment_model.deleteOne({_id: _delete})
    req.message(res, {success: "The payment has been successfully deleted."})
    res.redirect('/admin/payments')
}
export const updatePayment = async (req, res) => {
    const {id, status} = req.body
    
    const paymentInfo = await payment_model.findOneAndUpdate({_id: id}, {status: status})

    const user = await user_model.findOne({_id: paymentInfo.user_id})
    let balance = parseFloat(user.balance)
    let amount = parseFloat(req.body.amount)

    if(paymentInfo.status == '0' && status == '1') 
    {
        balance += amount
    }
    else if(paymentInfo.status == '1' && status == '2') 
    {
        balance -= amount
    }
    else if(paymentInfo.status == '2' && status == '1') 
    {
        balance += amount
    }

    await user_model.updateOne({_id: paymentInfo.user_id}, {balance})
    res.redirect('/admin/payments')
}

