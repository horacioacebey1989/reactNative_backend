const { GraphQLSchema, GraphQLObjectType } = require("graphql");

// Queries
const { users, user, task, tasks } = require("./queries");

// Mutations
const {
  register,
  login,
  createTask,
  updateTask,
  deleteTask,
} = require("./mutations");

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {
    users,
    user,
    task,
    tasks,
  },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    createTask,
    updateTask,
    deleteTask,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
