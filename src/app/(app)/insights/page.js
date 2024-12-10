import mongoose from "mongoose";
import React from "react";

// MongoDB connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Event Schema
const EventSchema = new mongoose.Schema({
  type: String, // "view" or "click"
  uri: String,  // Page URL
  createdAt: Date,
});
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

// User Schema
const UserSchema = new mongoose.Schema({
  uri: String,
  links: Array,
  createdAt: Date,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Fetch data from MongoDB
const fetchInsightsData = async () => {
  await connectDB();

  // Aggregate total views and clicks from the Event collection
  const eventCounts = await Event.aggregate([
    {
      $group: {
        _id: "$type", // Group by type ("view" or "click")
        count: { $sum: 1 },
      },
    },
  ]);

  // Map event types to their totals
  const totalPageVisits = eventCounts.find((e) => e._id === "view")?.count || 0;
  const totalLinkClicks = eventCounts.find((e) => e._id === "click")?.count || 0;

  // Fetch user data and links
  const userData = await User.aggregate([
    {
      $project: {
        uri: 1,
        linksCount: { $size: { $ifNull: ["$links", []] } }, // Count of links for each user
        createdAt: 1,
      },
    },
  ]);

  return {
    totalPageVisits,
    totalLinkClicks,
    userData,
  };
};

const InsightsPage = async () => {
  // Fetch data
  const { totalPageVisits, totalLinkClicks, userData } = await fetchInsightsData();

  // Calculate totals
  const totalUsers = userData.length;
  const totalLinks = userData.reduce((sum, user) => sum + user.linksCount, 0);

  return (
    <div className="bg-gray-100 mt-10 pl-4 pt-6 min-h-screen">
    {/* Main Content Container with Flex */}
    <div className="flex gap-6">
      {/* Left Side (Metric Cards and User Data Table) */}
      <div className="flex-1">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">Insights Dashboard</h2>
  
        {/* Metrics Cards */}
        <div className="flex gap-3 mb-4">
          <div className="bg-white w-80 h-[180px] shadow-md rounded-lg p-2 text-center">
            <h3 className="text-lg font-bold border-b-2 pb-2">Total Active Users</h3>
            <p className="text-[64px] font-bold mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white w-80 h-[180px] shadow-md rounded-lg p-2 text-center">
            <h3 className="text-lg font-bold border-b-2 pb-2">Total Active Links</h3>
            <p className="text-[64px] font-bold mt-2">{totalLinks}</p>
          </div>
          <div className="bg-white w-80 h-[180px] shadow-md rounded-lg p-2 text-center">
            <h3 className="text-lg font-bold border-b-2 pb-2">Total Page Visits</h3>
            <p className="text-[64px] font-bold mt-2">{totalPageVisits}</p>
          </div>
        </div>
  
        {/* User Data Table */}
        <div className="bg-white shadow-md w-[990px] rounded-lg p-4">
          
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">Username</th>
                <th className="border border-gray-300 p-2 text-left">Links Count</th>
                <th className="border border-gray-300 p-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.uri}>
                  <td className="border border-gray-300 p-2">{user.uri}</td>
                  <td className="border border-gray-300 p-2">{user.linksCount}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Right Side (Graphs Section) */}
      <div className="w-[300px] pt-10 mr-6 pb-4 flex flex-col gap-4">
        {/* Graphs Section */}
        <div className="bg-white h-[280px] shadow-md rounded-lg p-4">
          <h4 className="font-bold mb-2">Total Page Visits</h4>
          <p className="text-xl font-semibold text-purple-600">{totalPageVisits}</p>
          {/* Placeholder for Graph */}
          <div className="h-40 bg-gray-200 rounded-lg mt-2"></div>
        </div>
        <div className="bg-white h-[280px] shadow-md rounded-lg p-4">
          <h4 className="font-bold mb-2">Total Link Clicks</h4>
          <p className="text-xl font-semibold text-purple-600">{totalLinkClicks}</p>
          {/* Placeholder for Graph */}
          <div className="h-40 bg-gray-200 rounded-lg mt-2"></div>
        </div>
        <div className="bg-white h-[280px] shadow-md rounded-lg p-4">
          <h4 className="font-bold mb-2">Total Social Links</h4>
          <p className="text-xl font-semibold text-purple-600">{totalLinkClicks}</p>
          {/* Placeholder for Graph */}
          <div className="h-40 bg-gray-200 rounded-lg mt-2"></div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default InsightsPage;
