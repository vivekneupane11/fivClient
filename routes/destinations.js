const router = require("express").Router();
const checkAuth = require("../middleware/checkauth");
const Destinations = require("../models/destinations");
const ItemDestinations = require("../models/itemdestinations");
//both routes must be only for authenticated users
router.get("/", checkAuth, async (req, res) => {
  const destinations = await Destinations.find({});
  res.json({ destinations });
});

router.post("/selected", checkAuth, (req, res) => {
  const { selectedDests, toggleDest } = req.body;
  console.log(selectedDests, toggleDest);
  /**TODO insert into ItemDestinations collection for each selected items */
  //**item_name , destinations  */
});

module.exports = router;
