module.exports = {
  dragonTreasure: async (req, res) => {
    const getDragonTreasure = await req.app.get("db").get_dragon_treasure(1);
    return res.status(200).send(getDragonTreasure);
  },
  getUserTreasure: async (req, res) => {
    const user_Treasure = await req.app
      .get("db")
      .get_user_treasure(req.session.user.id);
    return res.status(200).send(user_Treasure);
  },
  addUserTreasure: async (req, res) => {
    const { treasureURL } = req.body;
    const { id } = req.session.user;

    const userTreasure = await req.app
      .get("db")
      .add_user_treasure(treasureURL, id);
    return res.status(200).send(userTreasure);
  },
  getAllTreasure: async (req, res ) => {
      const allTreasure = await req.app.get('db').get_all_treasure();
      return res.status(200).send(allTreasure)
  }
};
