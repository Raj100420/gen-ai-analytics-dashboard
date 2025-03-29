# Gen AI Analytics Dashboard

A React-based dashboard prototype for a generative AI analytics tool with natural language query input and result visualization.

## Project Overview

This dashboard prototype demonstrates how AI can help democratize data access by allowing non-technical users to get insights from complex data using natural language queries. The application features:

- Natural language query input with processing simulation
- Interactive data visualizations (bar, line, pie charts, and tables)
- Query history tracking
- Query suggestions
- Responsive design for all device sizes

## Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, Chart.js
- **UI Components**: Tailwind CSS, Shadcn UI
- **Routing**: Wouter
- **Data Fetching**: TanStack Query
- **Backend**: Express.js (minimal API endpoints for demonstration)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the provided URL (typically http://localhost:3000)

## Usage

1. Enter a natural language query in the input field (e.g., "Show me sales by region for Q1 2023")
2. The system will process the query and display results as interactive visualizations
3. Switch between different visualization types (bar, line, pie, table) as needed
4. Save or export results as required
5. Use follow-up question suggestions to dive deeper into the data

## Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel](https://vercel.com) and sign up/login
3. Click "New Project" and import your repository
4. Vercel will automatically detect the project type and configuration
5. Click "Deploy" to start the deployment process

### Configuration Files

The project includes the following files for Vercel deployment:
- `vercel.json` - Configures build settings and routes
- `.nvmrc` - Specifies Node.js version

## Project Structure

```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions, mock data
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux state management
│   │   └── types/       # TypeScript definitions
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data storage implementation
├── shared/           # Shared code between client and server
│   └── schema.ts     # Data schemas
└── public/           # Static assets
```

## Future Enhancements

- Implement real AI-powered query processing
- Add authentication and user profiles
- Enable data export in multiple formats
- Build custom visualization options
- Integrate with various data sources