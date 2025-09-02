import * as Uebersicht from "uebersicht";
import * as Aerospace from "./aerospace";

const { React } = Uebersicht;

const { useState, useEffect } = React;

const container = {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
};

const workspace = {}

const workspaceActive = {
    ...workspace,
    fontWeight: "bold",
    color: "#ff5f87",
}

const workspaceStyle = (active) => {
    if (active) {
        return workspaceActive;
    }
    return workspace;
}

const Component = React.memo(({ output }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [focusedSpace, setFocusedSpace] = useState([]);

    const displayId = parseInt(window.location.pathname.split("/")[1]);

    useEffect(() => {
        // Initial load
        const loadData = () => {
            Aerospace.getWorkspaces(displayId).then(setWorkspaces);
            Aerospace.getFocusedSpace().then(setFocusedSpace);
        };
        
        loadData();
        
        // Initialize WebSocket connection for refresh notifications
        Aerospace.initWebSocket(loadData);
        
        // Cleanup WebSocket on unmount
        return () => {
            Aerospace.closeWebSocket();
        };
    }, [displayId]);

    const isFocused = (workspaceId) => {
        if (focusedSpace.length === 0) {
            return false;
        }

        return focusedSpace[0].workspace === workspaceId;
    }

    return <div style={container}>{workspaces.map((w) => <div style={workspaceStyle(isFocused(w.workspace))} key={w.workspace}>{w.workspace}</div>)}</div>;
});

export default Component;