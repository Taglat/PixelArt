import { Header } from "./components/header/Header";
import { ArtBoard } from "./components/art-board/ArtBoard";
import "./App.css";

export default function App() {

  return (
    <AppLayout header={<Header />}>
      <ArtBoard />
    </AppLayout>
  );
}

function AppLayout({ header, children }) {
  return (
    <>
      {header}
      <main className="main">{children}</main>
    </>
  );
}
