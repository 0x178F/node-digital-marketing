import settings_model from '../models/settings.model.js'

const getSettings = async (req, res, next) => {
    try {
        const settings = await settings_model.findOne()
        res.locals.settings = settings
        next()
    } catch (error) {
        next()
    }

}

export default getSettings