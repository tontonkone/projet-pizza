/**
 * IMPORT
 */

import { User } from '../models/modelUser.js'



export const listOfUser = async (req,res)=>{

    try {


        res.render('admin/usersList')
        
    } catch (error) {
        console.log(error)
    }
}
export const loginLoadAd =  async (req, res)=>{

    try {
        const userInfo = await User.findById({ _id: req.session.user_id })
        res.render('admin/home', { user: userInfo })
    } catch (error) {
        console.log()

    }
}


export const verifLogAd = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
    }

}