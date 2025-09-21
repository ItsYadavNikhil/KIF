import AIChat from '../AIChat';

export default function AIChatExample() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">AI Chat Button Example</h1>
        <p className="text-muted-foreground">
          Look at the bottom right corner for the floating AI chat button.
          Click it to see the placeholder interface for future AI integration.
        </p>
      </div>
      <AIChat />
    </div>
  );
}