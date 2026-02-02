"use client";

export default function GridGuide() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex justify-center max-w-[1920px] mx-auto border-x border-[#262626]">
            {/* 12 Columns */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className={`h-full flex-1 ${i !== 11 ? "border-r border-[#262626]" : ""} opacity-40`} // Subtle Dark Lines
                />
            ))}
        </div>
    );
}
