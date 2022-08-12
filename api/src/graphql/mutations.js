const { GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");
const { User, Task } = require("../models");
const { auth, bcrypt } = require("../util");
const { RoleType, TaskType } = require("./types");

const register = {
  type: GraphQLString,
  args: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { userName, email, password }) {
    const user = new User({ userName, email, password});
    user.password = await bcrypt.encryptPassword(user.password);
    await user.save();

    const token = auth.createJWTToken({
      _id: user._id,
      email: user.email,
      username: user.userName,
    });
    return token;
  },
};

const login = {
  type: GraphQLString,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new Error("Invalid Username");

    const validPassword = await bcrypt.comparePassword(password, user.password);

    if (!validPassword) throw new Error("Invalid Password");

    const token = auth.createJWTToken({
      _id: user._id,
      email: user.email,
      userName: user.userName,
    });

    return token;
  },
};


const createTask = {
  type: TaskType,
  description: "Create a new task",
  args: {
    tittle: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_, { tittle, description }) {
    const newTask = new Task({
      tittle,
      description,
    });
    return newTask.save();
  },
};

const updateTask = {
  type: TaskType,
  description: "update a task",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    tittle: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, title, description }) {

    const taskUpdated = await Task.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title, description
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!taskUpdated) throw new Error("error");

    return taskUpdated;
  },
};

const deleteTask = {
  type: GraphQLString,
  description: "delete a task",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { id }, { verifiedUser }) {

    const taskDelete = await Task.findOneAndDelete({
      _id: id,
    });

    if (!taskDelete)
      throw new Error("error");

    return "Task deleted";
  },
};

module.exports = {
  register,
  login,
  createTask,
  updateTask,
  deleteTask,
};
