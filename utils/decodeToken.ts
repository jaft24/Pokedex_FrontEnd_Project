import { userData } from "@/models/userData";
import jwt from "jsonwebtoken";

/* I have an any tpe here beacuse I don't know exactly what to expect from the decoder  
    (JwtPayload or null or String) */
const decodeToken = (token: string): userData | string => {
  try {
    const decodedToken: any = jwt.decode(token);
    if (
      decodedToken &&
      decodedToken.name &&
      decodedToken.preferred_username &&
      decodedToken.email
    ) {
      return {
        name: decodedToken.name,
        preferred_username: decodedToken.preferred_username,
        email: decodedToken.email,
      };
    } else {
      return "Missing required properties in the token payload";
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return "Error decoding token";
  }
};

export default decodeToken;
