import React, { useEffect, useState } from "react";

export const Form = ({
  editId = null,
  editPayload = { title: "", body: "" },
  setEditPayload = () => {},
  onCancelEdit = () => {},
  onUpdate = () => {},
  onAdd = () => {},
}) => {
  const [local, setLocal] = useState({ title: "", body: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editId !== null) {
      setLocal({
        title: editPayload.title ?? "",
        body: editPayload.body ?? "",
      });
    } else {
      setLocal({ title: "", body: "" });
    }
  }, [editId, editPayload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal((p) => ({ ...p, [name]: value }));

    if (editId !== null) {
      setEditPayload((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title: local.title.trim(),
      body: local.body.trim(),
    };

    try {
      if (editId !== null) {
        await onUpdate(editId, payload);
      } else {
        await onAdd(payload); // <-- POST API
      }

      setLocal({ title: "", body: "" });
    } catch (err) {
      alert("Operation failed");
    }

    setSubmitting(false);
  };

  return (
    <form className="section-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Add Title"
        value={local.title}
        onChange={handleChange}
      />

      <input
        name="body"
        placeholder="Add Body"
        value={local.body}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        {editId !== null ? (
          <>
            <button type="submit" className="btn-edit">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => {
                setLocal({ title: "", body: "" });
                onCancelEdit();
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" className="btn-edit">
            {submitting ? "Adding..." : "Add Post"}
          </button>
        )}
      </div>
    </form>
  );
};
