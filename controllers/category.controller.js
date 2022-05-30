import category_model from '../models/category.model.js';
import account_model from '../models/account.model.js';

export const index = async (req,res) => {
    try {
        const slug = req.params.slug
        const categories = await category_model.findOne({slug: slug})
        const accounts = await account_model.find({category_id: categories._id, user_id : { $in : [null]}})
        res.render('pages/category', {categories, accounts})
    } catch (error) {
    }
}


