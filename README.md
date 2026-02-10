# ⚡ React CRUD App — API Edit / Delete / PUT

A fully functional React application demonstrating **Create, Read, Update, and Delete (CRUD)** operations using REST API calls with `fetch` / `axios`. Built with a clean component structure and modern React patterns.

🔗 **Live Demo:** [react-api-edit-delete-put.vercel.app](https://react-api-edit-delete-put.vercel.app/)

---

## 📸 Preview

> A responsive, interactive list-based UI where users can:
> - 📋 **Read** items fetched from a REST API
> - ✏️ **Edit** existing items using a PUT request
> - 🗑️ **Delete** items with a DELETE request
> - ➕ **Create** new items with a POST request

---

## 🚀 Features

- ✅ Fetch and display data from a public/mock REST API
- ✅ Edit items inline or via a modal — sends a `PUT` request
- ✅ Delete items — sends a `DELETE` request
- ✅ Add new items — sends a `POST` request
- ✅ Responsive and clean UI
- ✅ Loading and error state handling
- ✅ Component-based architecture

---

## 🛠️ Tech Stack

| Technology     | Purpose                         |
|----------------|---------------------------------|
| React          | UI framework                    |
| JavaScript (ES6+) | Core logic                   |
| Fetch API / Axios | HTTP requests               |
| CSS / Tailwind | Styling                         |
| Vercel         | Deployment                      |



## ⚙️ Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/react-api-edit-delete-put.git

# 2. Navigate into the project
cd react-api-edit-delete-put

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will run at `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

---

## 🌐 API Reference

This app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a mock REST API.

| Method   | Endpoint              | Description              |
|----------|-----------------------|--------------------------|
| `GET`    | `/posts`              | Fetch all items          |
| `POST`   | `/posts`              | Create a new item        |
| `PUT`    | `/posts/:id`          | Update an item by ID     |
| `DELETE` | `/posts/:id`          | Delete an item by ID     |

> ⚠️ JSONPlaceholder is a **fake API** — changes are simulated and not persisted.

---

## 💡 Key Concepts Demonstrated

### GET — Fetching Data
```js
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
```

### POST — Creating an Item
```js
const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Post', body: 'Content here', userId: 1 }),
});
const newItem = await res.json();
```

### PUT — Updating an Item
```js
const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id, title: 'Updated Title', body: 'Updated body', userId: 1 }),
});
const updated = await res.json();
```

### DELETE — Removing an Item
```js
await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
});
```

---

## 🧪 Running Tests

```bash
npm run test
```

> Tests cover API calls, component rendering, and user interactions.

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` or `build/` folder.

---

## 🚀 Deployment

This project is deployed on **Vercel**.

To deploy your own copy:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com).

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the free mock API
- [Vercel](https://vercel.com/) for hosting
- [React](https://react.dev/) for the UI framework
