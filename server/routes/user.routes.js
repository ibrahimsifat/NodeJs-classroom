const express = require("express");
const userCtrl = require("../controllers/user.controller");
const upload = require("../middlewares/users/avatarUpload");
const authCtrl = require("../controllers/auth.controller");

const userRouter = express.Router();
const { requireSignIn, hasAuthorization } = authCtrl;

// routes path="/api/users/findFollowers"
userRouter.route("/findFollowers").get(requireSignIn, userCtrl.findFollowers);

// routes path="/api/users/findFollowers"
userRouter.route("/findFollowing").get(requireSignIn, userCtrl.findFollowing);

// routes path="/"
userRouter
  .route("/")
  .get(userCtrl.list)
  .post(upload.single("avatar"), userCtrl.create);

// routes path="/:userId"
userRouter
  .route("/:userId")
  .get(userCtrl.read)
  .patch(requireSignIn, hasAuthorization, userCtrl.update)
  .delete(requireSignIn, hasAuthorization, userCtrl.remove);

// routes path="/api/users/follow"
userRouter
  .route("/follow")
  .put(requireSignIn, userCtrl.addFollowing, userCtrl.addFollower);

// routes path="/api/users/unfollow"

userRouter
  .route("/unfollow")
  .put(requireSignIn, userCtrl.removeFollowing, userCtrl.removeFollower);

userRouter.param("userId", userCtrl.userByID);
module.exports = userRouter;
