# Context-Aware AI Agent with Multi-Context Planning (MCP)

A practical demonstration of a utility-focused AI agent that leverages Multi-Context Planning (MCP) technology to access dynamic, real-time data sources, addressing the limitations of static AI models that often deliver outdated or irrelevant insights.

## Project Overview

This project showcases a context-aware AI agent system built to provide accurate and contextually relevant responses by connecting to various real-time data sources. Unlike traditional LLMs that are limited to their training data, our agents can:

- Access current financial market data
- Retrieve the latest news information
- Store conversation history for improved contextual understanding
- Combine dynamic data with powerful reasoning capabilities

## Features

- **Plugin-Based Architecture**: Extendable framework allowing connection to various data sources
- **Multi-Context Planning**: Agents identify the optimal data sources needed to answer user queries
- **Real-Time Financial Data**: Provides current cryptocurrency prices, stock information, and market trends
- **News Integration**: Access to the latest news articles filtered by topic or category
- **Conversation Persistence**: Database-backed storage of all interactions for improved context retention
- **Flexible Agent Configuration**: Create and modify agents with different specializations and capabilities

## Technology Stack

- **Frontend**: React.js with TailwindCSS and Shadcn UI components
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for persistence
- **Development Environment**: Vite for fast development and HMR (Hot Module Replacement)
- **State Management**: TanStack Query for efficient data fetching and caching
- **Schema Validation**: Zod for runtime type checking and validation

## Data Sources

The system connects to multiple data sources through its plugin architecture:

- **Financial Plugin**: Provides cryptocurrency prices, stock data, and market overviews
- **News Plugin**: Retrieves current news articles filtered by topic, with sentiment analysis

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database

### GitHub Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/context-aware-mcp-agent.git
   cd context-aware-mcp-agent
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (create a `.env` file with the following):
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/mcpagent
   ```

4. Push the database schema:
   ```
   npm run db:push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### Deploying from Replit

If you forked this project on Replit, you can deploy it with the following steps:

1. Make sure you have a PostgreSQL database set up.
2. Click the "Run" button to start the development server.
3. Use the "Deploy" button to deploy your project.

### GitHub Repository Setup

To add this project to your own GitHub repository:

1. Create a new repository on GitHub.
2. Initialize git in your local project (if not already initialized):
   ```
   git init
   ```
3. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/your-repo-name.git
   ```
4. Add all files to git:
   ```
   git add .
   ```
5. Commit your files:
   ```
   git commit -m "Initial commit: MCP Agent project"
   ```
6. Push to GitHub:
   ```
   git push -u origin main
   ```

## Usage

1. **Create an Agent**: Configure an agent with specific plugins and system prompts
2. **Chat with the Agent**: Ask questions that require real-time data
3. **View Real-Time Data**: The agent will fetch the necessary information and provide contextualized responses

### Example Queries

- "What is the current price of Bitcoin?"
- "How have tech stocks performed today?"
- "What are the latest news about artificial intelligence?"
- "Give me a summary of today's financial markets"

## API Endpoints

The application exposes the following API endpoints:

### Agent Management

- `GET /api/agents` - List all configured agents
- `GET /api/agents/:id` - Get a specific agent
- `POST /api/agents` - Create a new agent
- `PATCH /api/agents/:id` - Update an agent
- `DELETE /api/agents/:id` - Delete an agent

### Chat Messages

- `GET /api/agents/:id/messages` - Get conversation history for an agent
- `POST /api/messages` - Create a new message

### MCP Data Sources

- `GET /api/mcp/crypto/:symbol` - Get cryptocurrency price data
- `GET /api/mcp/stock/:symbol` - Get stock price data
- `GET /api/mcp/news` - Get latest news (with optional topic parameter)
- `GET /api/mcp/market` - Get market overview

## Future Enhancements

- **Additional Data Plugins**: Weather, sports, e-commerce, and more
- **User Authentication**: Secure multi-user support
- **Agent Fine-Tuning**: Ability to train agents on specific domains
- **Advanced Visualization**: Charts and graphs for financial data
- **Multi-Modal Inputs**: Support for image and voice interactions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.