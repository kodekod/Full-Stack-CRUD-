// src/components/Posts.jsx
import React, { useEffect, useState } from "react";
import { getPost, deletePost, updatePost, createPost } from "../api/PostApi";
import { Form } from "./Form";
import "../App.css";

/**
 * Posts component
 * - Renders Form at top (handles Add & Edit)
 * - Renders list of posts below
 * - Uses API functions: getPost, createPost, updatePost, deletePost
 */
export const Posts = () => {
  const [data, setData] = useState([]); // posts list
  const [loading, setLoading] = useState(true);

  // Edit state (controlled here so Form and Posts stay in sync)
  const [editId, setEditId] = useState(null);
  const [editPayload, setEditPayload] = useState({ title: "", body: "" });

  // Fetch posts
  const getPostData = async () => {
    setLoading(true);
    try {
      const res = await getPost();
      const posts = Array.isArray(res) ? res : res?.data ?? [];
      setData(posts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CREATE
  const handleAdd = async (payload) => {
    try {
      const res = await createPost(payload);
      // prefer server response (res.data), fallback to local payload with temp id
      const newPost = res?.data ?? { id: Date.now(), ...payload };
      setData((prev) => [newPost, ...prev]);

      // scroll to posts to show new item (nice UX)
      setTimeout(() => {
        const top = document.querySelector(".section-post")?.offsetTop;
        if (top) window.scrollTo({ top: top - 12, behavior: "smooth" });
      }, 120);
    } catch (err) {
      console.error("Failed to add post:", err);
      alert("Could not add post. Try again.");
    }
  };

  // DELETE
  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await deletePost(id);
      if (res && (res.status === 200 || res.status === 204)) {
        setData((prev) => prev.filter((p) => p.id !== id));
        // if we were editing this post, cancel edit
        if (editId === id) cancelEdit();
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete post. Try again.");
    }
  };

  // Start editing: populate form via editPayload
  const startEdit = (post) => {
    setEditId(post.id);
    setEditPayload({ title: post.title ?? "", body: post.body ?? "" });
    // optional: ensure form is visible
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditPayload({ title: "", body: "" });
  };

  // UPDATE via API
  const handleUpdate = async (id, payload) => {
    const previous = [...data];
    try {
      const res = await updatePost(id, payload);
      const updatedFromServer = res?.data ?? null;

      if (updatedFromServer) {
        setData((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFromServer } : p)));
      } else if (res && (res.status === 200 || res.status === 204)) {
        // server returned success but no body — apply local payload
        setData((prev) => prev.map((p) => (p.id === id ? { ...p, ...payload } : p)));
      } else {
        throw new Error("Update failed");
      }

      // exit edit mode
      cancelEdit();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not save changes. Try again.");
      setData(previous); // revert optimistic changes if any
    }
  };

  return (
    <div className="posts-wrapper">
      {/* Form handles both Add & Edit, controlled by props */}
      <Form
        data={data}
        setData={setData}
        editId={editId}
        editPayload={editPayload}
        setEditPayload={setEditPayload}
        onCancelEdit={cancelEdit}
        onUpdate={handleUpdate}
        onAdd={handleAdd}
      />

      <section className="section-post" aria-live="polite">
        <ul>
          {loading ? (
            <li className="empty">Loading posts…</li>
          ) : data.length === 0 ? (
            <li className="empty">No posts available</li>
          ) : (
            data.map((post, index) => {
              const { id, title, body } = post;
              return (
                <li key={id ?? index}>
                  <div className="post-head">
                    <span className="post-number" aria-hidden>
                      {index + 1}
                    </span>
                    <h3 className="post-title">{title ?? "Untitled"}</h3>
                  </div>

                  <p className="post-body">{body ?? ""}</p>

                  <div className="post-flex-spacer" />

                  <div className="post-actions">
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() => startEdit(post)}
                      aria-label={`Edit post ${index + 1}`}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeletePost(id)}
                      aria-label={`Delete post ${index + 1}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
};
