/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/
const express = require("express");
const router = express.Router();
var Thread = require("../models/thread.js");
var Post = require("../models/post.js");

router.get("/allthreads", (req, res) => {
  Thread.find()
    .then((exc) => res.json(exc))
    .catch((err) => res.status(400).json("Error is " + err));
});

router.post("/newthread", (req, res) => {
  const newThread = new Thread({
    title: req.body.title,
    author: req.body.author,
  });
  newThread
    .save()
    .then(() => res.status(200).json(newThread))
    .catch((err) => console.log(err));
});

router.post("/:id/newpost", (req, res) => {
  const newPost = new Post({
    post: req.body.post,
    author: req.body.author,
    thread: req.params.id,
  });
  const pid=newPost._id;
  newPost.save()
  .then(()=>console.log(newPost))
  .catch((err) => console.log(err));
  Thread.findById(req.params.id)
    .then((exc) => {
        exc.post.push(pid),
        exc.save()})
    .catch((err) => res.status(400).json("Error is " + err));
    
    res.status(200).json(newPost);
});

router.get("/:id/allpost", (req, res) => {
  Post.find({thread:req.params.id})
    .then((exc) =>{res.json(exc)
    })
    .catch((err) => res.status(400).json("Error is " + err));
});
module.exports = router;
