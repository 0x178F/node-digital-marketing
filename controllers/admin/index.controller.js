import account_model from '../../models/account.model.js'
import user_model from '../../models/user.model.js'
import payment_model from '../../models/payment.model.js'

export const index = async (req, res) => {
    const dayStart = new Date(new Date().setHours(0, 0, 0, 0))
    const dayEnd = new Date(new Date().setHours(23, 59, 59, 999))

    const saleCount = await account_model.aggregate([
        {
            $match: {
                updatedAt: {
                    $gte: dayStart,
                    $lt: dayEnd,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1,
                },
            },
        },
    ])

    const monthStart = new Date(new Date().setDate(1))
    const monthEnd = new Date(new Date().setDate(new Date().getDate()))

    const revenue = await account_model.aggregate([
        {
            $match: {
                updatedAt: {
                    $gte: monthStart,
                    $lt: monthEnd,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: '$price',
                },
            },
        },
    ])
    const yearStart = new Date(new Date().getFullYear(), 0, 1)
    const yearEnd = new Date(new Date().getFullYear(), 11, 31)

    const userCount = await user_model.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: yearStart,
                    $lt: yearEnd,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: 1,
                },
            },
        },
    ])

    const lastPayments = await payment_model.aggregate([
        {
            $match: {
                date: {
                    $gte: dayStart,
                    $lt: dayEnd,
                },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $limit: 25,
        },
        {
            $sort: {
                date: -1,
            },
        },
    ])

    res.render('admin/pages/index', {
        saleCount: saleCount[0] ? saleCount[0].total : 0,
        userCount: userCount[0] ? userCount[0].total : 0,
        revenue: revenue[0] ? revenue[0].total : 0,
        payments: lastPayments
    })
}
