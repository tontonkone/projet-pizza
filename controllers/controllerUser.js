
import {validationResult} from 'express-validator';

export const register =  (req,res)=>{
    
    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(400).json({err: err.array()})
    }
}
