"use client";

import abc1 from "./abc.module.css";

export default function AbcTest() {
  return (
    <div className={abc1.container}>
      <button
        className={abc1.verticalcenter}
        id="button"
        onClick={() => {
          console.log("hello world");
          handleExecute();
        }}
      >
        Teach
      </button>
    </div>
  );
}

const handleExecute = async () => {
  const responseFromCall = await fetch("/api/apiTest", {
    method: "POST",
    body: JSON.stringify(""),
  });

  const jsonResponce = await responseFromCall.json();

  if (jsonResponce.sucess == false) {
    alert(
      "Thats a bit suspect... You appear to not be in the list of verified players... 🤨"
    );
  }
};
