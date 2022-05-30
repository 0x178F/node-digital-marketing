import account_model from '../models/account.model.js'

const index = async (req, res) => {
    try {
        const categories = await account_model.aggregate([
            {
                $match: {
                    user_id: {$in: [null, '']},
                },
            },
            {
                $group: {
                    _id: '$category_id',
                    count: { $sum: 1 },
                    price: {
                        $min: "$price" // get minimum price by category..
                    }
                },  // group by category_id
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            { $arrayElemAt: [ "$category", 0 ] },
                            { count: "$count" },
                            { price: "$price" }
                        ]
                    }
                }
            },
            {
                $sort: {
                    'createdAt': 1,
                }
            },
        ])
        res.render('pages/index', {categories})
    } catch (error) {}
}

export {index}
