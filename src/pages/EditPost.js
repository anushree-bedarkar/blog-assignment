import { useLocation, useNavigate } from "react-router-dom";
import { useTriggerApi } from "../hooks/UseTriggerApi";
import { useState } from "react";
 
export const EditPost = () => {
  const navigate = useNavigate();
  const { trigger } = useTriggerApi();
  const location = useLocation();
  const { post } = location.state || {};
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "");
  const [loading, setLoading] = useState(false);
 
  if (!post) return <p>No post data available.</p>;
 
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedPost = { ...post, title, content, category, date: new Date().toISOString() };
    const result = await trigger(
      `http://localhost:8000/posts/${post.id}`,
      "PUT",
      updatedPost
    );
    setLoading(false);
    if (result) {
      console.log("Post updated successfully!");
      navigate("/");
    }
  };
 
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await trigger(
      `http://localhost:8000/posts/${post.id}`,
      "DELETE"
    );
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
                background-color: #f3f4f6;
                min-height: 100vh;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            }
 
            .heading {
                background: #fff;
                padding: 28px 38px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
                margin-bottom: 18px;
            }
 
            .heading h2 {
                font-size: 1.7rem;
                margin-bottom: 18px;
                color: #222;
                font-weight: 700;
                text-align: center;
            }
 
            .createPost {
                display: flex;
                flex-direction: column;
                background: #fff;
                padding: 32px 38px;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                max-width: 600px;
                width: 100%;
            }
 
            .createPost label {
                font-size: 1.2rem;
                font-weight: 500;
                margin-bottom: 7px;
                color: #333;
            }
 
            .createPost input.title,
            .createPost textarea.description {
                width: 100%;
                padding: 12px 14px;
                margin-bottom: 22px;
                border: 1px solid #cbd5e1;
                border-radius: 6px;
                font-size: 1rem;
                transition: border-color 0.2s, box-shadow 0.2s;
                background: #f9fafb;
            }
 
            .createPost input.title:focus,
            .createPost textarea.description:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
                outline: none;
                background: #fff;
            }
 
            .createPost textarea.description {
                min-height: 120px;
                resize: vertical;
            }
            .createPost select.title {
              width: 100%;
              padding: 12px 14px;
              margin-bottom: 22px;
              border: 1px solid #cbd5e1;
              border-radius: 6px;
              font-size: 1rem;
              transition: border-color 0.2s, box-shadow 0.2s;
              background: #f9fafb;
              appearance: none;
            }
 
            .createPost select.title:focus {
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
              outline: none;
              background: #fff;
            }
 
            .buttonGroup {
                display: flex;
                gap: 16px;
                margin-top: 8px;
            }
 
            .editButton {
                background-color: #2563eb;
                color: #fff;
                font-size: 1rem;
                font-weight: 600;
                padding: 12px 0;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                flex: 1;
                transition: background-color 0.2s, transform 0.1s;
            }
 
            .editButton:hover:not(:disabled) {
                background-color: #1e40af;
                transform: translateY(-1px);
            }
 
            .editButton:disabled {
                background-color: #9ca3af;
                cursor: not-allowed;
            }
 
            .deleteButton {
                background-color: #ef4444;
                color: #fff;
                font-size: 1rem;
                font-weight: 600;
                padding: 12px 0;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                flex: 1;
                transition: background-color 0.2s, transform 0.1s;
            }
 
            .deleteButton:hover:not(:disabled) {
                background-color: #b91c1c;
                transform: translateY(-1px);
            }
 
            .deleteButton:disabled {
                background-color: #fca5a5;
                cursor: not-allowed;
            }
        `}</style>
      <section className="create">
        <form className="createPost" onSubmit={handleEdit}>
          <h2 className="text-center">Edit Post</h2>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            className="title"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Health & Wellness">Health & Wellness</option>
          </select>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="content">Description: </label>
          <textarea
            id="content"
            className="description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
 
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
      </section>
    </>
  );
};