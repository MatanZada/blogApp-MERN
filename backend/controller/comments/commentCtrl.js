const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");

//create
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //1. get the user
  //   console.log(req.user);
  const user = req.user;
  //2. get the post id
  const { postId, description } = req.body;
  //   console.log(postId);
  //   console.log(description);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//fetch all comments
const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created");
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { createCommentCtrl, fetchAllCommentsCtrl };
