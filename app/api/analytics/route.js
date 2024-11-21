import dbConnect from "../../lib/dbConnect";
import Analytics from "../../models/Analytics";

// Handle GET requests
export async function GET(req, { params }) {
  await dbConnect(); // Ensure the database is connected

  try {
    // Fetch data from the 'Analytics' collection based on year or return all if no query is given
    const { searchParams } = new URL(req.url);
    const selectedYear = searchParams.get('year') || new Date().getFullYear(); // Default to current year if no year is specified

    const data = await Analytics.findOne({ year: selectedYear }); // Fetch data from MongoDB based on the selected year

    if (data) {
      return new Response(JSON.stringify(data), { status: 200 }); // Return analytics data if found
    } else {
      return new Response(
        JSON.stringify({ message: 'No analytics data found for this year' }), 
        { status: 404 }
      ); // Return a 404 if no data is found for the selected year
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(
      JSON.stringify({ message: 'Error fetching analytics data' }), 
      { status: 500 }
    ); // Return an error response in case of failure
  }
}
