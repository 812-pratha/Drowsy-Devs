"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const gradientStyle = {
    background:
      "linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)",
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    router.push('/admin') // Accepts any credentials
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="w-full h-16" style={gradientStyle}></div>

        <div className="flex justify-center items-center min-h-screen -mt-16 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              Staff Login
            </h2>

            <input
              type="text"
              placeholder="Staff ID"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 text-white font-semibold rounded-lg"
              style={gradientStyle}
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full h-16" style={gradientStyle}></div>

      <section className="pt-16 pb-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-pink-300">
              Staff Portal
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
              Welcome to the Staff Portal. View and manage hygiene issue reports submitted by users across the campus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div onClick={() => router.push("/admin/view")}
                className="p-6 rounded-xl text-white shadow-lg border border-white hover:scale-105 transition-transform"
                style={gradientStyle}
              >
                <h3 className="text-xl font-semibold mb-2">View Reports</h3>
                <p className="text-sm">Access submitted hygiene reports from all locations.</p>
              </div>

              <div
                onClick={() => router.push("/admin/tasks")}
                className="cursor-pointer p-6 rounded-xl text-white shadow-lg border border-white hover:scale-105 transition-transform"
                style={gradientStyle}
              >
                <h3 className="text-xl font-semibold mb-2">Update Status</h3>
                <p className="text-sm">Change status of issues (resolved, unresolved, etc.).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}