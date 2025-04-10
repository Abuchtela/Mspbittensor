import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MCPService } from "./services/mcpService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the MCP service
  const mcpService = new MCPService();
  
  // === MCP API Routes ===
  
  // Financial data - Crypto prices
  app.get('/api/mcp/financial/crypto/:symbol', async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const cryptoData = await mcpService.getCryptoPrice(symbol);
      res.json(cryptoData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching crypto data: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching crypto data: ${errorMessage}` });
    }
  });
  
  // Shortcut API for crypto prices
  app.get('/api/mcp/crypto/:symbol', async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const cryptoData = await mcpService.getCryptoPrice(symbol);
      res.json(cryptoData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching crypto data: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching crypto data: ${errorMessage}` });
    }
  });
  
  // Financial data - Stock prices
  app.get('/api/mcp/financial/stock/:symbol', async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const stockData = await mcpService.getStockPrice(symbol);
      res.json(stockData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching stock data: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching stock data: ${errorMessage}` });
    }
  });
  
  // Financial data - Market summary
  app.get('/api/mcp/financial/market-summary', async (req, res) => {
    try {
      const marketData = await mcpService.getMarketSummary();
      res.json(marketData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching market summary: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching market summary: ${errorMessage}` });
    }
  });
  
  // Financial data - Crypto history
  app.get('/api/mcp/financial/crypto/:symbol/history', async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const days = parseInt(req.query.days as string) || 7;
      const historyData = await mcpService.getCryptoHistory(symbol, days);
      res.json(historyData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching crypto history: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching crypto history: ${errorMessage}` });
    }
  });
  
  // News data - Latest news
  app.get('/api/mcp/news', async (req, res) => {
    try {
      const topic = req.query.topic as string || 'cryptocurrency';
      const limit = parseInt(req.query.limit as string) || 5;
      const newsData = await mcpService.getLatestNews(topic, limit);
      res.json(newsData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching news data: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching news data: ${errorMessage}` });
    }
  });
  
  // News data - Search news
  app.get('/api/mcp/news/search', async (req, res) => {
    try {
      const query = req.query.query as string;
      const limit = parseInt(req.query.limit as string) || 5;
      
      if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
      }
      
      const searchResults = await mcpService.searchNews(query, limit);
      res.json(searchResults);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error searching news: ${errorMessage}`);
      res.status(500).json({ message: `Error searching news: ${errorMessage}` });
    }
  });
  
  // News data - By sentiment
  app.get('/api/mcp/news/sentiment', async (req, res) => {
    try {
      const topic = req.query.topic as string;
      const sentiment = req.query.sentiment as string;
      const limit = parseInt(req.query.limit as string) || 5;
      
      if (!topic || !sentiment || !['positive', 'negative', 'neutral'].includes(sentiment)) {
        return res.status(400).json({ 
          message: 'Topic and valid sentiment (positive, negative, neutral) parameters are required' 
        });
      }
      
      const newsData = await mcpService.getNewsBySentiment(
        topic, 
        sentiment as 'positive' | 'negative' | 'neutral',
        limit
      );
      res.json(newsData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching news by sentiment: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching news by sentiment: ${errorMessage}` });
    }
  });
  
  // News data - Trending topics
  app.get('/api/mcp/news/trending', async (req, res) => {
    try {
      const trendingTopics = await mcpService.getTrendingTopics();
      res.json(trendingTopics);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching trending topics: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching trending topics: ${errorMessage}` });
    }
  });
  
  // === User and Agent Management Routes ===
  
  // Get all agents
  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching agents: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching agents: ${errorMessage}` });
    }
  });
  
  // Get agent by ID
  app.get('/api/agents/:id', async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const agent = await storage.getAgent(agentId);
      
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      
      res.json(agent);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching agent: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching agent: ${errorMessage}` });
    }
  });
  
  // Create agent
  app.post('/api/agents', async (req, res) => {
    try {
      const agentData = req.body;
      const newAgent = await storage.createAgent(agentData);
      res.status(201).json(newAgent);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error creating agent: ${errorMessage}`);
      res.status(500).json({ message: `Error creating agent: ${errorMessage}` });
    }
  });
  
  // Get chat messages for an agent
  app.get('/api/agents/:id/messages', async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const messages = await storage.getChatMessagesByAgent(agentId);
      res.json(messages);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error fetching messages: ${errorMessage}`);
      res.status(500).json({ message: `Error fetching messages: ${errorMessage}` });
    }
  });
  
  // Add chat message
  app.post('/api/messages', async (req, res) => {
    try {
      const messageData = req.body;
      const newMessage = await storage.createChatMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error creating message: ${errorMessage}`);
      res.status(500).json({ message: `Error creating message: ${errorMessage}` });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
