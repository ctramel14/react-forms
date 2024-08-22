import { useState } from "react"
import Authenticate from "./Authenticate"

export default function SignUpForm ({ token, setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();

try {
    const result = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    const json = await result.json()
    console.log(result);
    setToken(json.token);
} catch (error) {
    setError(error.message);
}

    }

    return (
        <>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:  
                <input minLength="8" value={username} required
                onChange={(e) => setUsername(e.target.value)}
                />
            </label> <br />
            <label>
                Password:  
                <input minLength="6" value={password} required
                onChange={(e) => setPassword(e.target.value)}
                />
            </label><br /><br />
            <button class="submit" type="submit"
            >Submit</button>
            <Authenticate token={token} setToken={setToken} 
            username={username} setUsername={setUsername}
            />
               
        </form>
        </>
        
    )
}