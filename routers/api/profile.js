const express = require('express');
const router = express.Router()
const auth = require('../../middleware/authen')
const { check, validationResult } = require("express-validator")

const Profile = require("../../models/Profile")
const User = require("../../models/User")
    //@route GET api/profile/me
    //@desc Get current user profile
    //@access Private
router.get("/me", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ mgs: "There is no profile for this user" })
        }
        res.send(profile)

    } catch (err) {

        res.status(500).json({ mgs: err.message })
    }
})

//@route POST api/profile
//@desc Create/Update user profile
//@access Private
router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, instagram, linkedin, twitter } = req.body
        //build profile object
    const profileFields = {};
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    //build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (instagram) profileFields.social.instagram = instagram
    if (linkedin) profileFields.social.linkedin = linkedin
    if (facebook) profileFields.social.facebook = facebook
    if (twitter) profileFields.social.twitter = twitter
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
                $set: profileFields
            }, {
                new: true
            })
            return res.json(profile)
        }

        //Create
        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }


})

//Get All Profile
router.get("/", async(req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"])
        res.send(profiles)
    } catch (err) {
        res.status(200).send({ err: err.message })
    }
})

//Get profile by User Id
router.get("/user/:id", async(req, res) => {
    try {
        const _id = req.params.id
        const profile = await Profile.findOne({ user: _id }).populate("user", ["name", "avatar"])
        if (!profile) {
            return res.status(500).send("this user id doesnt exist")
        }
        res.json(profile)
    } catch (err) {
        res.status(200).send({ err: err.message })
    }

})

//remove user,profile,post
router.delete("/", auth, async(req, res) => {
    try {
        //remove post


        //remove profile
        await Profile.findOneAndDelete({ user: req.user.id })
            //remove user
        await User.findOneAndDelete({ _id: req.user.id })
        res.send({ message: "User removed" })
    } catch (err) {
        res.send({ err: err.message })
    }

})

//add profile experience
router.put("/experience", [auth, [
    check("title", "title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check("from", "from day is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(200).json({ errors: errors.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const experience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.experience.push(experience)
        await profile.save()
        res.json(profile)
    } catch (err) {
        res.status(200).send({ err: err.message })
    }

})

//delete profile experience
router.delete("/experience/:id", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);
        profile.experience.splice(removeIndex, 1)
        await profile.save();
        res.send(profile)
    } catch (err) {
        res.status(200).send(err)
    }
})

//add profile education
router.put("/education", [auth, [
    check("school", "school is required").not().isEmpty(),
    check("degree", "degree is required").not().isEmpty(),
    check("fieldofstudy", "field of study is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(200).json({ errors: errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const education = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.push(education)
        await profile.save()
        res.json(profile)
    } catch (err) {
        res.status(200).send({ err: err.message })
    }

})

//delete profile education
router.delete("/education/:id", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id);
        profile.education.splice(removeIndex, 1)
        await profile.save();
        res.json(profile)
    } catch (err) {
        res.status(200).send(err)
    }
})

module.exports = router