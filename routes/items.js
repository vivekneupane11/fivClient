const router = require("express").Router();

const checkAuth = require("../middleware/checkauth");
const { generateJWT } = require("../modules/functions");

const Items = require("../models/items");
router.post("/add", checkAuth, (req, res) => {
  const {
    name,
    description,
    instructions,
    channel,
    category,
    width,
    height,
    tags
  } = req.body;
  const { username } = req.jwt;
  let item = new Items({
    user: username,
    name: name,
    description: description,
    instructions: instructions,
    channel: channel,
    category: category,
    width: width,
    height: height,
    tags: tags
  });
  item.save((err, doc) => {
    if (err) throw err;
    console.log("document saved");
    res.json({ message: "ok" });
  });
});
router.post("/", async (req, res) => {
  // **TODO** only send page index
  const resPerPage = 4; // results per page
  const page = req.body.page || 1; // Page
  try {
    // Find Demanded Products - Skipping page values, limit results       per page
    const foundItems = await Items.find({})
      .skip(resPerPage * page - resPerPage)
      .limit(resPerPage);
    console.log(foundItems);
    // Count how many products were found
    const numOfProducts = await foundItems.length;
    // Renders The Page
    res.json({
      items: foundItems,
      currentPage: page,
      pages: Math.ceil(numOfProducts / resPerPage),
      numOfResults: numOfProducts
    });
  } catch (err) {
    throw new Error(err);
  }
});
//   res.status(200).json([
//     {
//       _id: "0hello",
//       user: "1hello",
//       name: "2hello",
//       description: "3hello",
//       instructions: "4hello",
//       channel: "5hello",
//       url: "6hello",
//       fileType: "7hello",
//       iframe_url: "8hello",
//       category: "cat1",
//       creationDate: "10hello",
//       publishedDate: "11hello",
//       width: "12hello",
//       height: "13hello",
//       tags: ["tag1", "tag2"],
//       attachments: {
//         zipFile: "hello",
//         thumbnail1: "hello",
//         thumbnail2: "hello",
//         screenshot1: "hello",
//         screenshot2: "hello",
//         screenshot3: "hello",
//         screenshot4: "hello"
//       }
//     },
//     {
//       _id: "0bye",
//       user: "1bye",
//       name: "2bye",
//       description: "3bye",
//       instructions: "4bye",
//       channel: "5bye",
//       url: "6bye",
//       fileType: "7bye",
//       iframe_url: "8bye",
//       category: "cat2",
//       creationDate: "10bye",
//       publishedDate: "11bye",
//       width: "12bye",
//       height: "13bye",
//       tags: ["tag1", "tag2"],
//       attachments: {
//         zipFile: "bye",
//         thumbnail1: "bye",
//         thumbnail2: "bye",
//         screenshot1: "bye",
//         screenshot2: "bye",
//         screenshot3: "bye",
//         screenshot4: "bye"
//       }
//     }
//   ]);
// });

router.post("/publish", checkAuth, (req, res) => {
  const { _id } = req.body;

  Items.updateOne({ _id }, { $set: { status: "published" } }, (err, data) => {
    if (!err) {
      res.status(201).json({ success: true, message: data });
    }
  });
});

router.post("/edit", checkAuth, async (req, res) => {
  const {
    _id,
    name,
    description,
    instructions,
    channel,
    category,
    width,
    height,
    tags
  } = req.body;

  const options = {
    name,
    description,
    instructions,
    channel,
    category,
    width,
    height,
    tags
  };
  // **TODO** edit after finding by _id
  let doc = await Items.findOneAndUpdate({ _id: _id }, options);
  if (doc) {
    res.json({ message: "updated" });
  }
});

module.exports = router;
