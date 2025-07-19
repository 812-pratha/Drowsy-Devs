"use client";

export default function MapPage() {
    return (
        <div className="h-screen">
            <iframe
                src="http://localhost:3000/map"
                width="100%"
                height="100%"
                title="Heatmap"
                className="border-none"
            />
        </div>
    );
}