import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "../service/api";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";

export type AuthContextDataProps = {
  user: UserDTO;
  SignIn: (register: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
  isLoadingUserData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function userAndTokenUpdated(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(userData)

  }

  async function SignIn(register: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { register, password })

      if (data.user && data.token) {
        setIsLoadingUserData(true)

        if(!data.user.is_paid) {
          throw new AppError("Pagamento pendente! você não pode fazer login")
        }

        await storageUserSave(data.user)
        await storageAuthTokenSave(data.token)

        userAndTokenUpdated(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }

  }

  async function loadUserLogged() {
    try {
      setIsLoadingUserData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      setIsLoadingUserData(false)

      if (token && userLogged) {
        userAndTokenUpdated(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }

  }

  async function SignOut() {
    try {
      setIsLoadingUserData(true)

      setUser({} as UserDTO)

      storageUserRemove()
      storageAuthTokenRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserLogged()
  }, [])

  return (
    <AuthContext.Provider value={{ user, SignIn, isLoadingUserData, SignOut }}>
      {children}
    </AuthContext.Provider>
  )
}