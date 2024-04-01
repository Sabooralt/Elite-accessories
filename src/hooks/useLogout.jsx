import { useAuthContextProvider } from "./useAuthContext"


export const useLogout = () => {
  const { dispatch } = useAuthContextProvider()

  const logout = () => {
    
    localStorage.removeItem('user')

   
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}