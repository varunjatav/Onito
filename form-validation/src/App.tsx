
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";


function App() {
 
  return (
    <ErrorBoundary>
     <Outlet/>
    </ErrorBoundary>
  );


}

export default App;
