import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Box } from "@chakra-ui/react";

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
        "https://usw2.auth.ac/auth/realms/pokedex-realm/protocol/openid-connect/token",
        {
          client_id: "admin-cli",
          client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_CLI_SECRET,
          grant_type: "client_credentials",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = response.data;

      try {
        const response = await axios.post(
          "https://usw2.auth.ac/auth/admin/realms/pokedex-realm/users",
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

        router.push("/signin");
      } catch (error) {
        console.error("User Creation failed:", error);
      }
    } catch (error) {
      console.error("Master Token Generation Failed:", error);
    }
  };

  return (
    <Box>
      <h1> 🚧  The Sign Up UI is currently under construction. 🚧 </h1>
      <h3> But please go ahead and create an account, and you will be redirected to Sign In </h3>
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
      <Button onClick={handleSignUp}>Sign Up</Button>
    </Box>
  );
}
