import { Link } from "react-router-dom";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState } from "react";

export function PostsList() {

    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const { data: posts, loading: postsLoading, error: postsError } = useFetchApi("http://localhost:8000/posts");

    if (postsLoading) return <p>Loading...</p>;
    if (postsError) return <p>Error: {postsError}</p>;


    //const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "" || post.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <div className="container mx-4">
                <div className="row">
                    <div className="col-md-8 ">

                        {filteredPosts.length > 0 ? (
                            filteredPosts.map(post => (
                                <div className="card my-2" key={post.id}>
                                    <div className="card-body">
                                        <span className="authors">Author: {post.author}</span>
                                        <Link to="/postDetails" state={{ post }} className="card-title">
                                            {post.title}
                                        </Link><br />
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                            </svg> &nbsp;
                                            <span style={{ fontSize: "10px" }}>{post.likes}</span>
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="card my-2">
                                <div className="card-body">
                                    <p className="text-muted">No posts available</p>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="col-md-4">
                        <div class="card my-2" >
                            <div class="card-body">
                                <div className="mb-4">
                                    <input onChange={(e) => setSearch(e.target.value)}
                                        type="text"
                                        placeholder="Search by title..."
                                        className="form-control" />
                                </div>
                                <div class="my-3">
                                    <select
                                        id="category"
                                        class="form-select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Search by category</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Education">Education</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Health & Wellness">Health & Wellness</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}