
'use client';

import { useEffect } from "react";
import type { GitHubPushResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Github, PartyPopper, ExternalLink, AlertCircle, GitBranch, GitPullRequest } from "lucide-react";

interface GitHubPushSectionProps {
  result: GitHubPushResult;
}


export function GitHubPushSection({ result }: GitHubPushSectionProps) {
    const { toast } = useToast();
    const repoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;


    useEffect(() => {
        if (!result.success && result.error) {
             toast({
                variant: "destructive",
                title: "GitHub Push Failed",
                description: result.error,
            });
        }
    }, [result, toast]);

    const renderContent = () => {
        if (result.success && result.pullRequestUrl && result.branchName && repoUrl) {
            const branchUrl = `${repoUrl.replace(/\.git$/, '')}/tree/${result.branchName}`;
            return (
                <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                    <PartyPopper className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800 dark:text-green-300">
                        Successfully created a Pull Request!
                    </AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-400">
                        A new branch <code className="font-mono bg-green-200 dark:bg-green-800 rounded px-1 py-0.5">{result.branchName}</code> was created and a PR has been opened for review.
                        <div className="mt-2 flex flex-wrap gap-4">
                            <Button asChild variant="link" className="p-0 h-auto text-green-700 dark:text-green-400 font-bold">
                                <a href={branchUrl} target="_blank" rel="noopener noreferrer">
                                    <GitBranch className="mr-1 h-4 w-4" />
                                    View Branch
                                </a>
                            </Button>
                            <Button asChild variant="link" className="p-0 h-auto text-green-700 dark:text-green-400 font-bold">
                                <a href={result.pullRequestUrl} target="_blank" rel="noopener noreferrer">
                                    <GitPullRequest className="mr-1 h-4 w-4" />
                                    View Pull Request
                                </a>
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            )
        }
        
        if (!result.success && result.error) {
             return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>GitHub Push Failed</AlertTitle>
                    <AlertDescription>
                        {result.error}
                    </AlertDescription>
                </Alert>
            )
        }

        return (
            <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline">Automated Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Configuration Required</AlertTitle>
                        <AlertDescription>
                            To enable automatic pushing to GitHub, ensure <code>GITHUB_PAT</code> and <code>NEXT_PUBLIC_GITHUB_REPO_URL</code> are set in your <code>.env</code> file.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }


  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Github className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">Push to GitHub</h2>
      </div>
      {renderContent()}
    </section>
  );
}

    