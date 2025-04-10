import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import AgentBuilder from '@/components/sections/AgentBuilder';
import Documentation from '@/components/sections/Documentation';
import Challenges from '@/components/sections/Challenges';
import ChatInterface from '@/components/ui/chat-interface';
import { MCPAgent } from '@/lib/mcp/agent';
import { DataPlugin } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

// Default plugins for the demo
const defaultPlugins: DataPlugin[] = [
  { id: 'financial', name: 'Financial Data', enabled: true, apiKey: '' },
  { id: 'news', name: 'News & Events', enabled: true, apiKey: '' },
  { id: 'onchain', name: 'On-chain Data', enabled: false, apiKey: '' },
  { id: 'research', name: 'Research Papers', enabled: false, apiKey: '' }
];

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mcpDataUsed?: boolean;
}

const Home = () => {
  const [agent, setAgent] = useState<MCPAgent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Initialize the agent on component mount
  useEffect(() => {
    const newAgent = new MCPAgent({
      name: 'Financial Insights Agent',
      model: 'Nous-Hermes 2 Yi 34B',
      systemPrompt: 'You are a financial insights agent with access to real-time market data through MCP plugins. Your goal is to provide accurate, up-to-date information about financial markets, cryptocurrency prices, and related news. Always specify the source and timestamp of your data.',
      plugins: defaultPlugins
    });
    
    setAgent(newAgent);
    
    // Add initial welcome message
    setMessages([
      {
        id: '1',
        content: "Hello! I'm a financial insights agent powered by MCP. I can provide real-time information about cryptocurrency prices, market trends, and related news. Try asking me about Bitcoin or Ethereum, or request market updates.",
        isUser: false,
        timestamp: new Date(),
        mcpDataUsed: false
      }
    ]);
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!agent) return;
    
    // Add the user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Process the message with the agent
      const response = await agent.processQuery(content);
      
      // Add the agent's response
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.text,
        isUser: false,
        timestamp: new Date(),
        mcpDataUsed: response.mcpData
      };
      
      setMessages(prev => [...prev, agentMessage]);
      
      // Show a toast if MCP data was used
      if (response.mcpData) {
        toast({
          title: "Real-time Data Used",
          description: "This response was enhanced with real-time data via MCP.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I encountered an error while processing your request: ${(error as Error).message}. Please try again.`,
        isUser: false,
        timestamp: new Date(),
        mcpDataUsed: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: `Failed to process your message: ${(error as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Prepare the initial messages for the chat interface
  const initialMessages: Message[] = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    isUser: msg.isUser,
    timestamp: msg.timestamp,
    mcpDataUsed: msg.mcpDataUsed
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Try the MCP Agent</h2>
              <p className="text-neutral-300 mb-4">
                Interact with our financial insights agent powered by MCP technology. 
                Ask about cryptocurrency prices, market trends, or recent financial news.
              </p>
              <ChatInterface
                title="Financial Insights Agent"
                initialMessages={initialMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
            <div>
              <AgentBuilder />
            </div>
          </div>
        </div>
        <Documentation />
        <Challenges />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
