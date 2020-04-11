const express = require('express');
const router = express.Router();
const auth = require('../../middleware/authen')
const { check, validationResult } = require('express-validator')
const config = require('config')
const User = require("../../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



router.get("/", auth, async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.json(user)

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }

    })
    //@route POST api/users
    //@desc Authenticate User & get token
    //@access Public
router.post("/", [

    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    console.log(req.body)
    try {
        //see if user exist
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ errors: [{ mgs: "Invalid Credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ errors: [{ mgs: "Invalid Credentials" }] });
        }



        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
    }

})

module.exports = router