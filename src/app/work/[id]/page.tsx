"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { PROJECTS, Project } from "@/constants/projects";
import ViewToggle from "@/components/ui/ViewToggle";
import EditorialView from "@/components/case-study/EditorialView";
import SchematicView from "@/components/case-study/SchematicView";


export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [viewMode, setViewMode] = useState<"editorial" | "schematic">("editorial");
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        // Find project by ID (e.g. "01")
        const found = PROJECTS.find((p) => p.id === resolvedParams.id);
        if (found) {
            setProject(found);
        }
    }, [resolvedParams.id]);

    if (!project) return null; // or loading state

    return (
        <main className="min-h-screen relative pb-32">

            <div className="relative z-10">
                {viewMode === "editorial" ? (
                    <EditorialView project={project} />
                ) : (
                    <SchematicView project={project} />
                )}
            </div>

            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
        </main>
    );
}
