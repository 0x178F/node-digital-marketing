import category_model from '../../models/category.model.js'
import account_model from '../../models/account.model.js'
import user_model from '../../models/user.model.js'

export const getAccounts = async (req, res) => {
    const accounts = await account_model.find({})
        .sort({
            createdAt: -1,
        })
        .populate({
            path: 'category_id',
            model: category_model,
        })
        .populate({
            path: 'user_id',
            model: user_model,
        })
    res.render('admin/pages/accounts', {
        accounts,
    })
}

export const addAccountIndex = async (req, res) => {
    const categories = await category_model.find({})
    res.render('admin/pages/addAccount', {
        categories,
    })
}

export const addAccount = async (req, res) => {
    try {
        const {category_id, account_date, price, extra_info} = req.body

        const mobile_confirmation = req.body.mobile_confirmation == 'on' ? true : false
        const data = []
        const accounts = req.body.accounts.split('\n')

        accounts.map(function (account) {
            if (account.split(':').length != 2) throw new Error('Account Syntax Error')

            data.push({
                category_id,
                price,
                extra_info,
                mobile_confirmation,
                account_date,
                mail: account.split(':')[0],
                password: account.split(':')[1],
            })
        })

        await account_model.insertMany(data)
        req.message(res, {success: 'The Account has been successfully added.',})
        res.redirect('/admin/accounts/add')
    } catch (error) {
        req.message(res, {error: error.message,})
        res.redirect('/admin/accounts/add')
    }
}
