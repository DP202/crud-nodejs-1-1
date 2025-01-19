const accountModel = require('../models/account.model');

module.exports = {
  createAccount: async (req, res) => {
    const body = req.body;
    const newAccount = await accountModel.create(body); // khi gọi accountModel.create -> thì middleware pre("save") được kích hoạt
    return res.status(201).json(newAccount);
  },

  getAllAccounts: async (req, res) => {
    const accounts = await accountModel.find();
    return res.status(200).json(accounts);
  },
};
