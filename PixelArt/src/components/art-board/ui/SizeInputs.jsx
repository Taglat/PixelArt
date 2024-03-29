import cl from "./ZSizeInputs.module.css";

export function SizeInputs({width, height}) {
  return (
    <div className={cl.container}>
      <div className={cl.col}>
        <div className={cl.parametr}>
          <p className={cl.title}>W:</p>
          <p className={cl.subtitle}>max 25</p>
        </div>
        <input className={cl.input} type="number" min="1" max="25" value={width} />
      </div>
      <div className={cl.col}>
        <div className={cl.parametr}>
          <p className={cl.title}>H:</p>
          <p className={cl.subtitle}>max 25</p>
        </div>
        <input className={cl.input} type="number" min="1" max="25" value={height} />
      </div>
    </div>
  );
}
