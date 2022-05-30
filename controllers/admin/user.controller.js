import user_model from '../../models/user.model.js'

export const index = async (req, res) => {
        const users = await user_model.find({}, null, {sort: {createdAt: -1}})
        res.render('admin/pages/users', {users})
}

export const specificUser = async (req, res) => {
        const userId = req.params.uid
        const user = await user_model.findOne({_id: userId}).catch(() => {
            return res.redirect('/admin/users')
        })
        
        res.render('admin/pages/specificUser', {user})

}

export const update = async (req, res) => {
    try {
        const userId = req.params.uid
        if (req.body.password == '******') delete req.body.password
        const {firstname, lastname, username, email, phone, password, balance, role} = req.body
        await user_model.updateOne({_id: userId}, {firstname, lastname, username, email, phone, password, balance, role})

        res.redirect(req.get('referer'))
    } catch (error) {
        console.log(error);
    }
}
