import bankMethods_model from '../../models/bankMethods.model.js'

export const methodsIndex = async (req, res) => {
    const bankMethods = await bankMethods_model.find({}).sort({createdAt: -1})
    res.render('admin/pages/payment-methods', {bankMethods})
}

export const addBank = async (req, res) => {
    if(req.file) req.body.image = req.file.path
    if (req.body.status !== undefined) req.body.status = 1
    else req.body.status = 0
    await bankMethods_model.create({...req.body})
    res.redirect(req.get('Referrer'))
}

export const getBank = async (req, res) => {
    const id = req.params.id
    const bank = await bankMethods_model.findOne({_id: id})
    res.render('admin/pages/bank', {bank})
}
export const deleteBank = async (req, res) => {
    const id = req.params.id
    const bank = await bankMethods_model.deleteOne({_id: id})
    res.redirect(req.get('Referrer'))
}

export const updateBank = async (req, res) => {
    if (req.body.status !== undefined) req.body.status = 1
    else req.body.status = 0

    if(req.file) req.body.image = req.file.path

    const id = req.params.id
    await bankMethods_model.updateOne({_id: id}, {...req.body})
    res.redirect('/admin/payments/methods')
}
