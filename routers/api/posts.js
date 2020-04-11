const express = require('express');
const router = express.Router();
const auth = require("../../middleware/authen");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require('express-validator')




//send post
router.post("/", [auth, [
        check("text", "text is required").not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() })
        }
        try {
            const user = await User.findOne({ _id: req.user.id }).select("-password")
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id

            })
            await newPost.save()
            res.send(newPost)
        } catch (err) {
            console.log(err)
            res.status(200).send({ err: err.message })
        }
    })
    //get all posts
router.get("/", auth, async(req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });
            res.send(posts)
        } catch (err) {
            res.status.send(err)
        }


    })
    //get post by id
router.get("/:id", auth, async(req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        if (!posts) { return res.status(404).send("Not Found") }
        res.send(posts)
    } catch (err) {
        res.status(200).send(err)
    }
})

//delete post by id
router.delete("/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) { return res.status(404).send("Post Not Found") }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "User not authorized" })
        }
        await post.remove()
        res.json({ msg: "post was removed" })
    } catch (err) {
        console.log(err)
        res.status(200).send(err)
    }
})

//like post
router.put("/like/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) { return res.status(400).json({ mgs: "Post already liked" }) }
        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.send(post)
    } catch (err) {
        console.log(err);
        res.status(200).send(err)
    }
})

//unlike post
router.put("/unlike/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) { return res.status(400).json({ mgs: "you havent liked this post" }) }
        const removeIndex = post.likes.map(item => item.id).indexOf(req.params.id);
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.send(post)
    } catch (err) {
        console.log(err);
        res.status(200).send(err)
    }
})

//add comment 
router.put("/comment/:id", [auth, [
    check("text", "text is required").not().isEmpty()
]], async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id)
        const comment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar
        }
        post.comments.unshift(comment)
        await post.save()
        res.send(post)
    } catch (err) {
        res.status(200).send(err)
    }
})

//delete comment
router.delete("/comment/:id/:commentid", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const commentIndex = post.comments.map(item => item.id).indexOf(req.params.commentid);
        if (commentIndex === -1) { return res.json({ msg: "Comment doesnt exist" }) }
        if (req.user.id !== post.comments[commentIndex].user.toString()) { return res.status(200).send("This user cant delete this comment") }
        post.comments.splice(commentIndex, 1)
        await post.save()
        res.send(post)

    } catch (err) {
        console.log(err)
        res.status(200).send(err)
    }
})


module.exports = router