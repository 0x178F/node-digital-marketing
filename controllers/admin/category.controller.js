import category_model from '../../models/category.model.js'
export const addCategory = async (req, res) => {
    const {title, description, slug} = req.body
    const status = req.body.status == 'on' ? true : false
    const image = req.file ? req.file.path : null

    try {
        await category_model.create({title, description, slug, image, status})
        req.message(res, {
            success: "The category has been successfully added."
        })
        res.redirect('/admin/categories')

    } catch (error) {
        req.message(res, {
            error: error._message
        })
        res.redirect('/admin/categories')
    }
}

export const getCategory = async (req, res) => {
    try {
        const categories = await category_model.find({}).sort({createdAt: -1})
        const categories2 = ""
        res.render('admin/pages/category', {categories})
    } catch (error) {
        req.message(req, {error: error._message})
        res.redirect('admin/pages/category')
    }
}

export const updateStatus = async (req, res) => {
    try {
        const _id = req.body.updateStatus.split("|")[0]
        let status = req.body.updateStatus.split("|")[1]
        status = JSON.parse(status); //convert boolean
        status = !status
        await category_model.findOneAndUpdate({_id}, {status: status})
        req.message(res, {
            success: "Category status updated successfully."
        })
        res.redirect('/admin/categories')
    } catch (error) {
        req.message(res, {
            error: error
        })
        res.redirect('/admin/categories')
    }
}

export const deleteCategory = async (req, res) => {
try {
    const _id = req.body.delete
    await category_model.deleteOne({_id})
    req.message(res, {
        success: "The category has been successfully deleted."
    })
    res.redirect('/admin/categories')
} catch (error) {
    console.log(error);
    req.message(res, {
        error: error
    })
    res.redirect('/admin/categories')
}
}