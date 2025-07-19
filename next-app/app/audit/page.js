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
    const [charts, setCharts] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [dispenserData, setDispenserData] = useState(null);
    const [restroomData, setRestroomData] = useState(null);
    const [dustbinData, setDustbinData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://127.0.0.1:5000/api/audit_data");
            const data = await res.json();

            const makeChartData = (categoryData) => {
                const labels = Array.from(
                    new Set([
                        ...Object.keys(categoryData["Resolved"] || {}),
                        ...Object.keys(categoryData["Unresolved"] || {}),
                    ])
                );

                const resolvedData = labels.map(label => categoryData["Resolved"]?.[label] || 0);
                const unresolvedData = labels.map(label => categoryData["Unresolved"]?.[label] || 0);

                return {
                    labels,
                    datasets: [
                        {
                            label: "Resolved",
                            data: resolvedData,
                            backgroundColor: "rgba(34, 197, 94, 0.6)", // green
                            borderColor: "rgba(34, 197, 94, 1)",
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: "Unresolved",
                            data: unresolvedData,
                            backgroundColor: "rgba(239, 68, 68, 0.6)", // red
                            borderColor: "rgba(239, 68, 68, 1)",
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                };
            };

            const dispenser = makeChartData(data.Dispenser);
            const restroom = makeChartData(data.Restroom);
            const dustbin = makeChartData(data.Dustbin);

            setCharts({ Dispenser: dispenser, Restroom: restroom, Dustbin: dustbin });
            setDispenserData(dispenser);
            setRestroomData(restroom);
            setDustbinData(dustbin);
            setIsLoaded(true);
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
                        className={`transition-all duration-1000 delay-300 ${isLoaded
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
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
