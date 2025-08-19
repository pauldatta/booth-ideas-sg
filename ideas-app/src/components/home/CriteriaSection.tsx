import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SuggestEvaluationCriteriaOutput } from "@/ai/flows/suggest-evaluation-criteria";
import { Sparkles, Bot, User, Briefcase, Cpu, Users, Layers } from "lucide-react";

interface CriteriaSectionProps {
  criteria: SuggestEvaluationCriteriaOutput;
}

const criteriaItems = (criteria: SuggestEvaluationCriteriaOutput) => [
    { icon: <Bot className="w-6 h-6 text-primary"/>, title: "Innovation in AI", content: criteria.innovationInAI },
    { icon: <User className="w-6 h-6 text-primary"/>, title: "User Value", content: criteria.userValue },
    { icon: <Briefcase className="w-6 h-6 text-primary"/>, title: "Business Value", content: criteria.businessValue },
    { icon: <Cpu className="w-6 h-6 text-primary"/>, title: "Proposed Tech Stack", content: criteria.proposedTechStack },
    { icon: <Users className="w-6 h-6 text-primary"/>, title: "Recommended Team", content: criteria.recommendedTeam },
    { icon: <Layers className="w-6 h-6 text-primary"/>, title: "Suggested Product Areas", content: criteria.suggestedProductAreas },
];

export function CriteriaSection({ criteria }: CriteriaSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">AI-Powered Evaluation</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {criteriaItems(criteria).map((item) => (
          <Card key={item.title} className="shadow-md hover:shadow-xl transition-shadow flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              {item.icon}
              <CardTitle className="text-lg font-headline">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
