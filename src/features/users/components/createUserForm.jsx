import React, { useState } from "react";

const createUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordMatch = (password === repeatPassword) && password !== ''

  return (
    <div>
      <form>
        <label htmlFor="first-name"> First Name: </label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name.."
        />
        <label htmlFor="last-name"> last Name: </label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name.."
        />
        <label htmlFor="password"> last Name: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="last name.."
        />
        <label htmlFor="repeat-password"> last Name: </label>
        <input
          type="repeat-password"
          id="repeat-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="last name.."
        />

        <button disabled={passwordMatch} >Register</button>
      </form>
    </div>
  );
};

export default createUserForm;
