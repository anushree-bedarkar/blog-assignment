import { useLocation, useNavigate } from "react-router-dom";
import { useTriggerApi } from "../hooks/UseTriggerApi";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";


export const PostDetails = () => {
    
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const { trigger } = useTriggerApi();
    const location = useLocation();
    const { post } = location.state;
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(post?.likes || 0);
    const [errorLike, setErrorLike] = useState("");
    const [errorComment, setErrorComment] = useState("");

    const hasLiked = user?.email && post.likedBy?.includes(user.email);


    const [commentText, setCommentText] = useState("");

    const { data: comments, loading: commentsLoading, error: commentsError } = useFetchApi("http://localhost:8000/comments");
    if (comments) console.log("loading", comments);
    if (commentsLoading) return <p>Loading...</p>;
    if (commentsError) return <p>Error: {commentsError}</p>;
    
    
    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await trigger(`http://localhost:8000/posts/${post.id}`,"DELETE");
        setLoading(false);
        if (result) {
            console.log("Post deleted successfully!");
            navigate("/");
            return;
        }
    };

    const handleLike = async (e) => {
        e.preventDefault(); 
        if (!user?.email) {
            setErrorLike("Please sign in first.");
            return;
        }
        
        if (post.likedBy?.includes(user.email)) {
            console.log("You've already liked this post.");
            navigate("/");
            return;
        }
        
        const newLikes = likes + 1;
        setLikes(newLikes);
      
        const updatedPost = { ...post, 
            likes: newLikes, 
            likedBy: [...(post.likedBy || []), user.email]
        };
        const result = await trigger(`http://localhost:8000/posts/${post.id}`,"PUT",updatedPost);
    
        if (result) {
          console.log("Post updated successfully!");
          navigate("/");
          return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
      
        if (!user?.email) {
            setErrorComment("Please sign in first.");
            return;
        }
        console.log(post.id);
        const newComment = { 
            text: commentText, 
            postId: post.id };
        console.log(newComment);
        const result = await trigger("http://localhost:8000/comments", "POST", newComment);
        if (result) {
            console.log("Comment created successfully!");
            navigate("/");
            return;
        }
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div class="card my-2" >

                            <div class="card-body">
                                <h5 class="card-title">{post.title}</h5>
                                <p class="card-text">{post.content}</p>

                                <div class="d-flex justify-content-between">
                                    <div>
                                        <button type="button" 
                                        onClick={handleLike}
                                        class="btn btn-primary  ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                            </svg> Like
                                        </button>
                                        {errorLike && <p style={{ color: 'red' }}>{errorLike}</p>}
 
                                    </div>

                                    {
                                        user && user.name === post.author ? 
                                        <div>
                                        <button type="button" 
                                        onClick={() => navigate("/editPost", { state: { post } })}
                                        class="btn btn-success me-2 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                        </button>
                                        <button type="button" onClick={handleDelete} class="btn btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                            </svg>
                                        </button>
                                    </div> : <div></div>
                                    }
                                    

                                </div>


                                <ul class="list-group list-group-flush">
                                    {comments
                                        .filter(comment => (comment.postId) === (post.id))
                                        .map(comment => (
                                            <li key={comment.id} class="list-group-item">{comment.text}</li>
                                        ))}
                                </ul>
                                <hr class="divider"></hr>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="content" className="form-label">
                                            Comment
                                        </label>
                                        <textarea
                                            name="content"
                                            rows="2"
                                            className="form-control"
                                            value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                                    </div>
                                    <div className="text-center">

                                        <button
                                            type="submit"
                                            className="btn btn-success">
                                            Add Comment
                                        </button>
                                        {errorComment && <p style={{ color: 'red' }}>{errorComment}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}