import cl from "./Header.module.css";
import logoSrc from "./img/Logo.png";

export function Header() {
  return (
    <header className={cl.header}>
      <div className={cl.container}>
        <div className={cl.logo}>
          <img src={logoSrc} alt="Logo" />
          <h1>PixelART</h1>
        </div>
        <button className="btn">Login</button>
      </div>
    </header>
  );
}
