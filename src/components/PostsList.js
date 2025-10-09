import { Link } from "react-router-dom";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState } from "react";

export function PostsList() {

    const {user} = useContext(AuthContext);
    const [search, setSearch] = useState(""); 
    
    const { data: posts, loading: postsLoading, error: postsError } = useFetchApi("http://localhost:8000/posts");
      
    if (postsLoading) return <p>Loading...</p>;
    if (postsError) return <p>Error: {postsError}</p>;
    

    const filteredPosts = posts.filter(post=>post.title.toLowerCase().includes(search.toLowerCase()));

    return(
        <>
            <div className="container mx-4">
                <div className="row">
                    <div className="col-md-8 ">

                    {filteredPosts.map(post => (
                        <div class="card my-2" key={post.id}>
                            <div class="card-body">
                                <span class="authors">Author: {post.author}</span>
                                <Link to="/postDetails" state={{ post }} class="card-title">
                                    {post.title}
                                </Link>
                                <span class="likes">Likes: {post.likes}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="col-md-4">
                        <div class="card my-2" >
                            <div class="card-body">
                                <div className="mb-4">
                                    <input onChange={(e)=>setSearch(e.target.value)}
                                        type="text"
                                        placeholder="Search by title..."
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        </>

    );
}