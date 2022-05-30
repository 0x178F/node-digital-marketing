const flashMessage = (req,res,next)=>{
    req.message = _message
    if(!req.cookies.message) return next()
    res.locals.message = req.cookies.message
    res.clearCookie('message')
    next()
}

function _message(res, msg, status) {
    res.cookie('message', msg)
    if(status) res.status(status)
}

export default flashMessage