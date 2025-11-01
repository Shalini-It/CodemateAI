import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { tipRequestSchema } from "@shared/schema";
import { generateProgrammingTip } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Generate programming tip endpoint
  app.post("/api/tips/generate", async (req, res) => {
    try {
      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ 
          error: "OpenAI API key not configured. Please add your OPENAI_API_KEY to use tip generation." 
        });
      }

      // Validate request body
      const validationResult = tipRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validationResult.error.errors 
        });
      }

      const tipRequest = validationResult.data;

      // Generate tip using OpenAI
      const generatedTip = await generateProgrammingTip(tipRequest);

      res.json(generatedTip);
    } catch (error) {
      console.error("Error generating tip:", error);
      res.status(500).json({ 
        error: "Failed to generate tip. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
