import { useState, useContext } from "react";
import { useTriggerApi } from "../hooks/UseTriggerApi";
import { useFetchApi } from "../hooks/UseFetchApi";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export function PostEdit() {
    const navigate = useNavigate();
    const { trigger } = useTriggerApi();
    const location = useLocation();
    const { post } = location.state || {};
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [loading, setLoading] = useState(false);
 
    if (!post) return <p>No post data available.</p>;
 
    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedPost = { ...post, title, content };
        const result = await trigger(`http://localhost:8000/posts/${post.id}`,"PUT",updatedPost);
        setLoading(false);
        if (result) {
            console.log("Post updated successfully!");
            navigate("/");
        }
    };
 
    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await trigger(`http://localhost:8000/posts/${post.id}`,"DELETE");
        setLoading(false);
        if (result) {
            console.log("Post deleted successfully!");
            navigate("/");
        }
    };

  return (
    <>
      <style>{`
        .create {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px 20px;
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .heading {
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 600px;
        }

        .heading h4 {
          font-size: 1.6rem;
          margin-bottom: 20px;
          color: #333;
          font-weight: 600;
          text-align: center;
        }

        .createPost {
          display: flex;
          flex-direction: column;
        }

        .createPost label {
          font-size: 0.95rem;
          font-weight: 500;
          margin-bottom: 6px;
          color: #444;
        }

        .createPost input.title,
        .createPost textarea.description {
          width: 100%;
          padding: 12px 14px;
          margin-bottom: 20px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .createPost input.title:focus,
        .createPost textarea.description:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
          outline: none;
        }

        .createPost textarea.description {
          min-height: 120px;
          resize: vertical;
        }

        .createPost button {
          background-color: #2563eb;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
        }

        .createPost button:hover:not(:disabled) {
          background-color: #1e40af;
          transform: translateY(-1px);
        }

        .createPost button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>

      <section className="create">
        <div className="heading">
          <h4>Edit Post</h4>
          <form className="createPost">
            <label>Title: </label>
            <input
              type="text"
              placeholder="title"
              className="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br /><br />
            <label>Description: </label>
            <textarea
              placeholder="description"
              value={content}
              className="description"
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <br />
            <div className="buttonGroup">
              <button type="submit" className="editButton" disabled={loading}>
                {loading ? "Saving..." : "Edit"}
              </button>
              <button
                type="button"
                className="deleteButton"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}