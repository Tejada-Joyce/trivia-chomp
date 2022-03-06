import { ChakraProvider } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
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
  console.log(authCtx);
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Routes>
          {authCtx.isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz" element={<Quiz />}>
                <Route path=":categoryId" element={<Quiz />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate replace to="/auth" />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<Navigate replace to="/auth" />} />
            </>
          )}
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
