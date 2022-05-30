import settings_model from '../../models/settings.model.js'

export const index = async (req, res) => {
    const settings = await settings_model.findOne({})
    res.render('admin/pages/settings', {settings})
}

export const update = async (req, res) => {
    if(req.file) req.body.image = req.file.path
    else req.body.image = res.locals.settings.settings.image

    const settings = await settings_model.updateMany({}, {settings: {...req.body}}, {upsert: true})
    res.redirect(req.get('Referrer'))
}