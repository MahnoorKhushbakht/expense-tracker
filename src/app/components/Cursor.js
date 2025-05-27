import React from 'react';

const Cursor = ({ color = "#000", opacity = 1, size = 20, transitionTime = 0.3, zindex = 999 }) => {
  const style = {
    backgroundColor: color,
    opacity,
    width: size,
    height: size,
    zIndex: zindex,
    transition: `all ${transitionTime}s ease-in-out`,
    borderRadius: '50%',
    position: 'absolute',
    pointerEvents: 'none',
  };

  return <div style={style} />;
};

export default Cursor;
