📌 React Posts CRUD App (Add, Edit, Delete with API)

A clean and simple React application that performs complete CRUD operations using a REST API.
Users can Add, Edit, Delete, and View posts.
The form at the top is shared for both adding new posts and editing existing posts.

🚀 Features
✅ Fetch Posts

Loads all posts from the backend API using GET.

✅ Add Post

Uses the Create Post API (POST)

Adds new data instantly to the UI

✅ Edit Post

Clicking Edit fills the form with title & body

“Add Post” becomes Save Changes

Uses Update API (PUT)

Updates UI in real-time

✅ Delete Post

Clicking Delete removes the post using DELETE API

UI updates after API success

✅ Shared Form (Add + Edit)

One form handles both actions:

Add new posts

Update selected post

🎨 Clean UI with Styling

Responsive grid layout

Smooth hover effects

Good spacing and card layout

Edit & delete buttons styled (green/red)

🛠️ Tech Stack
Tool	Usage
React	Frontend UI
Axios	API calls
REST API	Backend for CRUD
CSS	Styling UI
JavaScript (ES6)	Project logic
📁 Folder Structure
src/
│
├── api/
│   └── PostApi.jsx          # API functions (GET, POST, PUT, DELETE)
│
├── components/
│   ├── Form.jsx             # Add + Edit form
│   └── Posts.jsx            # Main CRUD logic + UI
│
├── App.jsx                  # Main App wrapper
└── App.css                  # Styles for UI

🔌 API Functions (PostApi.jsx)
export const getPost = () => axios.get(BASE_URL);
export const createPost = (payload) => axios.post(BASE_URL, payload);
export const updatePost = (id, payload) => axios.put(`${BASE_URL}/${id}`, payload);
export const deletePost = (id) => axios.delete(`${BASE_URL}/${id}`);


Change BASE_URL to your backend URL.

▶️ Installation & Setup
1. Clone the project
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

2. Install dependencies
npm install

3. Start development server
npm run dev

🧪 How It Works
➤ Add a Post

Enter a title and body in the form

Click Add Post

Data is sent to API (POST) and displayed instantly

➤ Edit a Post

Click Edit on any post

Form loads post data inside inputs

Button changes to Save Changes

Submit updates post via PUT API

➤ Delete a Post

Click Delete

API removes the post

UI updates automatically

🎨 UI Overview

Form at the top (centered)

Posts displayed below in a 3-column responsive grid

Smooth hover effects

Clean and modern card design

Green “Edit” & Red “Delete” buttons

📌 Future Enhancements (optional)

Add Toast notifications (success/error messages)

Add search bar

Add pagination

Add dark/light theme

Connect to real backend database
