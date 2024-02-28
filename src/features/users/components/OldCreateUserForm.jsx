import React, { useState } from "react";

const CreateUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordMatch = password === repeatPassword && password !== "";
  const canSubmit = passwordMatch && firstName && lastName;

  return (
    <div>
      <form>
        <label htmlFor="first-name"> First Name: </label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name..."
        />
        <label htmlFor="last-name"> last Name: </label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name..."
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password..."
        />
        <label htmlFor="repeat-password"> Repeat Password: </label>
        <input
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="repeat password..."
        />
        {!passwordMatch && repeatPassword !== "" && (
          <span style={{ color: "red" }}>passwords do not match...</span>
        )}

        <button disabled={!canSubmit}>Register</button>
      </form>
    </div>
  );
};

export default CreateUserForm;