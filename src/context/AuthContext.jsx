import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";
import { playerService } from "../services/dynamodb/playerService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log('Checking current user:', currentUser);
      
      if (!currentUser) {
        console.log('No current user found');
        setUser(null);
        return null;
      }

      const attributes = await fetchUserAttributes();
      console.log('User attributes:', attributes);

      const userData = {
        userId: currentUser.userId,
        username: currentUser.username,
        email: attributes.email,
        ...attributes,
      };

      // Check if player exists, create if not
      try {
        let player = await playerService.getPlayer(userData.userId);
        if (!player) {
          console.log('Creating new player record for:', userData.userId);
          player = await playerService.createPlayer(userData.userId, userData.username);
        }
      } catch (error) {
        console.error('Error checking/creating player:', error);
      }

      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      return null;
    }
  }, []);

  // Initial auth check
  useEffect(() => {
    const initAuth = async () => {
      await checkUser();
      setLoading(false);
    };
    initAuth();
  }, [checkUser]);

  const handleSignIn = async (username, password) => {
    try {
      const { isSignedIn } = await signIn({ username, password });
      if (isSignedIn) {
        const userData = await checkUser();
        return { isSignedIn, userData };
      }
      return { isSignedIn, userData: null };
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
        checkUser,
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
