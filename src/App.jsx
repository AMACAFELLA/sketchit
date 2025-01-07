import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import HowToPlay from "./pages/HowToPlay";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./aws-config";
import ProtectedRoute from "./components/ProtectedRoute";
import { Link } from "react-router-dom";

const AppContent = () => {
  const navigate = useNavigate();

  return (
    <Authenticator
      initialState="signUp"
      components={{
        Header() {
          return (
            <div className="text-center p-8">
              <Link to="/" className="font-sketch text-4xl text-pencil-dark">
                Sketch It!
              </Link>
            </div>
          );
        }
      }}
      className="bg-paper"
      formFields={{
        signIn: {
          username: {
            placeholder: "Enter your username",
            isRequired: true,
          },
          password: {
            placeholder: "Enter your password",
            isRequired: true,
          },
        },
        signUp: {
          username: {
            placeholder: "Choose a username",
            isRequired: true,
          },
          password: {
            placeholder: "Create a password",
            isRequired: true,
          },
          email: {
            placeholder: "Enter your email",
            isRequired: true,
          },
        },
      }}
      variation="modal"
      theme={{
        name: "sketch-theme",
        tokens: {
          colors: {
            background: {
              primary: "#f7f1e3",
              secondary: "#ffffff",
            },
            font: {
              interactive: "#2d3436",
            },
            brand: {
              primary: {
                10: "#2d3436",
                80: "#2d3436",
                90: "#2d3436",
                100: "#2d3436",
              },
            },
          },
          components: {
            button: {
              primary: {
                backgroundColor: "#2d3436",
                _hover: {
                  backgroundColor: "#636e72",
                },
              },
            },
            tabs: {
              item: {
                _focus: {
                  color: "#2d3436",
                },
              },
            },
            textfield: {
              _focus: {
                borderColor: "#2d3436",
              },
            },
          },
        },
      }}
    >
      {({ signOut, user }) => (
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
            path="/how-to-play"
            element={
              <ProtectedRoute>
                <HowToPlay />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </Authenticator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
