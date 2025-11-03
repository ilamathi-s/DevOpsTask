import Signin from "./signin/signin.jsx";
import Signup from "./signup/signup.jsx";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

function App()
{
    return(
        <>
        <Router>
            <Routes>
                <Route path="/" element={<Signup/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </Router>
        </>
    );
}
export default App