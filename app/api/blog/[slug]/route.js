import dbConnect from '../../../../lib/dbConnect'; // Ensure this is your database connection module
import BlogPost from '../../../../models/BlogPost'; // Import your BlogPost model

// Handle GET requests for a single BlogPost by ID
export async function GET(req, { params }) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = params; // Extract the `id` from the dynamic route

    const blogPost = await BlogPost.findById(id); // Fetch the BlogPost by ID
    if (!blogPost) {
      return new Response("BlogPost not found", { status: 404 });
    }

    return new Response(JSON.stringify(blogPost), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}
