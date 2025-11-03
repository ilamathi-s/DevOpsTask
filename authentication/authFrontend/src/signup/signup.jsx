 import 'bootstrap/dist/css/bootstrap.css';
 import { useNavigate } from "react-router-dom";
 import './signup.css'
function Signup()
{
    const navigate = useNavigate();
    const handleSignUp = async(e) => 
    {
        e.preventDefault();
        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            emailId: e.target.emailId.value,
            createPass: e.target.createPass.value,
            confirmPass:e.target.confirmPass.value
        };
        try {
            const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });
            const data = await res.json();
            alert(data.message || data.error);
            if (res.status === 201) { 
                navigate("/signin");
      }
        } catch (err) {
            console.error(err);
        }
};       

    return(
        <>
            <div className="signup-container">
            <div className="card w-50">
            <div className="card-body text-center">
                <h5 className="card-title">Sign Up</h5>
                <form onSubmit={handleSignUp}>
                    <div className="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" name='firstName' />
                    <label for="floatingInput">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name='lastName'/>
                    <label for="floatingInput">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='emailId'/>
                    <label for="floatingInput">Email ID</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='createPass'/>
                    <label for="floatingPassword">Create Password</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='confirmPass'/>
                    <label for="floatingPassword">Confirm Password</label>
                    </div>
                    <button type="submit" className="btn btn-outline-info justify-center mt-2">Sign Up</button>
                </form>
            </div>
            </div>
            </div>
        </>
        
    );
}
export default Signup