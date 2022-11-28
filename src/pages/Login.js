import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      // forward to profile url
      navigate("/profile");
    } else {
      // forward to localhost:3000
      navigate("/");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <Auth 
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord", "github"]}
        />
      </header>
    </div>
  );
}

export default Login;
