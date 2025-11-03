import 'bootstrap/dist/css/bootstrap.css';
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom';
function Signin()
{
    const navigate = useNavigate();
    const handleSignin = async(e)=>{
        e.preventDefault();
        const formData = {
            emailId:e.target.emailId.value,
            password:e.target.password.value,
        };
        try 
        {
            const res = await fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log("Response data:", data);
            if(!res.ok)
            {
                alert(data.error);
                navigate("/signup");
                return;
            }
                 localStorage.setItem("token", data.token);
                 window.location.href = "http://localhost:5173"; 
        } catch (err) {
            console.error(err);
        }
    };
    return(
        <>
            <div className="signup-container">
            <div className="card w-50">
            <div className="card-body text-center">
                <h5 className="card-title">Sign In</h5>
                <form onSubmit={handleSignin}>
                    <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="emailId"/>
                    <label for="floatingInput">Email ID</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password"/>
                    <label for="floatingPassword">Password</label>
                    </div>
                    <button type="submit" className="btn btn-outline-info justify-center mt-2">Sign In</button>
                </form>
            </div>
            </div>
            </div>
        </>
    );
}
export default Signin