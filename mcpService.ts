// MCP Service - Handles MCP interactions for various data sources
// In a production environment, this would connect to real APIs

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: string;
}

interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: string;
}

interface MarketSummary {
  totalMarketCap: number;
  btcDominance: number;
  topGainers: string[];
  topLosers: string[];
  marketSentiment: string;
  lastUpdated: string;
}

interface HistoricalDataPoint {
  date: string;
  price: number;
  volume: number;
}

interface NewsItem {
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export class MCPService {
  constructor() {
    // In a real implementation, we would initialize API clients here
    console.log('MCP Service initialized');
  }
  
  // Crypto price data
  async getCryptoPrice(symbol: string): Promise<CryptoPrice> {
    // In a real implementation, this would call a cryptocurrency API
    // For demo purposes, we're creating realistic-looking data
    let price = 0;
    let change = 0;
    let volume = 0;
    let marketCap = 0;
    
    switch(symbol.toUpperCase()) {
      case 'BTC':
        price = 68223.45;
        change = 2.7;
        volume = 42.3;
        marketCap = 1.34;
        break;
      case 'ETH':
        price = 3571.28;
        change = -0.8;
        volume = 19.6;
        marketCap = 0.43;
        break;
      case 'BNB':
        price = 589.32;
        change = 1.3;
        volume = 2.1;
        marketCap = 0.09;
        break;
      case 'SOL':
        price = 149.76;
        change = 5.2;
        volume = 3.8;
        marketCap = 0.06;
        break;
      default:
        price = 100 + Math.random() * 1000;
        change = -5 + Math.random() * 10;
        volume = Math.random() * 10;
        marketCap = Math.random() * 0.5;
    }
    
    // Add some randomness to values
    price = price * (1 + (Math.random() * 0.001 - 0.0005));
    
    return {
      symbol: symbol.toUpperCase(),
      price,
      change24h: change,
      volume24h: volume,
      marketCap,
      lastUpdated: new Date().toISOString()
    };
  }
  
  // Stock price data
  async getStockPrice(symbol: string): Promise<StockPrice> {
    // In a real implementation, this would call a stock market API
    let price = 0;
    let change = 0;
    let volume = 0;
    
    switch(symbol.toUpperCase()) {
      case 'AAPL':
        price = 188.62;
        change = 1.2;
        volume = 53.4;
        break;
      case 'MSFT':
        price = 412.65;
        change = -0.5;
        volume = 21.3;
        break;
      case 'GOOGL':
        price = 165.10;
        change = 0.8;
        volume = 18.7;
        break;
      case 'AMZN':
        price = 178.15;
        change = 1.9;
        volume = 32.1;
        break;
      default:
        price = 50 + Math.random() * 200;
        change = -2 + Math.random() * 4;
        volume = Math.random() * 30;
    }
    
    // Add some randomness
    price = price * (1 + (Math.random() * 0.002 - 0.001));
    
    return {
      symbol: symbol.toUpperCase(),
      price,
      change: price * (change / 100),
      changePercent: change,
      volume,
      lastUpdated: new Date().toISOString()
    };
  }
  
  // Market summary
  async getMarketSummary(): Promise<MarketSummary> {
    // In a real implementation, this would aggregate data from multiple sources
    return {
      totalMarketCap: 2.62 + (Math.random() * 0.1 - 0.05),
      btcDominance: 51.3 + (Math.random() * 1 - 0.5),
      topGainers: ['SOL', 'AVAX', 'DOT', 'LINK', 'ADA'],
      topLosers: ['DOGE', 'SHIB', 'LTC', 'UNI', 'MATIC'],
      marketSentiment: Math.random() > 0.5 ? 'Bullish' : 'Neutral',
      lastUpdated: new Date().toISOString()
    };
  }
  
  // Historical crypto data
  async getCryptoHistory(symbol: string, days: number): Promise<HistoricalDataPoint[]> {
    // In a real implementation, this would call a cryptocurrency API for historical data
    const historicalData: HistoricalDataPoint[] = [];
    
    let basePrice = 0;
    let baseVolume = 0;
    
    switch(symbol.toUpperCase()) {
      case 'BTC':
        basePrice = 65000;
        baseVolume = 40;
        break;
      case 'ETH':
        basePrice = 3400;
        baseVolume = 18;
        break;
      default:
        basePrice = 1000;
        baseVolume = 5;
    }
    
    // Generate historical data points
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Add realistic price movement
      const priceChange = (Math.random() * 0.06) - 0.03; // -3% to +3%
      basePrice = basePrice * (1 + priceChange);
      
      // Add realistic volume movement
      const volumeChange = (Math.random() * 0.1) - 0.05; // -5% to +5%
      baseVolume = baseVolume * (1 + volumeChange);
      
      historicalData.push({
        date: date.toISOString().split('T')[0],
        price: basePrice,
        volume: baseVolume
      });
    }
    
    return historicalData;
  }
  
