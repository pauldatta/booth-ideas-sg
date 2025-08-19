import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GenerateCodeOutput } from "@/ai/flows/generate-code";
import { Code, Eye, Palette } from "lucide-react";

interface SandboxSectionProps {
  code: GenerateCodeOutput;
}

export function SandboxSection({ code }: SandboxSectionProps) {

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>React Preview</title>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { margin: 0; font-family: sans-serif; }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        try {
          // A simple require mock for lucide-react, this is not a full implementation.
          const require = (path) => {
            if (path === 'lucide-react') {
                // Return a proxy that returns a dummy component for any icon.
                return new Proxy({}, {
                    get: (target, prop) => {
                        return (props) => {
                            const Svg = (svgProps) => (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    {...svgProps}
                                >
                                    {/* A simple placeholder icon */}
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            );
                            return <Svg {...props} />;
                        }
                    }
                })
            }
            return {};
          };

          ${code.generatedCode}
          
          const container = document.getElementById('root');
          const root = ReactDOM.createRoot(container);
          
          // The generated code should export a default component
          root.render(<App />);

        } catch (error) {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red; padding: 20px;"><h3>Error rendering preview:</h3><pre>' + error.message + '</pre></div>';
          console.error(error);
        }
      </script>
    </body>
    </html>
  `;


  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Code className="w-8 h-8 text-accent" />
        <h2 className="text-3xl font-headline font-bold">Live Sandbox & Code</h2>
      </div>
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="p-2 bg-muted/50 border-b flex-row items-center gap-2 space-y-0">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex-grow text-center text-sm text-muted-foreground font-mono bg-background rounded-md px-4 py-1">
            app-preview.tsx
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full justify-start rounded-none bg-muted/50 p-0 border-b">
               <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary rounded-none">
                <Eye className="w-4 h-4" /> Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary rounded-none">
                <Code className="w-4 h-4" /> Code
              </TabsTrigger>
              <TabsTrigger value="theme" className="gap-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-primary rounded-none">
                <Palette className="w-4 h-4" /> Theme
              </TabsTrigger>
            </TabsList>
             <TabsContent value="preview" className="p-0 bg-background">
                <div className="flex justify-center items-center h-96">
                    <iframe
                        srcDoc={iframeSrcDoc}
                        title="Application Preview"
                        sandbox="allow-scripts allow-modals"
                        className="w-full h-full border-0"
                    />
                </div>
            </TabsContent>
            <TabsContent value="code">
              <ScrollArea className="h-96 w-full">
                <pre className="p-4 text-sm font-mono">
                  <code>{code.generatedCode}</code>
                </pre>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="theme" className="p-4">
                <div className="flex justify-center items-center h-96">
                    <Card className="text-center p-8">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Generated Theme</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-primary">{code.theme}</p>
                            <p className="text-muted-foreground mt-2">This theme has been applied to the generated code.</p>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
