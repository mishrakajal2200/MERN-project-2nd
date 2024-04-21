import { Route, Routes, BrowserRouter } from "react-router-dom";

import UserProfile from "./Components/UserProfile";
import Home from "./Components/Home";
import LoginForm from "./Components/LoginForm";
import BringCards from "./Components/BringCards";
import Layout from "./Components/Layout";
import SignupForm from "./Components/Signupform";
import ImageUpload from "./Components/ImageUpload";
import EmailResponse from "./Components/EmailResponse";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" Component={SignupForm} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/profile" Component={UserProfile} />
        <Route path="/upload" Component={ImageUpload} />
        <Route path="/cards" Component={BringCards} />
        <Route path="/layout" Component={Layout} />
        <Route path="/email" Component={EmailResponse} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
