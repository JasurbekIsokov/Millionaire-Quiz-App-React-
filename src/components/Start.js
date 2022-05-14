import { useRef } from "react";

export default function Start({ setUserName }) {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <form className="start" onSubmit={handleClick} netlify>
      <input
        placeholder="Enter Your Name"
        className="startInput"
        ref={inputRef}
        type={"text"}
      />
      <button type="submit" className="startbtn" onClick={handleClick}>
        Start
      </button>
    </form>
  );
}
