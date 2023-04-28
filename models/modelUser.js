
import '../config/dbconnect';

class UserModel{






    static async getUsers(){

        return new Promise((resolve)=>{

            conn$.query(`
            SELECT * FROM user
            `,[],(error, result)=>{

                if (!error){
                    resolve(result)
                }
            })
        })
    }
}