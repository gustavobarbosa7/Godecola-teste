import { useEffect, useState } from "react";
import { parseJwt } from "../utils/jwt";
import { getToken } from "../utils/jwt";
import userService from "../services/userService";

export function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) return;

      const decoded = parseJwt(token);
      const userId = decoded?.nameid || decoded?.sub;
      if (!userId) return;

      try {
        const userData = await userService.getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    };

    fetchUser();
  }, []);
console.log(user)
  return user;
}
