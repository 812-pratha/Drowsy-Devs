"use client";

export default function MapPage() {
    return (
        <div className="h-screen">
            <iframe
                src={process.env.NEXT_PUBLIC_BACKEND_URL + "/map"}
                width="100%"
                height="100%"
                title="Heatmap"
                className="border-none"
            />
        </div>
    );
}