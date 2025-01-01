import React, { createContext, useState, useContext, useEffect } from "react";
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      setUser({
        userId: currentUser.userId,
        username: currentUser.username,
        email: attributes.email,
        ...attributes,
      });
    } catch (error) {
      if (error.name !== "UserUnAuthenticatedException") {
        console.error("Auth check error:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async (username, password) => {
    try {
      const { isSignedIn } = await signIn({ username, password });
      if (isSignedIn) {
        await checkUser();
      }
      return isSignedIn;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-paper">
        <div className="font-sketch text-xl text-pencil-dark">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: handleSignIn,
        signOut: handleSignOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
