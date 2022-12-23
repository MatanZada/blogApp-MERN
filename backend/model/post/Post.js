const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    //Create by only category
    category: {
      type: String,
      required: [true, "Post title is required"],
      default: "All",
    },
    isLiked: {
      type: Boolean,
      required: [true, "Post title is required"],
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      required: [true, "Post title is required"],
      default: false,
    },
    numViews: {
      type: Number,
      required: [true, "Post title is required"],
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    description: {
      type: String,
      required: [true, "Please Author is required"],
    },
    image: {
      type: String,
      required: [true, "Please Author is required"],
      default:
        "https://cdn.pixabay.com/photo/2022/12/12/12/58/dog-7651002_960_720.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timeseries: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
