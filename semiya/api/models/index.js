const Users = require("./Users");
const Products = require("./Products");
const Favorites = require("./Favorites");
const Purchases = require("./Purchases");
const Review = require("./Review");
const Categories = require("./Categories");

Favorites.belongsTo(Users, {as: "author"});
Users.belongsTo(Favorites, {as: "favorites"});


Purchases.belongsTo(Users, {as: "author"});
Purchases.hasMany(Products, {as: "products"});
Users.hasMany(Purchases, {as: "purchases"});

Favorites.hasMany(Products, {as: "product"});

Review.belongsTo(Users, {as: "author"});
Users.hasMany(Review, {as: "review"});

module.exports = {Users, Products, Favorites, Purchases, Review, Categories};