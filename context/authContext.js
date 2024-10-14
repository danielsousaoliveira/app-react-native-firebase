import { useContext, createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

const usersCollection = firestore().collection("Users");

const AuthContext = createContext();

export function useAuth() {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped in a <SessionProvider />");
    }

    return value;
}

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [initializing, setInitializing] = useState(true);

    function onAuthStateChanged(user) {
        if (user) {
            setIsAuthenticated(true);
            setUser(user);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const authListener = auth().onUserChanged((result) => {
            onAuthStateChanged(result);
        });
        return authListener;
    }, []);

    const login = async (email, password) => {
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            if (msg.includes("(auth/invalid-credentials)")) {
                msg = "Username or password is incorrect";
            }
            return { success: false, message: msg };
        }
    };

    const logout = async () => {
        try {
            const response = await auth().signOut();
            return { success: true, data: null };
        } catch (error) {
            return { success: false, message: error.message, error: error };
        }
    };

    const register = async (email, password, username) => {
        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            await usersCollection.doc(response.user.uid).set({ username, email, userId: response.user.uid });
            return { success: true, data: response?.user };
        } catch (error) {
            let msg = error.message;
            if (msg.includes("(auth/invalid-email)")) {
                msg = "Please enter a valid email";
            } else if (msg.includes("(auth/email-already-in-use)")) {
                msg = "Email already in use";
            }
            return { success: false, message: msg };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
