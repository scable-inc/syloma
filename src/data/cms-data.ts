import { CMSItem } from "@/hooks/use-data";

export const staticCMSData: Record<string, CMSItem[]> = {
  workflow_phases: [
    {
      id: "1",
      title: "Wireframing",
      description:
        "AI analyzes your idea and creates the complete app structure",
      icon: "🎨",
      order: 1,
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    },
    {
      id: "4",
      title: "Generation",
      description:
        "Autonomous code generation with real-time progress tracking",
      icon: "🚀",
      order: 4,
      created_at: "2024-01-15T10:15:00Z",
      updated_at: "2024-01-15T10:15:00Z",
    },
    {
      id: "2",
      title: "Design",
      description:
        "Automatic design system generation with colors and typography",
      icon: "✨",
      order: 2,
      created_at: "2024-01-15T10:05:00Z",
      updated_at: "2024-01-15T10:05:00Z",
    },
    {
      id: "3",
      title: "Architecture",
      description: "Technical breakdown with precise cost estimation",
      icon: "🏗️",
      order: 3,
      created_at: "2024-01-15T10:10:00Z",
      updated_at: "2024-01-15T10:10:00Z",
    },
  ],
};
