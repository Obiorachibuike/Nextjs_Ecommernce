import dbConnect from "../../lib/dbConnect";
import BlogPost from "../../models/BlogPost";

// Handle GET requests
export async function GET(req, { params }) {
  
  
  try {
    await dbConnect(); // Ensure the database is connected
      console.log("Connected")
 
   
    

    const blogPosts = await BlogPost.find(); // Fetch all blog posts
    return new Response(JSON.stringify(blogPosts), { status: 200 });
    console.log(blogPosts)
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// Handle POST requests
export async function POST(req) {
  await dbConnect(); // Ensure the database is connected

  try {
    const data = await req.json(); // Extract data from the request body
    const newBlogPost = new BlogPost(data);
    await newBlogPost.save(); // Save the new blog post
    return new Response(JSON.stringify(newBlogPost), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// Handle PUT requests
export async function PUT(req, { params }) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = params;
    const data = await req.json(); // Extract data from the request body
    const blog = await BlogPost.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return new Response("Blog not found", { status: 404 });
    }
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

// Handle DELETE requests
export async function DELETE(req, { params }) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = params;
    const deletedBlog = await BlogPost.deleteOne({ _id: id });

    if (!deletedBlog.deletedCount) {
      return new Response("Blog not found", { status: 404 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}
