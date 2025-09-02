const iconStyle = {
  fontFamily: 'Hack Nerd Font',
  fontSize: '14px',
  verticalAlign: 'middle',
  marginRight: '8px',
};

const renderStyle = {
    display: 'flex',
    alignItems: 'center',
};

const render = ({ date }) => {
    return (
        <div style={renderStyle}>
        <div style={iconStyle}></div>
            {date}
        </div>
    );
};

export default render;