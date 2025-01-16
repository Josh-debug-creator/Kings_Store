import userModel from '../Models/user.model.js'

class userService {
  // create user instance
  async registerUser(userInfo) {
    const newUser = new userModel(userInfo);
    const savedUser = await newUser.save();
    return savedUser;
  }
  // get all users instance
  async findAllUsers() {
    const users = await userModel.find();
    return users;
  }
  // get one user by email
  async findUserByEmail(email) {
    const oneUser = await userModel.findOne(email);
    return oneUser;
  }

  // get one user by id
  async findUserById(id) {
    const oneUser = await userModel.findById({_id:id})
    return oneUser;
  }

  // update user instance
  async updateUserById(id, newInfo) {
    const update = await userModel.findByIdAndUpdate({ _id: id }, newInfo, {
      new: true,
    });
    return update;
  }
  // delete user instance
  async deleteUser(id) {
    const deletedUser = await userModel.findByIdAndDelete({ _id: id });
    return deletedUser;
  }


}

const userInstance = new userService();
export default  userInstance;
