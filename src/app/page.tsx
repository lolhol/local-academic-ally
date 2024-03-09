"use client";

import Image from "next/image";
import eee from "./page.module.css";
import DropDownMenu from "./components/DropDownMenu";
import page_css from "./page.module.css";
import { useEffect, useState } from "react";
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/getJsonOptions"); // Replace with your actual API endpoint
      const data = await response.json();
      setCourses(data.schem);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleOptionClick = (option: string) => {
    console.log(option);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  let options = [];
  for (let i = 0; i < courses.length; i++) {
    options.push({ text: courses[i], onClick: handleOptionClick });
  }

  return (
    <main>
      <DropDownMenu options={options} defaultText={"Select Class"} />
    </main>
  );
}
