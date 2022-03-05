import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { useContext } from "react";
import AuthContext from "./store/auth-contex";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import theme from "./config/theme";
import AuthPage from "./pages/AuthPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="auth" element={<AuthPage />} />
        </Route>
        {authCtx.isLoggedIn ? (
          <Route path="/" element={<Layout />}>
            {authCtx.isLoggedIn && <Route index element={<Home />} />}
            {authCtx.isLoggedIn && (
              <Route path="profile" element={<Profile />} />
            )}
            {authCtx.isLoggedIn && (
              <Route path="quiz" element={<Quiz />}>
                <Route path=":categoryId" element={<Quiz />} />
              </Route>
            )}
          </Route>
        ) : (
          <Route path="/" element={<AuthPage />} />
        )}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
