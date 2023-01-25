const UserServices = require("../libs/usersCreation");
const jwtoken = require("../libs/tokens");
const Response = require("../common/response");
const singUp = async (req, res) => {
  try {
    let { username, email, password, roles } = req.body;
    const externalToken = req.get("Authorization")?.split(" ").pop();

    // TODO: Implementar la imagen de perfil al token y a la base de datos

    if (externalToken) {
      const googleUser = jwtoken.tokenVerify(externalToken);
      email = googleUser.email;
      username = externalToken.username;
    }

    const savedUser = await UserServices.createUser(
      username,
      email,
      password,
      roles
    );

    const token = jwtoken.tokenSign(savedUser);

    res.status(200).json({ token: token });
  } catch (error) {
    return Response.error(res);
  }
};

const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const externalToken = req.get("Authorization")?.split(" ").pop();

    if (externalToken) {
      const googleUser = jwtoken.tokenVerify(externalToken);
      email = googleUser.email;
    }

    const user = await UserServices.searchUser(email);
    if (!user) return res.status(400).json({ message: "User not Found" });

    const matchPassword = externalToken
      ? true
      : await UserServices.comparePassword(password, user.password);

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "invalid password" });

    const token = jwtoken.tokenSign(user);
    res.json({ token, user: user });
  } catch (error) {
    Response.error(res);
  }
};

module.exports = {
  singUp,
  signIn,
};
