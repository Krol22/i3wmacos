const batteryStyle = {
  fontFamily: 'Hack Nerd Font',
  fontSize: '18px',
  verticalAlign: 'middle',
  marginRight: '8px',
};

const chargingStyle = {
  fontFamily: 'Hack Nerd Font',
  fontSize: '12px',
  verticalAlign: 'middle',
  marginLeft: '8px',
};

const renderStyle = {
  display: 'flex',
  alignItems: 'center',
  // color: '#f2b482',
};

const BatteryIcon = ({ percentage }) => {
  const renderIcon = () => {
    if (percentage < 20) {
      return '';
    }

    if (percentage < 40) {
      return '';
    }

    if (percentage < 60) {
      return '';
    }


    if (percentage < 80) {
      return '';
    }

    return '';
  }

  return (
    <div style={batteryStyle}>{renderIcon()}</div>
  );
};

const ChargingIcon = ({ charging }) => {
  if (!charging) {
    return '';
  }

  return <div style={chargingStyle}></div>;
}

const render = ({ output }) => {
  const percentage = output.percentage;
  return (
    <div>
      <div
        style={renderStyle}
      >
        <BatteryIcon percentage={percentage} />
        {percentage}%
        <ChargingIcon charging={output.charging} />
      </div>
    </div>
  );
};

export default render;
