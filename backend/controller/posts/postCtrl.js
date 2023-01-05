const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../model/post/Post");
const { validateMongodbId } = require("../../utils/validateMongodbID");
const User = require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const blockUser = require("../../utils/blockUser");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //Display message if user is blocked
  blockUser(req.user);
  //validateMongodbId(req.body.user);
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  //Prevet user f his account is a starter account

  if (
    req?.user?.accountType === "Starter Account" &&
    req?.user?.postCount >= 2
  ) {
    throw new Error(
      "Starter account can only create two posts. Get more followers."
    );
  }

  // //1. Get the path to img
  const localPath = `public/images/posts/${req.file.filename}`;
  // //2.Upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
  try {
    const post = await Post.create({
      ...req.body,
      user: _id,
      image: imgUploaded?.url,
    });
    console.log(req.user);
    //update the user post count
    await User.findByIdAndUpdate(
      _id,
      {
        $inc: { postCount: 1 },
      },
      {
        new: true,
      }
    );

    //Remove uploaded img
    fs.unlinkSync(localPath);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//fetch all posts
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

//fetch a single post
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes");
    //update number
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: {
          numViews: 1,
        },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//update posts

const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  // console.log(req.params.id);
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...req.body, user: req.user?._id },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findOneAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//likes
const toggleAddLikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.user);
  //1.find the post to be liked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2.find the login user
  const loginUserId = req?.user?._id;
  //3.find is this user has liked this post?
  const isLiked = post?.isLiked;
  // console.log(isLiked);
  //4. check if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  // console.log(alreadyDisliked);
  //5. remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isLiked) {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

//disLikes
const toggleAddDislikeToPostCtrl = expressAsyncHandler(async (req, res) => {
  //1.find the post to be disliked
  const { postId } = req.body;
  const post = await Post.findById(postId);
  //2.find the login user
  const loginUserId = req?.user?._id;
  //3. check if this user has already disLikes
  const isDisLiked = post?.isDisLiked;
  //4. check if already like this post
  const alreadyLiked = post?.likes?.find(
    (userId) => userId.toString() === loginUserId?.toString()
  );
  // console.log(alreadyLiked);
  //remove this user from likes if it exists
  if (alreadyLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user from dislikes if already disliked
  if (isDisLiked) {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    const post = await Post.findOneAndUpdate(
      postId,
      {
        $push: { disLikes: loginUserId },
        isDisLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPostCtrl,
  toggleAddDislikeToPostCtrl,
};
