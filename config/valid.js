export const secret = 'jenessmsjenaamdjdjdjmdmssùddlld'

/* const protectRouteWithApiKey = (req, res, next) => {
    const auth = req.headers['x-apikey']
    if (auth && auth === '<YOUR API KEY>') return next()
    return next(new Error('403 | Authorization is missing or value is wrong'))
} */
export const verifRoute = async (req, res,next)=>{
    if(req.session.is_admin){
        res.redirect('/admin/home')
    }
    next()
}