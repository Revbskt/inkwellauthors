const xanoUploadEndpoint = "https://YOUR-XANO-URL/api/v1/book/upload";
const xanoGetBooksEndpoint = "https://YOUR-XANO-URL/api/v1/book/all";

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  try {
    const res = await fetch(xanoUploadEndpoint, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      alert("Book uploaded successfully!");
      form.reset();
      loadBooks();
    } else {
      alert("Error uploading book");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to connect to backend");
  }
});

async function loadBooks() {
  try {
    const res = await fetch(xanoGetBooksEndpoint);
    const books = await res.json();
    const container = document.getElementById("bookList");
    container.innerHTML = "<h2>Published Books</h2>";
    books.forEach(book => {
      const el = document.createElement("div");
      el.className = "book";
      el.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.description}</p>
        <img src="${book.cover_image}" alt="Cover" />
        <p><a href="${book.epub_file}" target="_blank">Download EPUB</a></p>
      `;
      container.appendChild(el);
    });
  } catch (err) {
    console.error("Failed to load books", err);
  }
}

loadBooks();