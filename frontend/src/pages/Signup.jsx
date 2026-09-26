import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Signup = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

    console.log({email, password, name, gender, membershipStatus, phoneNumber, dateOfBirth})
    const response = await fetch("/api/users/signup", 
    {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body:  JSON.stringify({ name, email, password, phone_number: phoneNumber, gender, date_of_birth: dateOfBirth, membership_status: membershipStatus})
    }) ;
    
    const user = await response.json();
    if (!response.ok) {
        console.log(user.error)
        setError(user.error);
        return;
    }

    localStorage.setItem("user", JSON.stringify(user))
    setIsAuthenticated(true);
    console.log("yay")
    navigate("/")
    }

    return (

        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>EMAIL</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>PASSWORD</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>PHONE</label>
                <input type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                <label>GENDER</label>
                <input type='text' value={gender} onChange={(e) => setGender(e.target.value)}></input>
                <label>NAME</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
                <label>MEMBERSHIP STATUS</label>
                <input type='text' value={membershipStatus} onChange={(e) => setMembershipStatus(e.target.value)}></input>
                <label>DATE OF BIRTH</label>
                <input type='date' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}></input>
                <button type="submit">Signup</button>
                {error && <p className="error">{error}</p>}
                </form>
        </div>
    )
    
}

export default Signup;