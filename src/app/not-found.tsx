import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-ink text-canvas p-4 text-center">
            <h1 className="font-pixel text-[12vw] leading-none mb-4 text-canvas/20 select-none">
                404
            </h1>
            <h2 className="font-display italic text-4xl sm:text-5xl mb-6">
                Signal Lost
            </h2>
            <p className="font-sans text-sm sm:text-base text-canvas/60 max-w-md mb-12">
                The requested data stream could not be established. The coordinates you provided do not map to a known sector.
            </p>
            <Link
                href="/"
                className="group relative inline-flex items-center gap-2 px-6 py-3 border border-canvas/20 rounded-full hover:bg-canvas hover:text-ink transition-colors duration-300"
            >
                <span className="font-pixel text-[10px] tracking-[0.2em] uppercase">
                    Return to Index
                </span>
            </Link>
        </div>
    );
}
