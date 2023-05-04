
export const isLogin = async (req,res,next)=>{

    try {
        if(req.session.user_id){

            if(req.session.is_admin){ res.render('admin/home')}
            
        }else{
             res.redirect('/')
        }
        next()
        
    } catch (error) {
        console.log(error) 
    }

}
export const isLogOut = async (req, res, next) => {

    try {
        if (req.session.user_id) {
            res.redirect('/home')
        }

        next()

    } catch (error) {
        console.log(error)
    }

}

export const isLoginAd = async (req,res,next)=>{

    try {
        if (!req.session.is_admin){
            res.redirect('/')
        }

        next()

    } catch (error) {
        console.log(error)
    }

}

export const isLogOutAd = async(req, res, next)=>{

    

}
