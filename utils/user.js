const User = require("../models/users");
const addUser = async (name, passwordHash) => {
  try {
    const newUser = await User.build({ name, passwordHash });
    newUser.save();
  } catch (error) {
    console.log(error);
  }
};

const listUsers = async () => {
  try {
    return await User.findAll({});
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addUser,
  listUsers,
};
