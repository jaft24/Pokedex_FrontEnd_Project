import jwt from "jsonwebtoken";

/* I have an any tpe here beacuse I don't know exactly what to expect from the decoder  
    (JwtPayload or null or String) */
const decodeToken = (token: string): string => {
  try {
    const decodedToken: any = jwt.decode(token);
    if (decodedToken && decodedToken.name) {
      return decodedToken.name;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
  return "No Name in Token";
};

export default decodeToken;
