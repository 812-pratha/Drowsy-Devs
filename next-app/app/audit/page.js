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
    const [showLocationGraphs, setShowLocationGraphs] = useState(false);

    const [dispenserData, setDispenserData] = useState(null);
    const [restroomData, setRestroomData] = useState(null);
    const [dustbinData, setDustbinData] = useState(null);
    const [buildingAData, setBuildingAData] = useState(null);
    const [buildingBData, setBuildingBData] = useState(null);

    useEffect(() => {
        setIsLoaded(true);

        setDispenserData({
            labels: ["Damaged", "Empty", "Out of power", "Payment failure", "Other"],
            datasets: [
                {
                    label: "Resolved",
                    data: [1, 2, 1, 3, 0],
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
                {
                    label: "Unresolved",
                    data: [0, 3, 1, 1, 0],
                    backgroundColor: "rgba(255, 159, 64, 0.6)",
                },
            ],
        });

        setRestroomData({
            labels: [
                "No water supply",
                "Locked",
                "Damaged",
                "Needs cleaning",
                "Other",
                "No issues",
            ],
            datasets: [
                {
                    label: "Resolved",
                    data: [1, 3, 1, 2, 0, 2],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
                {
                    label: "Unresolved",
                    data: [0, 2, 1, 2, 0, 1],
                    backgroundColor: "rgba(255, 159, 64, 0.6)",
                },
            ],
        });

        setDustbinData({
            labels: ["Full", "Damaged", "Needs cleaning", "Other", "No issues"],
            datasets: [
                {
                    label: "Resolved",
                    data: [1, 3, 1, 2, 0],
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
                {
                    label: "Unresolved",
                    data: [0, 2, 1, 2, 0],
                    backgroundColor: "rgba(255, 159, 64, 0.6)",
                },
            ],
        });

        setBuildingAData({
            labels: ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor"],
            datasets: [
                {
                    label: "Total Issues",
                    data: [5, 7, 3, 3],
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
            ],
        });

        setBuildingBData({
            labels: ["1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "6th Floor"],
            datasets: [
                {
                    label: "Total Issues",
                    data: [2, 4, 6, 1, 0, 3],
                    backgroundColor: "rgba(255, 205, 86, 0.6)",
                },
            ],
        });
    }, []);

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
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
                                    <div>
                                        <h3 className="text-lg font-semibold text-blue-500 mb-2">
                                            Dispenser Issues
                                        </h3>
                                        <Bar options={barOptions} data={dispenserData} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-green-500 mb-2">
                                            Restroom Issues
                                        </h3>
                                        <Bar options={barOptions} data={restroomData} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-500 mb-2">
                                            Dustbin Issues
                                        </h3>
                                        <Bar options={barOptions} data={dustbinData} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location Specific */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl border hover:shadow-2xl transition-all duration-300">
                            <button
                                className="w-full text-left"
                                onClick={() => setShowLocationGraphs(!showLocationGraphs)}
                            >
                                <h2 className="text-3xl font-semibold text-purple-600 mb-4">
                                    Location Specific
                                </h2>
                            </button>
                            {showLocationGraphs && (
                                <div className="mt-4 grid gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-indigo-500 mb-2">
                                            Building A
                                        </h3>
                                        <Bar options={barOptions} data={buildingAData} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-yellow-500 mb-2">
                                            Building B
                                        </h3>
                                        <Bar options={barOptions} data={buildingBData} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}