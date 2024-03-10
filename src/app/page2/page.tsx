"use client";
import { useEffect, useState } from "react";
import page_css from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [isRenderLoad, setRenderLoad] = useState(true);
  const [curResponse, setRes] = useState("Loading...");

  const fetchCourses = async () => {
    try {
      while (true) {
        const response = await fetch("/api/getResponseAI");
        const data = await response.json();
        if (data == undefined || data.res == undefined) {
          continue;
        } else {
          setRenderLoad(false);
          setRes(data.res);
        }

        await sleep(50);
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
      <p className={page_css.text}>{curResponse}</p>
      <div className={page_css.div2}>
        <input
          className={page_css.input}
          placeholder="add your response here: "
        ></input>
        <br></br>
        <br />
        <button
          className={page_css.submit}
          onClick={() => {
            console.log("!!");
            router.push("/");
          }}
        >
          I understand!
        </button>
      </div>
    </main>
  );
}
