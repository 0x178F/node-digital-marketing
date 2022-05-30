import account_model from '../models/account.model.js'
import category_model from '../models/category.model.js'
import mongoose from 'mongoose'

export const index = async (req, res) => {
    const userInfo = res.locals.user
    const categories = await category_model.find() //For download options.
    const myAccounts = await account_model.find({user_id: userInfo._id})
        .populate({path: 'category_id', model: category_model})
        .sort({$natural: -1})
    res.render('pages/myAccounts', {accounts: myAccounts, categories})
}

export const downloadHandler = async (req, res) => {
    try {
        const date = req.query.date
        const categoryId = req.params.cid
        const userInfo = res.locals.user
        const startDay = new Date(date)
        startDay.setUTCHours(0, 0, 0, 0)

        const endDay = new Date(date)
        endDay.setUTCHours(23, 59, 59, 999)

        if (!mongoose.Types.ObjectId.isValid(categoryId)) return res.status(400)
        const downloadItems = await account_model.find({
            user_id: userInfo._id,
            updatedAt: {$gte: startDay, $lte: endDay},
            category_id: categoryId,
        })

        let data = ''
        downloadItems.forEach((element) => {
            data += `${element.mail}:${element.password}`
        })

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Disposition': 'attachment; filename=accounts.txt',
        })

        const download = Buffer.from(data)
        res.end(download)
    } catch (error) {}
}
