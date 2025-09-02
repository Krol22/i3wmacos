import Battery from "./lib/Battery.jsx";
import Time from "./lib/Time.jsx";
import Volume from "./lib/Volume.jsx";
import parse from "./lib/parse.jsx";
import Date from "./lib/Date.jsx";
import Aerospace from "./lib/Aerospace.jsx";
import styles from "./lib/styles.jsx";

const style = {
  border: "2px solid #999",
  borderRadius: "9px",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "42px",
  position: "fixed",
  overflow: "hidden",
  top: "4px",
  margin: "4px",
  color: styles.colors.dim,
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: "14px",
  backgroundColor: "#1D1D1Ddd",
  color: "#d8dee9",
};

const leftPanelStyle = {
  ...style,
  left: "12px",
  padding: "6px 12px",
};

const rightPanelStyle = {
  ...style,
  right: "12px",
  padding: "6px 36px",
};

const clockStyle = {
  display: "grid",
  padding: "6px 26px",
  gridAutoFlow: "row",
  gridGap: "128px",
  position: "fixed",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "New Alphabet",
  lineHeight: styles.lineHeight,
  fontSize: "48px",
  userSelect: "none",
  pointerEvents: "none",
  color: "#000",
  mixBlendMode: "difference",
  opacity: "0.25",
};

export const refreshFrequency = 500;
export const command = "./status-bar/scripts/stats.sh";

export const render = ({ output }) => {
  const data = parse(output);
  if (typeof data === "undefined") {
    return <div style={style}>Loading...</div>;
  }

  // <div style={pomodoroContainerStyle}>
  // <Pomodoro />
  // </div>
  // <Temperature output={data.temperature} />

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "42px" }}>
        <div style={leftPanelStyle}>
          <Aerospace />
        </div>
        <div style={rightPanelStyle}>
          <Volume output={data.volume} />
          <Battery output={data.battery} />
          <Date date={data.date} />
          <Time time={data.time} utc={data.timeUtc} />
        </div>
        <div style={clockStyle}>
          <span style={{ fontSize: "256px" }}>{data.time}</span>
          <span style={{ fontSize: "192px" }}>{data.day}</span>
          <span style={{ fontSize: "96px" }}>{data.date}</span>
        </div>
      </div>
    </div>
  );
};

export default null;
