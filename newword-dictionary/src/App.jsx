import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../UserPage/LoginPage";
import Layout from "./layout/Layout";
import MainPage from "./mainpage/MainPage";
import SlangEntryPage from "./SlangPage/SlangEntryPage/SlangEntryPage";
import SignUpPage from "../UserPage/SignUpPage/SignupPage";
import UserProfilePage from "../UserPage/UserProfilePage/UserProfilePage";
import GlobalStyle from "./components/GlobalStyle";
import ProtectedLogin from "../UserPage/components/ProtectedLogin";
import LikedSlangsPage from "../UserPage/LikeListPage/LikedSlangsPage";
import RecentQuizzesPage from "../UserPage/RecentQuizzesPage/RecentQuizzesPage";
import SlangCreatePage from "./SlangPage/SlangCreatePage/SlangCreatePage";
import SlangManagePage from "./SlangPage/SlangManagePage/SlangManagePage";
import SearchPage from "./components/SearchResults/SearchPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/slangs/:id" element={<SlangEntryPage />} />
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
                  <LikedSlangsPage />
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
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;