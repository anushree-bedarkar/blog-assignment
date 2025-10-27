import { useLocation, useNavigate } from "react-router-dom";
import { useTriggerApi } from "../hooks/UseTriggerApi";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

export function CommentsList() {

    const navigate = useNavigate();
    
    const { trigger } = useTriggerApi();
    const location = useLocation();
    const { post } = location.state;
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(post?.likes || 0);
    const [errorLike, setErrorLike] = useState("");
    const [errorComment, setErrorComment] = useState("");

    const { 
            data: comments, 
            loading: commentsLoading, 
            error: commentsError,
            refetch: refetchComments
        } = useFetchApi("http://localhost:8000/comments");
        
    if (comments) console.log("loading", comments);
    if (commentsLoading) return <p>Loading...</p>;
    if (commentsError) return <p>Error: {commentsError}</p>;

    return (
        <>
            <div className="container mx-4">
                <div className="row">
                    <div className="col-md-8 ">

                        {comments.length > 0 ? (
                            <ul class="list-group list-group-flush">
                            {comments
                                .filter(comment => (comment.postId) === (post.id))
                                .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                                .map(comment => (
                                    <li key={comment.id} class="list-group-item">{comment.text}</li>
                                ))}
                            </ul>
                        ) : (
                            <div className="card my-2">
                                <div className="card-body">
                                    <p className="text-muted">No Comments available</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </>

    );
}