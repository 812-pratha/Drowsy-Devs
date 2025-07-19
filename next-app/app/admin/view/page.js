"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ViewReportsPage() {
    const [reports, setReports] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const router = useRouter();

    // Sample reports data (with status field)
    const sampleReports = [
        {
            id: 1,
            location: "B building - First Floor",
            issues: ["Bad odour", "No issue"],
            description: "Washroom needs immediate cleaning.",
            status: "Unresolved",
        },
        {
            id: 2,
            location: "A building - 2nd Floor",
            issues: ["Lid Broken / Damaged", "Payment not working"],
            status: "Resolved",
        },
        {
            id: 3,
            location: "B building - 3rd Floor",
            issues: ["Overflowing", "No Water Supply", "No Dustbin Available"],
            description: "Needs serious cleaning and maintenance.",
            status: "Unresolved",
        },
        {
            id: 4,
            location: "B building - 5th Floor",
            issues: ["No Pads", "No Dispenser Available"],
            status: "Resolved",
        },
        {
            id: 5,
            location: "A building - 3rd Floor",
            issues: ["Overflowing", "Needs Immediate Cleaning"],
            description: "Bathroom that needs immediate cleaning.",
            status: "Resolved",
        },
    ];

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setReports(sampleReports);
            setIsLoaded(true);
        }, 1000);
    }, []);

    const gradientStyle = {
        background:
            "linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)",
    };

    return (
        <>
            <div className="w-full h-16" style={gradientStyle}></div>

            <section className="pt-16 pb-10 px-6 bg-white text-black min-h-screen">
                <div className="max-w-5xl mx-auto text-left">
                    <div
                        className={`transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-pink-300">
                            View Reports
                        </h1>

                        <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto text-center">
                            Here are the hygiene issue reports submitted by users across the campus.
                        </p>

                        <div className="space-y-6">
                            {reports.map((report) => (
                                <div
                                    key={report.id}
                                    className="p-6 rounded-xl shadow-lg border border-white flex justify-between items-start"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, rgba(119, 63, 171, 1) 22%, rgba(182, 87, 199, 1) 50%, rgba(217, 113, 177, 1) 100%)",
                                    }}
                                >
                                    {/* Left side: Report details */}
                                    <div className="flex-1 pr-4">
                                        <h3 className="text-xl font-semibold mb-2 text-white">{report.location}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {report.issues.map((issue, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-white text-purple-700 rounded-lg text-sm"
                                                >
                                                    {issue}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-white mb-2">{report.description}</p>
                                    </div>

                                    {/* Right side: Status */}
                                    <div>
                                        <span
                                            className={`px-3 py-1 text-sm font-semibold rounded-full ${report.status === "Resolved"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {report.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

