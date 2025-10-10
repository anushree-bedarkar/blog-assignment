import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostDetails } from "../pages/PostDetails";
import { LoginPage } from "../pages/LoginPage";
import { CreatePost } from "../pages/CreatePost";
import { EditPost } from "../pages/EditPost";
import { Logout } from "../components/Logout";
import { Register } from "../pages/Register";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element = {<HomePage/>} />
            <Route path="/postDetails" element={<PostDetails /> } />
            <Route path="/login" element={<LoginPage /> } />
            <Route path="/create" element={<CreatePost /> } />
            <Route path="/editPost" element={<EditPost /> } />
            <Route path="/logout" element = {<Logout />} />
            <Route path="/register" element = {<Register />} />
        </Routes>
    );
}