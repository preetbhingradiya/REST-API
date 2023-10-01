const User = require("../model/user-mode");
const bcyrpt = require("bcrypt");

//update user
const updateUser = async (req, res) => {
  id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    try {
      if (req.body.password) {
        try {
          const { password } = req.body;
          const salt = await bcyrpt.genSalt(10);
          req.body.password = await bcyrpt.hash(password, salt);
        } catch (error) {
          res.status(500).json(err);
        }
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Account has been updated", user });
    } catch (error) {
      res.send({ error });
    }
  } else {
    res.send({ message: "User can not found" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  id = req.params.id;
  const user = await User.findById(id);
  if (user) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account has been delete success" });
    } catch (error) {
      res.send({ message: "User can not found", error });
    }
  } else {
    res.send({ message: "User can not found" });
  }
};

//get user
const OneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json({ message: "user can not found" });
  }
};

//follower user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followe");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(403).json("you can not folow your self");
  }
};


//unfollow user
const UnFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been UnFollowe");
      } else {
        res.status(403).json("you dont folloe this user");
      }
    } catch (error) {
      res.status(403).json(error);
    }
  } else {
    res.status(403).json("you can not UnFollow your self");
  }
};

module.exports = { updateUser, deleteUser, OneUser,followUser,UnFollowUser };
