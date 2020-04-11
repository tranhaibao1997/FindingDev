const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')

//@route POST api/users
//@desc Register User
//@access Public
router.post("/", [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        //see if user exist
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ mgs: "User existed" }] });
        }
        //get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            rating: 'pg',
            //default
            d: 'mm'
        })
        user = new User({
            name,
            email,
            avatar,
            password
        })


        //encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save();


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