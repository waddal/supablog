import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_KEY
);

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate("/");
  }

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // if a value.data is undefined, dont even try to get the .user info, but if user exists...
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  return (
    <div className="Profile">
      <header className="Profile-header">
        {user ? (
          <>
            <h1>Profile</h1>
            <span>{user.email}</span>
            <button onClick={() => signOutUser()}>Sign Out</button>
          </>
        ) : (
          <>
            <h1>User is not logged in...</h1>
            <button onClick={() => navigate("/")}>Go to login</button>
          </>
        )}
      </header>
    </div>
  );
}

export default Profile;
