const router = require("express").Router();
const { User, Friends } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          through: Friends,
          as: "friends_table"
        }
     ]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // GET a single user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      // include: [{ model: Location, through: Trip, as: "planned_trips" }],
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Add friends
// router.put("/:id", async (req, res) => {

//   User.update(req.body, {
//     where: {
//       id: req.params.id
//     }

//     .then(user => {
//        if (req.body.friends_ids && req.body.friends_ids.length) {
//         const friendsList = Friends.findAll({
//           where: { user_id: req.params.id }
//         });
      
//          const friendsListIds = friendsList.map(({ friends_id }) => {
//             friends_id
//           })
//          const newFriends = req.body.friends
//            .filter(friend_id => !friendsListIds.includes(friend_id))
//            .map((friend_id) => {
//              return {
//                user_id: req.params.id,
//                friend_id
//            }
//          })
       
//       }

//       return res.json(product);
//     })

// });

// CREATE a user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {

      res.status(200).json({ user: req.body })
    })
    .catch((err) => res.status(400).json(err));
});


// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
