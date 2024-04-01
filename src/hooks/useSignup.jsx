import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [responseG, setResponseG] = useState(null);
  const { dispatch } = useAuthContextProvider();

  const signup = async (data) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setResponseG({
        title: "error",
        type: "error",
        message: json.error,
      });
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      setResponseG({
        title: "Account Created",
        type: "success",
        message:
          "Your signup was completed successfully. You can now proceed to login with your credentials.",
      });
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { isLoading, signup, error,responseG };
};
