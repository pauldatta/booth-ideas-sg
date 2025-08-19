import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GeneratePrdOverviewOutput } from "@/ai/flows/generate-prd-overview";
import { FileText, Target, Lightbulb, CheckCircle, Users, BarChart } from "lucide-react";

interface PrdSectionProps {
  prd: GeneratePrdOverviewOutput;
}

const prdItems = (prd: GeneratePrdOverviewOutput) => [
  {
    icon: <BarChart className="w-6 h-6 text-primary" />,
    title: "Problem Statement",
    content: prd.problemStatement,
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Target User",
    content: prd.targetUser,
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    title: "Solution",
    content: prd.solution,
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Desired Outcome",
    content: prd.desiredOutcome,
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Background Context",
    content: prd.backgroundContext,
  },
];

export function PrdSection({ prd }: PrdSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">Product Requirements Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prdItems(prd).map((item) => (
          <Card key={item.title} className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              {item.icon}
              <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
