"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AuditDashboard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showIssueGraphs, setShowIssueGraphs] = useState(false);
    const [dispenserData, setDispenserData] = useState(null);
    const [restroomData, setRestroomData] = useState(null);
    const [dustbinData, setDustbinData] = useState(null);

    const [locationData, setLocationData] = useState(null);
    const [showLocationGraphs, setShowLocationGraphs] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch("http://127.0.0.1:5000/api/audit_data");
                const res2 = await fetch("http://127.0.0.1:5000/api/location_data");

                const data1 = await res1.json();
                const data2 = await res2.json();

                const makeChartData = (categoryData, colorResolved, colorUnresolved) => {
                    const labels = Array.from(
                        new Set([
                            ...Object.keys(categoryData["Resolved"] || {}),
                            ...Object.keys(categoryData["Unresolved"] || {}),
                        ])
                    );
                    const resolvedData = labels.map((label) => categoryData["Resolved"]?.[label] || 0);
                    const unresolvedData = labels.map((label) => categoryData["Unresolved"]?.[label] || 0);
                    return {
                        labels,
                        datasets: [
                            { label: "Resolved", data: resolvedData, backgroundColor: colorResolved },
                            { label: "Unresolved", data: unresolvedData, backgroundColor: colorUnresolved },
                        ],
                    };
                };

                setDispenserData(makeChartData(data1.Dispenser, "rgba(54, 162, 235, 0.6)", "rgba(255, 159, 64, 0.6)"));
                setRestroomData(makeChartData(data1.Restroom, "rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"));
                setDustbinData(makeChartData(data1.Dustbin, "rgba(255, 99, 132, 0.6)", "rgba(255, 159, 64, 0.6)"));

                setLocationData(data2);  // already in final chart.js format

                setIsLoaded(true);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const gradientStyle = {
        background:
            "linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)",
    };

    return (
        <>
            <div className="w-full h-16" style={gradientStyle}></div>

            <section className="pt-16 pb-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-center text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-pink-300">
                        Audit Module
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Issue Specific */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300">
                            <button
                                className="w-full text-left"
                                onClick={() => setShowIssueGraphs(!showIssueGraphs)}
                            >
                                <h2 className="text-3xl font-semibold text-blue-600 mb-4">
                                    Issue Specific
                                </h2>
                            </button>
                            {showIssueGraphs && (
                                <div className="mt-4 space-y-6">
                                    {dispenserData && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-blue-500 mb-2">Dispenser Issues</h3>
                                            <Bar options={barOptions} data={dispenserData} />
                                        </div>
                                    )}
                                    {restroomData && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-green-500 mb-2">Restroom Issues</h3>
                                            <Bar options={barOptions} data={restroomData} />
                                        </div>
                                    )}
                                    {dustbinData && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-red-500 mb-2">Dustbin Issues</h3>
                                            <Bar options={barOptions} data={dustbinData} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Placeholder for Location Specific if needed */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300">
                            <button
                                className="w-full text-left"
                                onClick={() => setShowLocationGraphs(!showLocationGraphs)}
                            >
                                <h2 className="text-3xl font-semibold text-purple-600 mb-4">Location Specific</h2>
                            </button>
                            {showLocationGraphs && locationData && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-indigo-500 mb-2">
                                        All Locations
                                    </h3>
                                    <Bar options={barOptions} data={locationData} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
