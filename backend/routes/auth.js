const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');

const JWT_SECRET = "MOSfetNIKisGooD";

//Creating a User using : POST "/api/auth/"  auth does't require

//Validate the name , email and password-- 

router.post('/createUser', [
    body('name')
        .isLength({ min: 3 }),

    body('email', "Enter the valid email")
        .isEmail(),

    body('password')
        .isLength({ min: 6 }),
],

    //if there are error the ruturn (bad request) error

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //making hashing function

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // creating a valid User  
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {

            user: {
                id: User.id
            }
        }


        // Creating a authentation token for user
        const authToken = jwt.encode(JWT_SECRET, data);
        res.json({ authToken })
    })

//Authanitation a user using post request

router.post('/login', [

    body('email', "Enter the valid email")
        .isEmail(),

    body('password', "Plese Enter correct password")
        .isLength({ min: 6 }),
],

    //if there are error the ruturn (bad request) error

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }



        let { email, password } = req.body;
 
        try {
            let user =  User.findOne({ email });
            if (!user) {

                return res.status(400).json({ error: "Plese Enter Correct email and password" });
            }

            const passwordCompare =  bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Plese Enter Correct email and password" });
            }

            const data = {

                user: {
                    id: User.id
                }
            }

            const authToken = jwt.encode(JWT_SECRET, data);
            res.json({ authToken })

        } catch (error) {

            console.error(error.massage);
            res.send(500).send("Internal server error");


        }




    })







module.exports = router