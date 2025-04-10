# Contributing to Context-Aware MCP Agent

Thank you for your interest in contributing to the Context-Aware MCP Agent project! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Any additional context

### Suggesting Features

If you have an idea for a new feature, please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Any relevant examples, mockups, or use cases

### Pull Requests

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines

- Update the README.md with details of changes if applicable
- Update the documentation when adding or modifying functionality
- The PR should work on the main development branch
- Include relevant tests if applicable

## Development Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up the environment variables (see README.md)

3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared types and utilities
- `/public` - Static assets

## Coding Standards

- Use TypeScript for type safety
- Follow the existing code style
- Write clear, descriptive commit messages
- Add comments for complex logic

## Adding MCP Plugins

When adding new plugins:

1. Create a new plugin file in `client/src/lib/mcp/plugins/`
2. Implement the required plugin interface
3. Add appropriate error handling
4. Update the plugin registry
5. Add relevant documentation

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.