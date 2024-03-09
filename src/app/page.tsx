"use client";

import Image from "next/image";
import eee from "./page.module.css";
import AbcTest from "./abc";
import DropDownMenu from "./components/DropDownMenu";
import page_css from "./page.module.css";
export default function Home() {
  const handleOptionClick = (option: string) => {
    console.log(option);
  };

  const class_options = [
    {
      text: "Math",
      onClick: handleOptionClick,
    },
    { 
      text: "Reading", 
      onClick: handleOptionClick 
    },
    {
      text: "Writing",
      onClick: handleOptionClick
    }
  ];

  return (<main>
    <p className={page_css.title}> Academic Ally</p>
    <DropDownMenu options={class_options} defaultText={"Subjects"}/>
  </main>);
}
