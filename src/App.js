import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import theme from "./config/theme";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="quiz" element={<Quiz />}>
            <Route path=":categoryId" element={<Quiz />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
