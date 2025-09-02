const clockStyle = {
  fontFamily: 'Hack Nerd Font',
  fontSize: '18px',
  verticalAlign: 'middle',
  marginRight: '8px',
};

const renderStyle = {
  display: 'flex',
  alignItems: 'center',
};

const render = ({ time, utc }) => {
  return (
    <div>
      <div
        style={renderStyle}
      >
        <div style={clockStyle}></div>
        {time}
        <span style={{marginLeft: '8px'}}>(UTC {utc})</span>
          
      </div>
    </div>
  );
};

export default render;
