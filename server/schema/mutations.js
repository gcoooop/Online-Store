const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const User = mongoose.model("user");
const Category = mongoose.model("category");
const Product = mongoose.model("product");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");
const UserType = require("./types/user_type");

const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
          token: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.verifyUser(args);
      }
    },
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Category.remove({_id: id});
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt }
      },
      resolve(parentValue, { name, description, weight }) {
        return new Product({ name, description, weight }).save();
      }
    },
    deleteProduct: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Product.remove({_id: id});
      }
    },
  }
});

module.exports = mutation;