import { users, type User, type InsertUser, 
         agents, type Agent, type InsertAgent,
         chatMessages, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { db } from "./db";
import { eq, and, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Agent methods
  getAgent(id: number): Promise<Agent | undefined>;
  getAllAgents(): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, updates: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;
  
  // Chat message methods
  getChatMessage(id: number): Promise<ChatMessage | undefined>;
  getChatMessagesByAgent(agentId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeDefaultData();
  }
  
  private async initializeDefaultData() {
    try {
      // Check if we already have users
      const existingUsers = await db.select().from(users);
      
      if (existingUsers.length === 0) {
        // Create a default user
        const [defaultUser] = await db.insert(users)
          .values({
            username: 'demo_user',
            password: 'password123' // In a real app, this would be hashed
          })
          .returning();
        
        // Create a default agent
        await db.insert(agents)
          .values({
            name: 'Financial Insights Agent',
            baseModel: 'Nous-Hermes 2 Yi 34B',
            systemPrompt: 'You are a financial insights agent with access to real-time market data through MCP plugins. Your goal is to provide accurate, up-to-date information about financial markets, cryptocurrency prices, and related news. Always specify the source and timestamp of your data.',
            plugins: ['financial', 'news'],
            userId: defaultUser.id
          });
      }
    } catch (error) {
      console.error("Error initializing default data:", error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Agent methods
  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }
  
  async getAllAgents(): Promise<Agent[]> {
    return await db.select().from(agents);
  }
  
  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    // Ensure plugins is properly cast as string[]
    const values = {
      ...insertAgent,
      plugins: insertAgent.plugins as unknown as string[]
    };
    
    const [agent] = await db.insert(agents).values(values).returning();
    return agent;
  }
  
  async updateAgent(id: number, updates: Partial<InsertAgent>): Promise<Agent | undefined> {
    // For type safety, we need to handle each field individually
    const values: Record<string, any> = {};
    
    if (updates.name) values.name = updates.name;
    if (updates.baseModel) values.baseModel = updates.baseModel;
    if (updates.systemPrompt) values.systemPrompt = updates.systemPrompt;
    if (updates.userId) values.userId = updates.userId;
    
    // Handle plugins separately
    if (updates.plugins) {
      values.plugins = updates.plugins as unknown as string[];
    }
    
    const [updatedAgent] = await db.update(agents)
      .set(values)
      .where(eq(agents.id, id))
      .returning();
    
    return updatedAgent;
  }
  
  async deleteAgent(id: number): Promise<boolean> {
    const result = await db.delete(agents).where(eq(agents.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
  
  // Chat message methods
  async getChatMessage(id: number): Promise<ChatMessage | undefined> {
    const [message] = await db.select().from(chatMessages).where(eq(chatMessages.id, id));
    return message;
  }
  
  async getChatMessagesByAgent(agentId: number): Promise<ChatMessage[]> {
    return await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.agentId, agentId))
      .orderBy(asc(chatMessages.timestamp));
  }
  
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages)
      .values(insertMessage)
      .returning();
    
    return message;
  }
}

export const storage = new DatabaseStorage();
