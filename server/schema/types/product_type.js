const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const Category = mongoose.model("category");
const CategoryType = require("./category_type");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { 
      type: CategoryType,
      resolve(parentValue) {
        return Category.findById(parentValue.category)
          .then(category => category)
          .catch(err => null);
      }
    },
    description: { type: GraphQLString },
    weight: { type: GraphQLInt }
  })
});

module.exports = ProductType;