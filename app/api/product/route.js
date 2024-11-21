import dbConnect from '../../lib/dbConnect'; // Ensure this is your database connection module
import Product from '../../models/Product'; // Import your Product model

// Handle GET requests for all products
export async function GET(req) {
  await dbConnect(); // Ensure the database is connected

  try {
    const products = await Product.find(); // Fetch all products
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}

// Handle POST requests to create a new product
export async function POST(req) {
  await dbConnect(); // Ensure the database is connected

  try {
    const data = await req.json(); // Parse the request body
    const newProduct = new Product(data);
    await newProduct.save(); // Save the new product
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}

// Handle PUT requests to update a product
export async function PUT(req) {
  await dbConnect(); // Ensure the database is connected

  try {
    const data = await req.json(); // Parse the request body
    const id = data.id; // Assuming `id` is passed in the request body

    if (!id) {
      return new Response("Product ID is required for update", { status: 400 });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}

// Handle DELETE requests to delete a product
export async function DELETE(req) {
  await dbConnect(); // Ensure the database is connected

  try {
    const { id } = await req.json(); // Get the `id` from the body

    if (!id) {
      return new Response("Product ID is required for deletion", { status: 400 });
    }

    const deletedProduct = await Product.deleteOne({ _id: id });

    if (!deletedProduct.deletedCount) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}
