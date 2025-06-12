import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import { BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <TabComponentProvider>
        <Router>
          <NavBarComponent />
          <Routes>{/* add upcoming roots here */}</Routes>
        </Router>
      </TabComponentProvider>
    </div>
  );
}

export default App;
