import React from "react";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState({
    firstName: "",
    lastName: "",
    yourEmail: "",
  });

  return (
    <div>
      <input
        style={{ padding: "5px", margin: "10px 0" }}
        type={"text"}
        value={count.firstName}
        onChange={(e) => setCount({ ...count, firstName: e.target.value })}
      />
      <br />
      <input
        style={{ padding: "5px", margin: "10px 0" }}
        type={"text"}
        value={count.lastName}
        onChange={(e) => setCount({ ...count, lastName: e.target.value })}
      />
      <br />
      <input
        style={{ padding: "5px", margin: "10px 0" }}
        type={"text"}
        value={count.yourEmail}
        onChange={(e) => setCount({ ...count, yourEmail: e.target.value })}
      />
      <br />
      <h3>First name: {count.firstName}</h3>
      <h3>Last name: {count.lastName}</h3>
      <h3>Your Email: {count.yourEmail}</h3>
      {backInput()}
    </div>
  );
};

export default App;
