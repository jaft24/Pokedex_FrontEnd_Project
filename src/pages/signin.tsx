import { useRouter } from "next/router";
import SignInCard from "@/components/AuthenticationComponents/SignInCard";
import { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { getLoginToken } from "@/network/capturedApi";

export default function SignInPage() {
  const { login, token } = useAuth();
  const router = useRouter();
  const [wrongCredentialWarning, setWrongCredentialWarning] = useState(false);
  const [isInvalid, setIsInvalid] = useState({
    username: false,
    password: false,
  });

  const handleLogin = async (username: string, password: string) => {
    if (username === "" || password === "") {
      setWrongCredentialWarning(false);
      setIsInvalid((prevState) => ({
        ...prevState,
        username: username === "",
        password: password === "",
      }));
      return undefined;
    }

    try {
      setIsInvalid({ username: false, password: false });
      login(await getLoginToken(username, password));
      router.push(`/`);
    } catch (error) {
      setWrongCredentialWarning(true);
    }
  };

  return (
    <SignInCard
      wrongCredentialWarning={wrongCredentialWarning}
      handleLogin={handleLogin}
      isInvalid={isInvalid}
    />
  );
}
