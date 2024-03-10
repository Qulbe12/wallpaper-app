import {createContext} from "react";

interface AuthContextType {
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: async () => {
    },
    signOut: async () => {
    },
});