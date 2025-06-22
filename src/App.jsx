import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import NotificationPage from './pages/NotificationPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import CallPage from './pages/CallPage';
import {Toaster} from "react-hot-toast";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import './App.css';
import Chatpage from "./pages/Chatpage";

const App = () => {

  const {isLoading, authUser} = useAuthUser();
  const {theme} = useThemeStore();

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded

  if(isLoading) return <div><PageLoader /></div>

  return (
    <>
      <Routes>

        <Route path="/" element={ isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={ !isAuthenticated ? "/login" : "onboarding" } />
        )} />

        <Route path="/signup" element={ !isAuthenticated ? (
          <SignUpPage />
        ) : (
          <Navigate to={isOnboarded ? "/" : "/onboarding" } />
        )} />

        <Route path="/login" element={ !isAuthenticated ? (
          <LoginPage />
        ) : (
          <Navigate to={isOnboarded ? "/" : "/onboarding" } />
        )} />

        <Route path="/notifications" element={ isAuthenticated && isOnboarded ? ( 
          <Layout showSidebar={true} >
            <NotificationPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "onboarding"} /> 
        )} />
        <Route path="/call/:id" element= {isAuthenticated && isOnboarded ? (
          <CallPage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false} >
            <Chatpage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route 
          path="/onboarding" 
          element={ isAuthenticated ? (
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/login" />
          )
        } />
        

      </Routes>
      <Toaster />
    </>
  )
}

export default App
