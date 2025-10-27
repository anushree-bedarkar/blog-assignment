import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTriggerApi } from "../hooks/UseTriggerApi";
import { AuthContext } from "../components/AuthContext";

 
export const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { trigger, loading } = useTriggerApi();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
 
  const handleCreate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      category,
      likes: 0,
      author: user?.name || "Anonymous",
      date: new Date().toISOString()
    };
    const result = await trigger(
      "http://localhost:8000/posts",
      "POST",
      newPost
    );
    if (result) {
      console.log("Post created successfully!");
      navigate("/");
    }
  };
 
return (
    <>
        <style>{`
                    .heading select.title {
                        width: 100%;
                        padding: 12px 14px;
                        margin-bottom: 22px;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        font-size: 1rem;
                        transition: border-color 0.2s, box-shadow 0.2s;
                        background: #f9fafb;
                        appearance: none;
                        color: #222;
                    }
 
                    .heading select.title:focus {
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
                        outline: none;
                        background: #fff;
                        color: #222; /* Ensure font color stays black on focus */
                    }
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
                            background: #fff;
                            padding: 30px 40px;
                            border-radius: 10px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                            width: 100%;
                            max-width: 600px;
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
                    }
                    .createPost label,
                    .heading label {
                            font-size: 1.1rem;
                            font-weight: 500;
                            margin-bottom: 7px;
                            color: #333;
                            display: block;
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
                            color: #222; /* Set font color to black */
                    }
                    .createPost input.title:focus,
                    .createPost textarea.description:focus {
                            border-color: #2563eb;
                            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
                            outline: none;
                            background: #fff;
                            color: #222; /* Ensure font color stays black on focus */
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
                            transition: background-color 0.2s, transform 0.1s;
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
                <h2>Create Post</h2>
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
 
                <form className="createPost" onSubmit={handleCreate}>
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
 
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </section>
    </>
);
};