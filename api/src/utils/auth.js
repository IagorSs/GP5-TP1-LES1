import jsonwebtoken from "jsonwebtoken";
import dotev from "dotenv";

dotev.config();

const Auth = (request, response, next) => {
  if (
    request.url === "/user/new" ||
    request.url === "/user/login" ||
    !request.url.includes("/user")
  )
    return next();

  const { token } = request.headers;

  let payload = {};
  try {
    payload = jsonwebtoken.verify(token, process.env.SECRET_KEY_TOKEN);
  } catch (error) {
    payload = undefined;
  }

  if (!payload) return response.status(401).send({ message: "Unauthorized" });

  next();
};

export default Auth;
