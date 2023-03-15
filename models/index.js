const User = require("./User");
const Post = require("./Post")
const Comment = require("./Comment")
const Friends = require("./Friends")

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: "CASCADE"
})

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE"
})

Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE"
})

User.belongsToMany(User, {
  as: "friends",
  foreignKey: "user_id",
  through: Friends,
});
User.belongsToMany(User, {
  as: "userFriends",
  foreignKey: "friend_id",
  through: Friends,
});



module.exports = { User, Post, Comment };
