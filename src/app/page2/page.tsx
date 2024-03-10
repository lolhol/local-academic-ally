"use client";
import { useEffect, useState } from "react";
import page_css from "./page.module.css";
export default function Home() {
  const [isRenderLoad, setRenderLoad] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/getResponseAI");
      while (true) {
        if (response == undefined) {
          continue;
        } else {
          setRenderLoad(false);
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main>
      {isRenderLoad && (
        <div className={page_css.div}>
          <p className={page_css.title}>Explanation:</p>
          <img className={page_css.load} src="/loadinggif.gif"></img>
        </div>
      )}
      <p className={page_css.text}>text</p>
      <div className={page_css.div2}>
        <input
          className={page_css.input}
          placeholder="add your response here: "
        ></input>
        <br></br>
        <br />
        <button className={page_css.submit}>Submit</button>
      </div>
    </main>
  );
}
