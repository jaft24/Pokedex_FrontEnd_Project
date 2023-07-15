import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import decodeToken from "../../utils/decodeToken";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8083/realms/pokedexapi/protocol/openid-connect/token",
        {
          client_id: "trainer",
          username,
          password,
          grant_type: "password",
          client_secret: "sHXxsqaebT4jeGWlLqTHLs4EUqMG31R5",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token } = response.data;
      console.log(access_token);
      const name = decodeToken(access_token);
      console.log("Decoded name:", name);

      router.push("/captured");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <label>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
