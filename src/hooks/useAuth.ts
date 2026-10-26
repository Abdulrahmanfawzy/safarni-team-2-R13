import { registerUser } from "@/actions/auth.actions";
import { RegisterPayload } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const register = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (payload: RegisterPayload) => registerUser(payload),
  });

  return {
    register,
  };
};