  // News data
  async getLatestNews(topic: string, limit: number = 5): Promise<NewsItem[]> {
    // In a real implementation, this would call a news API
    const news: NewsItem[] = [];
    
    const cryptoNews = [
      {
        title: "Bitcoin Breaks $70,000 Resistance Level",
        summary: "Bitcoin has surged above $70,000 for the first time since its last all-time high, signaling strong bullish momentum in the crypto market.",
        source: "CryptoNews",
        category: "cryptocurrency",
        sentiment: "positive" as const
      },
      {
        title: "Ethereum Upgrade Postponed After Security Vulnerability Found",
        summary: "The highly anticipated Ethereum network upgrade has been delayed after researchers discovered a potential security flaw in the implementation.",
        source: "BlockchainDaily",
        category: "cryptocurrency",
        sentiment: "negative" as const
      },
      {
        title: "Major Bank Announces Crypto Custody Service for Institutional Clients",
        summary: "One of the world's largest financial institutions has unveiled plans to offer cryptocurrency custody services to its institutional clients, marking another milestone in crypto adoption.",
        source: "FinanceToday",
        category: "cryptocurrency",
        sentiment: "positive" as const
      },
      {
        title: "New Regulatory Framework for Cryptocurrencies Proposed",
        summary: "Lawmakers have introduced a comprehensive bill aimed at providing regulatory clarity for the cryptocurrency industry, addressing issues from taxation to stablecoin oversight.",
        source: "CryptoInsider",
        category: "regulation",
        sentiment: "neutral" as const
      },
      {
        title: "NFT Market Shows Signs of Recovery After Year-Long Slump",
        summary: "The non-fungible token market is showing renewed activity after a prolonged downturn, with trading volumes increasing across major platforms.",
        source: "ArtTechWeekly",
        category: "nft",
        sentiment: "positive" as const
      }
    ];
    
    const financeNews = [
      {
        title: "Federal Reserve Signals Potential Rate Cut",
        summary: "The Federal Reserve has indicated it may consider reducing interest rates in the coming months as inflation shows signs of cooling.",
        source: "EconomicTimes",
        category: "finance",
        sentiment: "positive" as const
      },
      {
        title: "Tech Stocks Rally on Strong Earnings Reports",
        summary: "Technology sector shares surged today following better-than-expected quarterly earnings from several major companies.",
        source: "MarketWatch",
        category: "stocks",
        sentiment: "positive" as const
      },
      {
        title: "Oil Prices Drop Amid Concerns Over Demand",
        summary: "Crude oil prices have fallen sharply as market analysts express concerns about future demand in the face of economic uncertainty.",
        source: "EnergyDaily",
        category: "commodities",
        sentiment: "negative" as const
      },
      {
        title: "Housing Market Cools as Mortgage Rates Remain Elevated",
        summary: "The residential real estate market continues to show signs of slowing as higher mortgage rates dampen buyer demand.",
        source: "PropertyInsider",
        category: "real-estate",
        sentiment: "negative" as const
      },
      {
        title: "Major Merger Announced in Healthcare Sector",
        summary: "Two leading healthcare companies have announced plans to merge in a deal valued at over $30 billion, pending regulatory approval.",
        source: "BusinessWeek",
        category: "mergers",
        sentiment: "neutral" as const
      }
    ];
    
    // Select news based on topic
    let sourceNews = [];
    if (topic.toLowerCase().includes('crypto') || 
        topic.toLowerCase().includes('bitcoin') || 
        topic.toLowerCase().includes('ethereum')) {
      sourceNews = cryptoNews;
    } else {
      sourceNews = financeNews;
    }
    
    // Generate the response
    for (let i = 0; i < Math.min(limit, sourceNews.length); i++) {
      const item = sourceNews[i];
      
      // Generate a random date within the last 24 hours
      const date = new Date();
      date.setHours(date.getHours() - Math.floor(Math.random() * 24));
      
      news.push({
        title: item.title,
        summary: item.summary,
        url: `https://example.com/news/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`,
        source: item.source,
        publishedAt: date.toISOString(),
        category: item.category,
        sentiment: item.sentiment
      });
    }
    
    return news;
  }
  
  // Search news
  async searchNews(query: string, limit: number = 5): Promise<NewsItem[]> {
    // In a real implementation, this would search a news API
    // For demo purposes, we're returning the latest news filtered by the query
    const allNews = await this.getLatestNews('', 10);
    
    // Simple filter based on query
    const filteredNews = allNews.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.summary.toLowerCase().includes(query.toLowerCase())
    );
    
    return filteredNews.slice(0, limit);
  }
  
  // Get news by sentiment
  async getNewsBySentiment(topic: string, sentiment: 'positive' | 'negative' | 'neutral', limit: number = 5): Promise<NewsItem[]> {
    // In a real implementation, this would call a news API with sentiment filtering
    const allNews = await this.getLatestNews(topic, 10);
    
    // Filter by sentiment
    const filteredNews = allNews.filter(item => item.sentiment === sentiment);
    
    return filteredNews.slice(0, limit);
  }
  
  // Get trending topics
  async getTrendingTopics(): Promise<string[]> {
    // In a real implementation, this would call a news API or social media API
    return [
      'Bitcoin',
      'Ethereum',
      'Federal Reserve',
      'Inflation',
      'Tech stocks',
      'AI',
      'Oil prices',
      'Interest rates',
      'NFTs',
      'DeFi'
    ];
  }
}
