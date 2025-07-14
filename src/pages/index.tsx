import { getCMSData, useCMSData } from "@/hooks/use-data";
import { WorfklowPhase } from "@/types/workflow-phase";
import { GetStaticProps } from "next";

interface HomeProps {
  workflowPhases: WorfklowPhase[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const workflowPhases = getCMSData<WorfklowPhase>("workflow_phases");

  return {
    props: {
      workflowPhases,
    },
  };
};

export default function HomePage({
  workflowPhases: initialWorkflowPhases,
}: HomeProps) {
  const { data: phases, isLoading } = useCMSData<WorfklowPhase>(
    "workflow_phases",
    {
      sortBy: "order",
      sortOrder: "asc",
    },
    initialWorkflowPhases
  );

  return (
    <div data-editable className="min-h-screen bg-background">
      {/* Section Hero */}
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center justify-items-center">
          <h1
            data-editable
            data-name="index.hero.title"
            className="text-4xl font-bold mb-4"
          >
            Welcome to your Intuitiverse website
          </h1>
          <p
            data-editable
            data-name="index.hero.subtitle"
            className="text-xl text-muted-foreground"
          >
            Start creating your amazing website on app.intuitiverse.ai
          </p>
          <img
            data-editable
            data-name="index_hero_img_b8k2"
            alt="placeholder"
            src="/placeholder.svg"
            className="pt-10 w-[200px] self-center"
          ></img>
        </div>
      </div>

      {/* Section Workflow */}
      <div className="container mx-auto px-4">
        <h2
          data-editable
          data-name="index.section.workflow.title"
          className="text-3xl font-bold text-center mb-12"
        >
          Our 4 steps process
        </h2>

        {isLoading ? (
          <div
            data-editable
            data-name="index.section.workflow.loading"
            className="text-center"
          >
            Loading workflow phases...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases?.map((phase, index) => (
              <div
                key={phase.id}
                className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
