import express from 'express';
import { RunMCPServer } from "../controllers/mcp.controller.js";

const MCPROuter = express.Router();

MCPROuter.post("/mcp", RunMCPServer )

export default MCPROuter;