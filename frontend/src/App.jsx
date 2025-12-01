import { useState } from "react";
import MenuLateral from "./components/layout/MenuLateral";

function App() {
  const [currentPath, setCurrentPath] = useState("/");

  return (
    <>
      <MenuLateral
        currentPath={currentPath}
        onNavigate={(path) => setCurrentPath(path)}
      />
    </>
  );
}

export default App;
