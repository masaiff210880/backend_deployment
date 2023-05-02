const express = require("express");
const { SocialModel } = require("../Models/Social.model");
const socialRouter = express.Router();

// Create Post
socialRouter.post("/create", async (req, res) => {
  try {
    const post = SocialModel(req.body);
    await post.save();
    res.status(200).send({ msg: "Post Added!!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Geeting Post
socialRouter.get("/", async (req, res) => {
  try {
    const { device, device1 } = req.query;
    const query = { userId: req.body.userId };
    if (device) {
      query.device = device;
    }
    if (device1) {
      query.$and = [{ device: device }, { device: device }];
    }
    const post = await SocialModel.find(query);
    res.status(200).send({ msg: "All Posts!!", post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update Post
socialRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await SocialModel.findByIdAndUpdate(
      { _id: id },
      req.body
    );
    res.status(200).send({ msg: "Post Updated", updatePost });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete Post
socialRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SocialModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Post Deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { socialRouter };
