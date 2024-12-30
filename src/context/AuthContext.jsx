import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

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
            console.log('Current user:', currentUser);
            setUser({
                userId: currentUser.userId,
                username: currentUser.username,
                ...currentUser
            });
        } catch (error) {
            console.error('Auth check error:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const handleSignIn = async (username, password) => {
        try {
            const user = await signIn({ username, password });
            await checkUser(); // Refresh user data after sign in
            return user;
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            setUser(null);
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading, 
                signIn: handleSignIn, 
                signOut: handleSignOut 
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};