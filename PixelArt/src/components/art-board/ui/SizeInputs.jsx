import { useState, useEffect } from "react";
import cl from "./ZSizeInputs.module.css";

export function SizeInputs({ width, height, onClick }) {
  const [size, setSize] = useState({ width: width, height: height });

  useEffect(() => {
    setSize({ width: width, height: height });
  }, [width, height]);

  const handleWidthChange = (e) => {
    setSize({...size, width: +e.target.value});
  }

  const handleHeightChange = (e) => {
    setSize({...size, height: +e.target.value});
  }

  return (
    <div className={cl.container}>
      <div className={cl.col}>
        <div className={cl.parametr}>
          <p className={cl.title}>W:</p>
          <p className={cl.subtitle}>max 25</p>
        </div>
        <input
          className={cl.input}
          type="number"
          min="1"
          max="25"
          value={size.width}
          onChange={handleWidthChange}
        />
      </div>
      <div className={cl.col}>
        <div className={cl.parametr}>
          <p className={cl.title}>H:</p>
          <p className={cl.subtitle}>max 25</p>
        </div>
        <input
          className={cl.input}
          type="number"
          min="1"
          max="25"
          value={size.height}
          onChange={handleHeightChange}
        />
      </div>
      <button onClick={() => onClick(size.width, size.height)} className="btn">Change</button>
    </div>
  );
}
