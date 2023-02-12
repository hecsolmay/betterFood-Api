const { verifyToken, canEdit, isAdmin, canSale } = require("./authJwt");
const { emailExisted } = require("./emailVerification");
const { checkRoleExisted } = require("./verifySignUp");
const { checkValidCategory } = require("./verifyCategory");
const { verifyStatusDeleteOrder, verifyUpdateSale } = require("./verifyOrder");

module.exports = {
  verifyToken,
  emailExisted,
  canEdit,
  isAdmin,
  checkRoleExisted,
  canSale,
  checkValidCategory,
  verifyStatusDeleteOrder,
  verifyUpdateSale,
};
