import Image from "next/image";
import eee from "./page.module.css";
import AbcTest from "./abc";

export default function Home() {
  const handleOptionClick = (option: string) => {
    console.log(option);
  };

  const options = [
    {
      text: "Option 1",
      onClick: handleOptionClick,
    },
    { text: "Option 2", onClick: handleOptionClick },
  ];

  return <main></main>;
}
