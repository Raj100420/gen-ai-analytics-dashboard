import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/queries', (req, res) => {
    res.json({
      queries: [
        { id: '1', text: 'Show monthly sales for Q1 2023', timestamp: Date.now() - 7200000 },
        { id: '2', text: 'Compare customer acquisition cost by channel', timestamp: Date.now() - 86400000 },
        { id: '3', text: 'Calculate churn rate for premium users', timestamp: Date.now() - 259200000 },
      ]
    });
  });

  app.post('/api/query', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    // Simulate processing time
    setTimeout(() => {
      // 90% success rate
      if (Math.random() > 0.1) {
        res.json({
          success: true,
          result: {
            query,
            timestamp: Date.now(),
            title: query.charAt(0).toUpperCase() + query.slice(1),
            description: `Showing results for "${query}"`,
            chartData: {
              labels: ['January', 'February', 'March'],
              datasets: [
                {
                  label: 'Sales (in thousands $)',
                  data: [850, 910, 1200],
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(59, 130, 246, 0.7)'
                  ],
                  borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(59, 130, 246, 1)'
                  ],
                  borderWidth: 1
                }
              ]
            }
          }
        });
      } else {
        res.status(500).json({ 
          success: false,
          error: 'Failed to process query. Please try again.'
        });
      }
    }, 2000);
  });

  const httpServer = createServer(app);
  return httpServer;
}
