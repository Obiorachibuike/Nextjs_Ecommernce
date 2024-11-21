import dbConnect from '../../../../lib/dbConnect'; // Ensure this is your database connection module
import Product from '../../../../models/Product'; // Import your Product model

// Handle GET requests for a single product by ID
export async function GET(req, { params }) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = params; // Extract the `id` from the dynamic route

    const product = await Product.findById(id); // Fetch the product by ID
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}
