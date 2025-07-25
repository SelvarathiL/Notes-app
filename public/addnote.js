document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  document.getElementById("datetime").textContent = now.toLocaleString();
});

async function saveNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    return alert("Title and content cannot be empty.");
  }

  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (res.ok) {
    window.location.href = "/dashboard";
  } else {
    alert("Failed to save note.");
  }
}

function showCancelPopup() {
  document.getElementById("confirmOverlay").style.display = "flex";
}

function hideCancelPopup() {
  document.getElementById("confirmOverlay").style.display = "none";
}

function confirmCancel() {
  window.location.href = "/dashboard";
}
