const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected Übersicht clients
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Übersicht client connected');
    clients.add(ws);
    
    ws.on('close', () => {
        console.log('Übersicht client disconnected');
        clients.delete(ws);
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

// Middleware
app.use(express.json());

// Refresh endpoint - Aerospace will call this
app.post('/refresh', (req, res) => {
    console.log('Refresh requested by Aerospace');
    
    // Notify all connected Übersicht clients
    const refreshMessage = JSON.stringify({ type: 'refresh', timestamp: Date.now() });
    
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(refreshMessage);
        }
    });
    
    res.json({ success: true, clientsNotified: clients.size });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        connectedClients: clients.size,
        uptime: process.uptime()
    });
});

const PORT = process.env.PORT || 8234;

server.listen(PORT, () => {
    console.log(`Aerospace server running on port ${PORT}`);
    console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
    console.log(`Refresh endpoint: http://localhost:${PORT}/refresh`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
