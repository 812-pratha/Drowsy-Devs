"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function AuditPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dispenserData, setDispenserData] = useState(null);
    const [restroomData, setRestroomData] = useState(null);
    const [dustbinData, setDustbinData] = useState(null);

    useEffect(() => {
        setIsLoaded(true);

        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/api/audit_data");
            const data = await response.json();

            setDispenserData({
                labels: Object.keys(data.dispenser),
                datasets: [{
                    label: "Issues",
                    data: Object.values(data.dispenser),
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    tension: 0.4,
                }],
            });

            setRestroomData({
                labels: Object.keys(data.restroom),
                datasets: [{
                    label: "Issues",
                    data: Object.values(data.restroom),
                    borderColor: "green",
                    backgroundColor: "rgba(0, 128, 0, 0.2)",
                    tension: 0.4,
                }],
            });

            setDustbinData({
                labels: Object.keys(data.dustbin),
                datasets: [{
                    label: "Issues",
                    data: Object.values(data.dustbin),
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    tension: 0.4,
                }],
            });
        };


        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: false },
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
                <div className="max-w-6xl mx-auto text-center">
                    <div
                        className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-pink-300">
                            Audit Module
                        </h1>

                        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
                            Visual representation of resolved and unresolved hygiene issue reports.
                        </p>

                        <div className="grid gap-12">
                            {dispenserData && (
                                <div className="bg-white rounded-xl p-6 shadow-lg border">
                                    <h2 className="text-xl font-bold text-blue-600 mb-4">Dispenser Issues</h2>
                                    <Line options={options} data={dispenserData} />
                                </div>
                            )}

                            {restroomData && (
                                <div className="bg-white rounded-xl p-6 shadow-lg border">
                                    <h2 className="text-xl font-bold text-green-600 mb-4">Restroom Issues</h2>
                                    <Line options={options} data={restroomData} />
                                </div>
                            )}

                            {dustbinData && (
                                <div className="bg-white rounded-xl p-6 shadow-lg border">
                                    <h2 className="text-xl font-bold text-red-600 mb-4">Dustbin Issues</h2>
                                    <Line options={options} data={dustbinData} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}