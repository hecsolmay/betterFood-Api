const PascalCase = (string = "") => {
  let pascalString = string.trim()
    
  return pascalString.substring(0, 1).toUpperCase() + pascalString.substring(1).toLowerCase();
};

module.exports = PascalCase;
