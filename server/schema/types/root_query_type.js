const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const axios = require("axios");
const keys = require("../../../config/keys");

const User = mongoose.model("user");
const Category = mongoose.model("category");
const Product = mongoose.model("product");
const UserType = require("./user_type");
const CategoryType = require("./category_type");
const ProductType = require("./product_type");


const authOptions = {
  method: "GET",
  url: "https://lxo97d65k3.execute-api.us-west-1.amazonaws.com/default/generate-price",
  headers: { "x-api-key": keys.AWSKey }
}

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    categories: {
      type: CategoryType,
      resolve() {
        return Category.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id);
      }
    },
    products: {
      type: ProductType,
      resolve() {
        return Product.find({});
      }
    },
    product: {
      type: ProductType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Product.findById(args._id).then(product => {
          return axios(authOptions).then(res => {
            product.cost = res.data.cost;
            return product;
          });
        });
      }
    }
  })
});

module.exports = RootQueryType;