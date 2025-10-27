import { Link } from "react-router-dom";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useState, useEffect } from "react";
import Education from "../images/Education.jpg";
import HealthWellness from "../images/HealthWellness.jpg";
import Lifestyle from "../images/Lifestyle.jpg";
import Technology from "../images/Technology.jpg";
import Travel from "../images/Travel.jpg";

export function PostsList() {

    const { user } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const categoryImages = {
        Education,
        "Health & Wellness": HealthWellness,
        Lifestyle,
        Technology,
        Travel
    };

    const getImageForCategory = (category) => categoryImages[category] || Education;

    const postsPerPage = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);


    const { data: posts, loading: postsLoading, error: postsError } = useFetchApi("http://localhost:8000/posts");

    const { data: comments, loading: commentsLoading, error: commentsError } = useFetchApi("http://localhost:8000/comments");

    if (postsLoading) return <p>Loading...</p>;
    if (postsError) return <p>Error: {postsError}</p>;


    //const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "" || post.category === category;
        return matchesSearch && matchesCategory;
    })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);



    return (
        <>
            <div className="container mx-4">
                <div className="row">
                    <div className="col-md-8 ">

                        {filteredPosts.length > 0 ? (
                            currentPosts.map(post => {
                                const commentCount = Array.isArray(comments)
                                    ? comments.filter(comment => comment.postId === post.id).length
                                    : 0;
                                return (

                                    <div className="card my-2" key={post.id}>
                                        <div className="card-body">
                                            <img src={getImageForCategory(post.category)}
                                                class="card-img-top rounded"
                                                style={{
                                                    height: '180px',
                                                    width: '100%',
                                                }} alt={post.category}></img>

                                            <span className="authors">Author: {post.author}</span>
                                            <Link to="/postDetails" state={{ post }} className="card-title"
                                                style={{ fontWeight: "bold", textDecoration: "none" }}>
                                                {post.title}
                                            </Link><br />
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                </svg>
                                                <span style={{ fontSize: "10px" }}> {post.likes}</span> &nbsp; &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6B6B6B" aria-labelledby="response-filled-16px-desc" viewBox="0 0 16 16">
                                                    <path fill="#6B6B6B" d="M12.344 11.458A5.28 5.28 0 0 0 14 7.526C14 4.483 11.391 2 8.051 2S2 4.483 2 7.527c0 3.051 2.712 5.526 6.059 5.526a6.6 6.6 0 0 0 1.758-.236q.255.223.554.414c.784.51 1.626.768 2.512.768a.37.37 0 0 0 .355-.214.37.37 0 0 0-.03-.384 4.7 4.7 0 0 1-.857-1.958v.014z"></path>
                                                </svg>
                                                <span style={{ fontSize: "10px" }}> {commentCount} </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="card my-2">
                                <div className="card-body">
                                    <p className="text-muted">No posts available</p>
                                </div>
                            </div>
                        )}

                        {filteredPosts.length > postsPerPage && (
                            <div className="pagination mt-3 d-flex justify-content-center">
                                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`btn btn-sm mx-1 ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
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