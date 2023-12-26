import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://pokedex-backend-project.fly.dev:8083/realms/pokedexapi/protocol/openid-connect/token",
        {
          client_id: "admin-cli",
          client_secret: "TIspf2v8cJwvtnEEPodoiNQIFt7BcsTt",
          grant_type: "client_credentials",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = response.data;
      console.log(access_token);

      try {
        const response = await axios.post(
          "http://localhost:8083/admin/realms/pokedexapi/users",
          {
            enabled: true,
            username,
            email,
            emailVerified: true,
            firstName,
            lastName,
            credentials: [
              {
                type: "password",
                value: password,
                temporary: false,
              },
            ],
            groups: [],
            attributes: {
              locale: ["en"],
            },
          },
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        );

        console.log("User is created:", firstName + " " + lastName);
        router.push("/captured");
      } catch (error) {
        console.error("User Creation failed:", error);
      }
    } catch (error) {
      console.error("Master Token Generation Failed:", error);
    }
  };

  return (
    <div>
      <label>
        First Name:{" "}
        <input type="text" value={firstName} onChange={handleFirstNameChange} />
      </label>
      <br />
      <label>
        Last Name:{" "}
        <input type="text" value={lastName} onChange={handleLastNameChange} />
      </label>
      <br />
      <label>
        Email: <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Prefered Username:{" "}
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
