const xanoBase = "https://YOUR-XANO-URL/api/v1";

const uploadForm = document.getElementById("uploadForm");
if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    const res = await fetch(`${xanoBase}/book`, {
      method: "POST",
      body: formData,
    });
    const status = document.getElementById("uploadStatus");
    if (res.ok) {
      status.textContent = "✅ Book uploaded successfully!";
      uploadForm.reset();
    } else {
      status.textContent = "❌ Upload failed. Check the fields.";
    }
  });
}

const bookList = document.getElementById("bookList");
if (bookList) {
  fetch(`${xanoBase}/book/all`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        bookList.innerHTML = "<p>No books available.</p>";
        return;
      }
      bookList.innerHTML = "";
      data.forEach(book => {
        const el = document.createElement("div");
        el.className = "book";
        el.innerHTML = `
          <h2>${book.title}</h2>
          <p>${book.description}</p>
          ${book.cover_image ? `<img src="${book.cover_image}" alt="Cover" />` : ""}
          ${book.epub_file ? `<p><a href="${book.epub_file}" target="_blank">Download EPUB</a></p>` : ""}
        `;
        bookList.appendChild(el);
      });
    })
    .catch(err => {
      bookList.innerHTML = "<p>Failed to load books.</p>";
      console.error(err);
    });
}