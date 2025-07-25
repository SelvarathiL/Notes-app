document.addEventListener("DOMContentLoaded", async () => {
  await loadNotes();
});


async function loadNotes() {
  const grid = document.getElementById('notesGrid');
  grid.innerHTML = '';

  // 🔹 Always add the "Add New Note" card first
  const addCard = document.createElement('div');
  addCard.className = 'note-card add';
  addCard.textContent = '+ Add New Note';
  addCard.onclick = () => {
    window.location.href = '/addnote';
  };
  grid.appendChild(addCard); // ✅ Now always visible

  try {
    const res = await fetch('/api/notes');

    if (res.status === 401) {
      window.location.href = '/login';
      return;
    }

    if (!res.ok) {
      throw new Error('Failed to fetch notes');
    }

    const notes = await res.json();
    console.log('Fetched notes:', notes); // ✅ For debugging

    notes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.textContent = note.title;
      card.onclick = () => {
        window.location.href = `/note.html?id=${note.id}`;
      };
      grid.insertBefore(card, addCard); // ✅ Insert before the "Add" button
    });

  } catch (err) {
    console.error('Error fetching notes:', err);
    alert('Could not load your notes.');
  }
}



async function logout() {
  try {
    const res = await fetch('/api/users/logout', {
      method: 'POST'
    });
    if (res.ok) {
      window.location.href = '/login';
    } else {
      alert('Logout failed');
    }
  } catch (err) {
    alert('Logout error');
  }
}
