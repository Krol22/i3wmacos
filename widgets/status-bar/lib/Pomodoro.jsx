import { run } from 'uebersicht';

const sessionTimes = [2700, 1800, 1200];
const breakTime = 600;

let index = 0;
let time = sessionTimes[0];

let timer = null;
let isTicking = false;
let isBreak = false;
let isPaused = false;

const container = {
  fontFamily: 'Hack Nerd Font',
  display: 'flex',
  gap: '12px',
};

const row = {
  display: 'flex',
  gap: '12px',
};

const icon = {
  verticalAlign: 'middle',
  transform: 'translateY(-1px)',
  cursor: 'pointer',
}

const formatTime = (time) => {
  const minutes = time / 60;
  const seconds = time % 60;

  const paddedSeconds = `${seconds}`.padStart(2, '0');

  return `${Math.floor(minutes)}:${paddedSeconds}`;
}

const render = () => {
  const onStartClick = async () => {
    isTicking = true;
    isPaused = false;
    timer = setInterval(async () => {
      time -= 1; 
      if (time === 0) {
        isTicking = false;
        clearInterval(timer);

        if (isBreak) {
          time = sessionTimes[index];
          await run('sh ./status-bar/scripts/notify_break_done.sh');
        } else {
          time = breakTime;
          await run('sh ./status-bar/scripts/notify_session_done.sh');
        }

        isBreak = !isBreak;
      }
    }, 1000);
  };

  const onPauseClick = async () => {
    clearInterval(timer);
    isPaused = true;
  };

  const onStopClick = async () => {
    isTicking = false;
    clearInterval(timer);
    time = sessionTimes[index];
  };

  const onChangeClick = async () => {
    index += 1;
    if (index >= sessionTimes.length) {
      index = 0;
    }
    time = sessionTimes[index];
  };

  const onRestartClick = async () => {
    isBreak = false;
    time = sessionTimes[index];
    clearInterval(timer);
  }

  return (
    <div style={container}>
      {isTicking ? (
        <div style={row}>
          <div>{formatTime(time)}</div>
          {isPaused ? (
            <div style={icon} onClick={onStartClick}>󰐊</div>
          ) : (
            <div style={icon} onClick={onPauseClick}>󰏤</div>
          )}
          <div style={icon} onClick={onStopClick}>󰓛</div>
        </div>
      ) : (
        <div style={row}>
          {!isBreak && (
            <div onClick={onChangeClick}>{formatTime(time)}</div>
          )}
          {isBreak && (
            <div onClick={onRestartClick}>Break!</div>
          )}
          <div style={icon} onClick={onStartClick}>󰐊</div>
        </div>
      )}
    </div>
  );
}

export default render;
