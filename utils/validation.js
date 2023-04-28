/**
 * fichier de traitement des fonctions et autres
 * 
 */

/**
 * IMPORT ******************************
 * *************************************
 */

import {check} from 'express-validator';

export const signValidator = [
    check('name', 'Votre nom est obligatoire').not().isEmpty(),
    check('password', 'Votre mot de passe').isLength({min: 5}),
    check('email',  'Entrz un email valide').isEmail().normalizeEmail(),

]
