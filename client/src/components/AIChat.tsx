import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";

interface AIChatProps {
  className?: string;
}

export default function AIChat({ className }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-ai-chat"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Study Assistant
              </CardTitle>
              <CardDescription>
                Coming soon! AI-powered help for your studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2" data-testid="text-ai-coming-soon">
                  AI Chat Coming Soon!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We're working on an AI assistant to help you with:
                </p>
                <div className="text-left space-y-2 mb-6">
                  <div className="text-sm text-muted-foreground">
                    • Study questions and explanations
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Subject-specific guidance  
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Note recommendations
                  </div>
                  <div className="text-sm text-muted-foreground">
                    • Exam preparation help
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => console.log('AI chat interest registered')}
                  data-testid="button-notify-ai"
                >
                  Notify Me When Ready
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}