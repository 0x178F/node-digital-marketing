import user_model from '../models/user.model.js'
import account_model from '../models/account.model.js'
import {conn} from '../models/connect.js'
import mongoose from 'mongoose'

export const single = async (req, res) => {
    try {
        const userInfo = res.locals.user
        const accountId = req.body.id
        const user = await user_model.findById(userInfo._id)
        const item = await account_model.find({_id: accountId, user_id: {$exists: false}})

        if (item.length == 0 || isNaN(user.balance) || !item[0].price) return res.json({error: 'Error'})
        else if (user.balance < item[0].price) return res.json({error: 'Insufficient balance.'})

        const session = await conn.startSession()
        try {
            session.startTransaction()
            await user_model.updateOne(
                {_id: userInfo._id},
                {balance: parseFloat(user.balance - item[0].price)},
                {session}
            )
            await account_model.updateOne({_id: accountId}, {user_id: user}, {session})
            await session.commitTransaction()
            res.json({success: 'Your purchase is complete!'})
        } catch (error) {
            console.log(error)
            await session.abortTransaction()
        }
        session.endSession()
    } catch (error) {
        console.log(error)
        res.status(400).json({error: 'purchase error'})
    }
}

export const bulk = async (req, res) => {
    const userInfo = res.locals.user
    const user = await user_model.findById(userInfo._id)
    let {id, count} = req.body
    count = parseInt(count)

    if (isNaN(user.balance) || isNaN(count)) return res.json({error: 'Error'})

    const sumData = await sumPrice(id, count)
    const stockCount = sumData[0].count
    const totalPrice = sumData[0].totalPrice

    if (stockCount != count) return res.json({error: 'Insufficient stock'})
    else if (user.balance < totalPrice) return res.json({error: 'Insufficient balance.'})

    const session = await conn.startSession()

    try {
        session.startTransaction()

        await user_model.updateOne({_id: userInfo._id}, {balance: parseFloat(user.balance - totalPrice)}, {session})
        const accounts = await account_model.find({category_id: id, user_id: {$in: [null]}}, null, {session})
            .limit(count)
            .sort({createdAt: -1})
        await account_model.updateMany({_id: {$in: accounts}}, {user_id: userInfo._id}, {session})
        await session.commitTransaction()
        res.json({success: 'Your purchase is complete!'})
    } catch (error) {
        console.log('error')
        await session.abortTransaction()
    }
    session.endSession()
}

async function sumPrice(id, count) {
    try {
        return await account_model.aggregate([
            {
                $match: {
                    category_id: mongoose.Types.ObjectId(id),
                    user_id: {
                        $in: [null, ''],
                    },
                },
            },
            {$limit: count},
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: '$price',
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ])
    } catch (error) {}
}

export const checkStock = async (req, res) => {
    const {id} = req.query
    let {count} = req.params
    count = parseInt(count)
    
    if (isNaN(count)) return res.status(400).json({error: 'Error'})

    const sumData = await sumPrice(id, count)

    if (sumData === undefined || sumData.length == 0) return res.status(400).json({error: 'Error'})

    const stockCount = sumData[0].count
    const totalPrice = sumData[0].totalPrice

    if (stockCount != count) return res.json({error: 'Insufficient stock'})
    res.json({totalPrice, count})
}



