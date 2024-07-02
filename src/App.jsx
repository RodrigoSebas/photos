import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProductView from "./views/AllProductView";
import Navbar from "./components/Navbar";
import LoginView from "./views/LoginView";
import { AuthContextProvider } from "./context/authContext";
import EditProductView from "./views/EditProductView";
import CreateProductView from "./views/CreateProductView";
const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllProductView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/editphoto/:id" element={<EditProductView />} />
          <Route path="/createproduct" element={<CreateProductView />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
