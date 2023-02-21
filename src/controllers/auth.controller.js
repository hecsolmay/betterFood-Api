const UserServices = require("../services/user.services");
const jwtoken = require("../libs/tokens");
const Response = require("../common/response");
const PascalCase = require("../libs/pascalCase");

const singUp = async (req, res) => {
  try {
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    let { username, email, password, rol } = req.body;
    const externalToken = req.get("Authorization")?.split(" ").pop();
    let picture = "";

    // TODO: Implementar la imagen de perfil al token y a la base de datos

    if (externalToken) {
      const externalUser = jwtoken.tokenDecode(externalToken);
      email = externalUser.email;
      username = externalToken.username;
      picture = externalToken.picture;
    }

    email = email.toLowerCase().trim();

    const savedUser = await UserServices.createUser({
      username: PascalCase(username),
      email,
      password,
      rol,
      picture,
    });

    const token = jwtoken.tokenSign(savedUser, rol, expires);

    const user = UserServices.cleanUser(savedUser);

    res.status(200).json({ token, user, expiresAt: expires });
  } catch (error) {
    return Response.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    let { email, password } = req.body;
    const externalToken = req.get("Authorization")?.split(" ").pop();

    if (externalToken) {
      const externalUser = jwtoken.tokenDecode(externalToken);
      email = externalUser.email;
    }

    const userFound = await UserServices.searchUser(email);
    if (!userFound)
      return res.status(400).json({ message: "invalid password or User" });

    const matchPassword = externalToken
      ? true
      : await UserServices.comparePassword(password, userFound.password);

    if (!matchPassword)
      return res
        .status(400)
        .json({ token: null, message: "invalid password or User" });

    console.log(userFound.rol.name);
    const token = jwtoken.tokenSign(userFound, userFound.rol.name, expires);

    const user = UserServices.cleanUser(userFound);

    console.log(user);

    res.json({ token, user, expiresAt: expires });
  } catch (error) {
    Response.error(res);
  }
};

module.exports = {
  singUp,
  signIn,
};
