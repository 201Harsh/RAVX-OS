import express from 'express';
import { GetMCPTOols, RunMCPServer } from "../controllers/mcp.controller.js";

const MCPRouter = express.Router();

MCPRouter.post("/run", RunMCPServer )
MCPRouter.get('/tools', GetMCPTOols);

export default MCPRouter;