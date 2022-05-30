import user_model from '../models/user.model.js'
export const index = (req, res) => {
    res.render('pages/userprofile')
}

export const update = async (req, res) => {
    try {
        const userInfo = res.locals.user

        if (req.body.password == '******') delete req.body.password

        const {firstname, lastname, email, phone, password} = req.body

        await user_model.updateOne({_id: userInfo._id}, {firstname, lastname, email, phone, password})

        res.redirect('/profile')

    } catch (error) {}
}
