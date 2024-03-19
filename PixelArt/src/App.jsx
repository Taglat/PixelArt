import { Header } from "./components/header/Header";
import "./App.css";

export default function App() {
  return <AppLayout header={<Header />}>Hello World!</AppLayout>;
}

function AppLayout({header, children}) {
  return (
    <>
      {header}
      <main className="main">
        {children}
      </main>
    </>
  )
}