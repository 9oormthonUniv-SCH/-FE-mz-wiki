import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../UserPage/LoginPage";
import Layout from "./layout/Layout";
import MainPage from "./mainpage/MainPage";
import EntryPage from "./WordPage/EntryPage";
import SignupPage from "../UserPage/SignupPage";
import UserProfilePage from "../UserPage/UserProfilePage";
import GlobalStyle from "./components/GlobalStyle";
import ProtectedLogin from "../UserPage/components/ProtectedLogin";
import LikeListPage from "../UserPage/LikeListPage";
import RecentQuizzesPage from "../UserPage/RecentQuizzesPage";
import SlangCreatePage from "./WordPage/SlangCreatePage";
import SlangManagePage from "./WordPage/SlangManagePage";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/slangs/:id" element={<EntryPage />} />
            <Route
              path="/user"
              element={
                <ProtectedLogin>
                  <UserProfilePage />
                </ProtectedLogin>
              }
            />
            <Route
              path="/user/recent-quiz"
              element={
                <ProtectedLogin>
                  <RecentQuizzesPage />
                </ProtectedLogin>
              }
            />
            <Route
              path="/user/liked"
              element={
                <ProtectedLogin>
                  <LikeListPage />
                </ProtectedLogin>
              }
            />
            <Route
              path="/slangs/create"
              element={
                <ProtectedLogin>
                  <SlangCreatePage />
                </ProtectedLogin>
              }
            />
            <Route
              path="/slangs/manage"
              element={
                <ProtectedLogin>
                  <SlangManagePage />
                </ProtectedLogin>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;