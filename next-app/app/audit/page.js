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

    // Simulated DB data fetching logic
    const fetchData = async () => {
      // Replace this block with actual fetch from your backend or Firebase
      const dispenserResolved = [1, 2, 1, 3, 0];
      const dispenserUnresolved = [0, 3, 1, 1, 0];
      const restroomResolved = [1, 3, 1, 2, 0, 2];
      const restroomUnresolved = [0, 2, 1, 2, 0, 1];
      const dustbinResolved = [1, 3, 1, 2, 0];
      const dustbinUnresolved = [0, 2, 1, 2, 0];

      setDispenserData({
        labels: ["Damaged", "Empty", "Out of power", "Payment failure", "Other"],
        datasets: [
          {
            label: "Resolved",
            data: dispenserResolved,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            tension: 0.4,
          },
          {
            label: "Unresolved",
            data: dispenserUnresolved,
            borderColor: "orange",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            tension: 0.4,
          },
        ],
      });

      setRestroomData({
        labels: [
          "No water supply",
          "Locked",
          "Damaged",
          "Needs immediate cleaning",
          "Other",
          "No issues",
        ],
        datasets: [
          {
            label: "Resolved",
            data: restroomResolved,
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            tension: 0.4,
          },
          {
            label: "Unresolved",
            data: restroomUnresolved,
            borderColor: "orange",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            tension: 0.4,
          },
        ],
      });

      setDustbinData({
        labels: ["Full", "Damaged", "Needs cleaning", "Other", "No issues"],
        datasets: [
          {
            label: "Resolved",
            data: dustbinResolved,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            tension: 0.4,
          },
          {
            label: "Unresolved",
            data: dustbinUnresolved,
            borderColor: "orange",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            tension: 0.4,
          },
        ],
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
            className={`transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
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
