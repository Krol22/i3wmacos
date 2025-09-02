import * as Uebersicht from "uebersicht";
import * as Utils from "./utils";

const AEROSPACE_COMMAND = "/usr/local/bin/aerospace";

// WebSocket connection for refresh notifications
let ws = null;
let refreshCallback = null;

// Initialize WebSocket connection
export function initWebSocket(callback) {
    refreshCallback = callback;
    
    if (ws && ws.readyState === WebSocket.OPEN) {
        return;
    }
    
    ws = new WebSocket('ws://localhost:8234');
    
    ws.onopen = () => {
        console.log('Connected to Aerospace server');
    };
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'refresh' && refreshCallback) {
            console.log('Received refresh notification from Aerospace');
            refreshCallback();
        }
    };
    
    ws.onclose = () => {
        console.log('Disconnected from Aerospace server, reconnecting...');
        // Reconnect after 3 seconds
        setTimeout(() => initWebSocket(callback), 3000);
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

// Close WebSocket connection
export function closeWebSocket() {
    if (ws) {
        ws.close();
        ws = null;
    }
}

export async function getWorkspaces(displayId) {
    const json = await Uebersicht.run(
      `${AEROSPACE_COMMAND} list-workspaces --monitor ${displayId} --json --format "%{workspace} %{monitor-appkit-nsscreen-screens-id}"`,
    );
    return Utils.parseJson(json);
}

export async function getDisplays() {
    const json = await Uebersicht.run(`${AEROSPACE_COMMAND} list-monitors --json`);
    return Utils.parseJson(json);
}

export async function getFocusedSpace() {
    const json = await Uebersicht.run(
      `${AEROSPACE_COMMAND} list-workspaces --focused --json`,
    );
    return Utils.parseJson(json);
  }