import HomeComponent from "./COMPONENTS/HOME/HOME_component";
import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.scss";
import FooterComponent from "./COMPONENTS/FOOTER/FOOTER";

function App() {
  return (
    <div className="appContainer">
      <TabComponentProvider>
        <Router>
          <NavBarComponent />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
          </Routes>
        </Router>
        <FooterComponent />
      </TabComponentProvider>
    </div>
  );
}

export default App;
