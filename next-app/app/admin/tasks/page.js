"use client";
import { useState, useEffect } from "react";

const gradientStyle = {
    background:
        "linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)",
};

const categories = ["Dustbin", "Restroom", "Dispenser"];

const initialIssues = {
    Dustbin: [
        { id: 1, description: "Overflowing bin", status: "Unresolved" },
        { id: 2, description: "Damaged lid", status: "Unresolved" },
    ],
    Restroom: [
        { id: 3, description: "No water supply", status: "Unresolved" },
        { id: 4, description: "Broken flush", status: "Unresolved" },
    ],
    Dispenser: [
        { id: 5, description: "Out of sanitizer", status: "Unresolved" },
        { id: 6, description: "Payment failure", status: "Unresolved" },
    ],
};

export default function UpdatePage() {
    const [issues, setIssues] = useState(initialIssues);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:5000/api/issues");
            const data = await res.json();
            setIssues(data); // {Dustbin: [...], Restroom: [...], Dispenser: [...]}
        };
        fetchData();
    }, []);

    const handleStatusChange = async (category, id, newStatus) => {
        // Update UI locally first
        setIssues((prev) => ({
            ...prev,
            [category]:
                newStatus === "Resolved"
                    ? prev[category].filter((issue) => issue.id !== id)
                    : prev[category].map((issue) =>
                        issue.id === id ? { ...issue, status: newStatus } : issue
                    ),
        }));

        try {
            const res = await fetch("http://127.0.0.1:5000/api/update_issue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id, status: newStatus }),
            });

            const result = await res.json();
            if (!result.success) {
                console.error("Update failed:", result.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };



    const handleSubmit = async () => {
        for (const category of categories) {
            for (const issue of issues[category]) {
                await fetch("http://127.0.0.1:5000/api/update_issue", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: issue.id,
                        status: issue.status
                    })
                });
            }
        }
        alert("Status updated!");
    };


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
                            Update Status
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                            Update the resolution status of hygiene issues reported across the campus.
                        </p>
                    </div>

                    <div className="grid gap-10 mt-6 text-left">
                        {categories.map((category) => (
                            <div key={category}>
                                <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                                    {category} Issues
                                </h2>
                                <div className="space-y-4">
                                    {issues[category].map((issue) => (
                                        <div
                                            key={issue.id}
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-xl bg-white shadow"
                                        >
                                            <div>
                                                <p className="font-medium">{issue.description}</p>
                                                <p className="text-sm text-gray-500">ID: {issue.id}</p>
                                            </div>
                                            <div className="mt-2 sm:mt-0">
                                                <select
                                                    value={issue.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(category, issue.id, e.target.value)
                                                    }
                                                    className="p-2 border border-gray-300 rounded-lg focus:outline-none"
                                                >
                                                    <option value="Unresolved">Unresolved</option>
                                                    <option value="Resolved">Resolved</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 text-white font-semibold rounded-lg shadow"
                            style={gradientStyle}
                        >
                            Submit Updates
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}