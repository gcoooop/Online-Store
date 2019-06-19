const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Category = mongoose.model("category");
const Product = mongoose.model("product");
const CategoryType = require('./types/category_type');
const ProductType = require('./types/product_type');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
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
        return new Product({ name, description, weight });
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