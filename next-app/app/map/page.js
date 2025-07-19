"use client";

export default function MapPage() {
    return (
        <div className="h-screen">
            <iframe
                src="http://127.0.0.1:5000/map"
                width="100%"
                height="100%"
                title="Heatmap"
                className="border-none"
            />
        </div>
    );
}