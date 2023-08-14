import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import TodoList from "./pages/todolist/index.jsx";
import { TodoProvider } from "./context/todoContext";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const queryClient = new QueryClient();
  const [auth, setAuth] = useState(localStorage.getItem("userToken") && true);
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TodoProvider>
          <Router>
            <Layout setAuth={setAuth}>
              <Routes>
                {auth ? (
                  <>
                    <Route path="/todolist" element={<TodoList />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Login setAuth={setAuth} />} />
                    <Route path="/register" element={<Register />} />
                  </>
                )}
              </Routes>
            </Layout>
          </Router>
        </TodoProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;
