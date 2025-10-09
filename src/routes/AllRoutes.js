import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PostDetails } from "../pages/PostDetails";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element = {<HomePage/>} />
            <Route path="/postDetails" element={<PostDetails /> } />
        </Routes>
    );
}