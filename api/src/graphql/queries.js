const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const { UserType, TaskType } = require("./types");
const { User, Task } = require("../models");

const users = {
  type: new GraphQLList(UserType),
  description: "List of users",
  resolve: () => User.find(),
};

const user = {
  type: UserType,
  description: "single user",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => User.findById(id),
};


const tasks = {
  type: new GraphQLList(TaskType),
  description: "list of tasks",
  resolve: () => Task.find(),
};

const task = {
  type: TaskType,
  description: "single task",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => Task.findById(id),
};

module.exports = { users, user, task, tasks };
