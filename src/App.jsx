import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import Multiplayer from "./pages/Multiplayer";
import MultiplayerGame from "./pages/MultiplayerGame";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { MultiplayerProvider } from "./context/MultiplayerContext";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./aws-config";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Authenticator
          initialState="signUp"
          components={{
            SignUp: {
              FormFields() {
                return (
                  <>
                    <Authenticator.SignUp.FormFields />
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </>
                );
              },
            },
          }}
          services={{
            async validateCustomSignUp(formData) {
              if (!formData.email) {
                return {
                  email: "Email is required",
                };
              }
            },
          }}
          signUpAttributes={["email", "username"]}
        >
          <MultiplayerProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/game"
                element={
                  <ProtectedRoute>
                    <Game />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/gallery" 
                element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/multiplayer"
                element={
                  <ProtectedRoute>
                    <Multiplayer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/game/multiplayer/:gameId"
                element={
                  <ProtectedRoute>
                    <MultiplayerGame />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MultiplayerProvider>
        </Authenticator>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;