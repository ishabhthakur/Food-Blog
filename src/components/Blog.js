import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import altogic from "../helpers/altogic";

const BlogList = () => {
  // Title state for adding blog
  const [title, setTitle] = useState("");

  // Content state for adding blog
  const [content, setContent] = useState("");

  // Blogs state to store retrieved blgo posts from the Altogic
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    // Since the fetching blog process works asynchronous;
    // We will define new async function and call it normally in the useEffect
    const getBlogs = async () => {
      // We can fetch all the instances in the database by calling altogic.db.model().get() function
      const result = await altogic.db.model("blogs").get();

      // It there are no error message set the blogs state with the retrieved data
      if (!result.errors) {
        setBlogs(result.data);
      }
    };
    getBlogs();
  }, []);

  // This function will be triggered by submitting the Create Blog Post form on the UI.
  const createBlogPost = async (event) => {
    event.preventDefault();

    // We can create an instance in the database by calling altogic.db.model().object().create() function
    const result = await altogic.db.model("blogs").object().create({
      title: title,
      content: content,
    });

    // If we create an blog post instance in the database successfully, we update our blogs state by appending the new blog post.
    if (!result.errors) {
      setBlogs([...blogs, result.data]);
    }
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div class="h-20 bg-gradient-to-r from-purple-500 to-pink-500"><h1 class="font-medium font-mono font-extrabold text-6xl leading-tight text-5xl mt-0 mb-2 text-white">Food Blogs</h1>
      </div>
      <div className="justify-center flex mb-5 h-1920 bg-amber-400 hover:bg-emerald-400">
        <div className="border border-8 border-indigo-600 rounded p-3 w-96 my-4 ">
          {/* Form structure to get the created blog post data from the user. 
          When the form is submitted, createBlogPost() function will be triggered.*/}
          <form onSubmit={createBlogPost} className="text-left">
            <div>
              <label className="text-2xl text-red-600" >Blog Title</label>
              <div>
                <input
                  className="flex flex-row items-center py-16"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
            <h2 class="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">Add your thoughts here!</h2>
              <label className="text-2xl text-red-600">Blog Content</label>
              <div>
                <textarea
                  className="border rounded mb-2 w-full text-sm h-24"
                  type="text"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button 
                class="btn info"
                type="submit"
                className="text-sm bg-blue-600 p-1 rounded text-white w-full"
                disabled={title === ""}
              >
                Create Blog Post
              </button>
            </div>
          </form>
          
        </div>
      </div>
      <img src="bread.jpg" class="max-w-full h-auto" alt="..." />
      
      <h2 class="text-3xl">Blog Posts</h2>
      <div className="grid grid-cols-3 m-3 px-12">
        {/* We will list blog post by mapping the blogs array state in here */}
        {blogs
          ? blogs.map((blog) => {
              return (
                <div key={blog._id} className="border rounded p-3 m-1 bg-white">
                  {/* Redirects user to the blog post's special page by clicking on it. */}
                  <Link to={`/blog/${blog._id}`}>
                    <div className="text-sm truncate">{blog.title}</div>
                    <div className="text-gray-400 text-sm truncate">
                      {blog.content}
                    </div>
                    <div className="text-right text-xs my-1 text-gray-400 truncate">
                      {blog.createdAt}
                    </div>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white max-w-sm">
    <a href="#!">
      <img class="rounded-t-lg" src="ch.jpg" alt=""/>
    </a>
    <div class="p-6">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Chicken Katsu</h5>
      <p class="text-gray-700 text-base mb-4">
      Juicy, tender chicken, with crispy panko breadcrumbs on the outside, fluffy rice and crunchy cabbage.
       It's a super easy dream meal!
      </p>
      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Know more!</button>
    </div>
  </div>
</div>
      <div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white max-w-sm">
    <a href="#!">
      <img class="rounded-t-lg" src="th.jpg" alt=""/>
    </a>
    <div class="p-6">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Thai Basil Chicken</h5>
      <p class="text-gray-700 text-base mb-4">
      This quick and easy Thai classic is a just-the-right-spiciness stir fry that's an incredible taste payoff for minimal work.

      </p>
      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Know more!</button>
    </div>
  </div>
</div>
      <div class="flex justify-center">
  <div class="rounded-lg shadow-lg bg-white max-w-sm">
    <a href="#!">
      <img class="rounded-t-lg" src="re.jpg" alt=""/>
    </a>
    <div class="p-6">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Pretzels</h5>
      <p class="text-gray-700 text-base mb-4">
      Traditional soft German pretzels for all your Oktoberfest needs (kneads!).
      </p>
      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Know more!</button>
    </div>
  </div>
</div>
    </>
  );
};

export default BlogList;