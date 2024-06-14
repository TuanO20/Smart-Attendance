import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const date = time.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeString = time.toLocaleTimeString();

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>{date}, {timeString}</h2>
    </div>
  );
}

export default Clock;