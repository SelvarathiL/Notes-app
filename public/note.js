const noteId = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", loadNote);

async function loadNote() {
  try {
    const res = await fetch(`/api/notes/${noteId}`);
    if (res.status === 401) {
      showMessage("Session expired. Please log in again.", true);
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }

    if (!res.ok) throw new Error("Note not found");

    const note = await res.json();
    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
    document.getElementById("datetime").textContent = new Date(note.updated_at).toLocaleString();

    document.getElementById("editBtn").onclick = enableEdit;
    document.getElementById("deleteBtn").onclick = () => {
      document.getElementById("deleteConfirmBox").style.display = "block";
    };
    document.getElementById("saveBtn").onclick = updateNote;

  } catch (err) {
    showMessage("Failed to load note.", true);
    setTimeout(() => window.location.href = "/dashboard", 2000);
  }
}

function enableEdit() {
  document.getElementById("title").disabled = false;
  document.getElementById("content").disabled = false;
  document.getElementById("saveBtn").style.display = "inline-block";
}

async function updateNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    showMessage("Title and content cannot be empty.", true);
    return;
  }

  try {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      showMessage("✅ Note updated successfully!");
      document.getElementById("title").disabled = true;
      document.getElementById("content").disabled = true;
      document.getElementById("saveBtn").style.display = "none";
    } else {
      showMessage("❌ Failed to update note.", true);
    }
  } catch {
    showMessage("⚠️ Error updating note.", true);
  }
}

function showMessage(msg, isError = false) {
  const box = document.getElementById("messageBox");
  box.textContent = msg;
  box.style.color = isError ? "red" : "green";
  setTimeout(() => {
    box.textContent = "";
  }, 3000);
}

async function confirmDelete(confirm) {
  document.getElementById("deleteConfirmBox").style.display = "none";

  if (!confirm) return;

  try {
    const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
    if (res.ok) {
      showMessage("🗑️ Note deleted.");
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } else {
      showMessage("❌ Failed to delete note.", true);
    }
  } catch {
    showMessage("⚠️ Error deleting note.", true);
  }
}
