import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContextProvider();
  const [responseG,setResponseG] = useState(null);


  const login = async (data) => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: data.email, password: data.password }),
    });

    const json = await response.json();
    if (!response.ok) {
        setResponseG({
            type: "error",
            message: json.error
        })
        setIsLoading(false);
        setError(json.error);
    }
    if(response.ok){
        setResponseG({
            type: "success",
            message: "You have successfully logged in. You will now be redirected to the home page."
        })
        localStorage.setItem('user',JSON.stringify(json))
        dispatch({type: 'LOGIN',payload: json})
        setIsLoading(false);
    }
  }
  return {isLoading,login,error,responseG}
};
