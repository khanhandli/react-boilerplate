import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WithLayout from "./HOC/withLayout";
import { publicRoutes } from "./routes";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Page = route.component;
            if (!route.auth) {
              Page = WithLayout(route.component);
            }

            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
