import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/routes/PrivateRoute"
import PublicRoute from "./components/routes/PublicRoute"
import Header from "./components/header_navs/Header"
import LandingPage from "./components/pages/LandingPage"
import PrivateNavbar from "./components/header_navs/PrivateNavbar"
import HomePage from "./components/pages/HomePage"
import ContactsPage from "./components/pages/ContactsPage"
import TodosPage from "./components/pages/TodosPage"
import PostsPage from "./components/pages/PostsPage"

function App() {
  return (
    <div className="app-div">
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LandingPage />} path="/" />
        </Route>
        <Route element={<PrivateRoute />} >
          <Route element={<PrivateNavbar />}>
            <Route element={<HomePage />} path="/home" />
            <Route element={<ContactsPage />} path="/contacts" />
            <Route element={<TodosPage />} path="/todos" />
            <Route element={<PostsPage />} path="/posts" />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
