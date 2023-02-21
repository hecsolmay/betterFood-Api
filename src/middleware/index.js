const { verifyToken, canEdit, isAdmin, canSale } = require("./authJwt");
const { emailExisted } = require("./emailVerification");
const { checkRoleExisted } = require("./verifySignUp");
const { checkValidCategory, checkUniqueCategory } = require("./verifyCategory");
const { verifyStatusDeleteOrder, verifyUpdateSale } = require("./verifyOrder");
const {
  checkUniqueIngredent,
  verifyExistingIngredents,
} = require("./verifyIngredent");
const { uniqueTable, verifyWaiter, existedTable } = require("./verifyTable");

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
  checkUniqueCategory,
  checkUniqueIngredent,
  verifyExistingIngredents,
  uniqueTable,
  verifyWaiter,
  existedTable,
};
