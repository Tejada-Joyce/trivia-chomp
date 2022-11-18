import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import AuthContext from "./store/auth-contex";
import Layout from "./components/layout/Layout";
import theme from "./config/theme";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Quiz = lazy(() => import("./pages/Quiz"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Suspense
          fallback={
            <div style={{ textAlign: "center" }}>
              <Spinner size="xl" />
            </div>
          }
        >
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
        </Suspense>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
