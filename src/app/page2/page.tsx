"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import page_css from "./page.module.css";

interface FormData {
  textInput: string;
}

export default function Home() {
  const router = useRouter();
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [isRenderLoad, setRenderLoad] = useState(true);
  const [curResponse, setRes] = useState("Loading...");
  const [cur, setCur] = useState("add your response here:");
  const [formData, setFormData] = useState<FormData>({
    textInput: "",
  });

  const fetchCourses = async () => {
    try {
      while (true) {
        const response = await fetch("/api/getResponseAI");
        const data = await response.json();
        if (data === undefined || data.res === undefined) {
          continue;
        } else {
          setRenderLoad(false);
          setRes(data.res);
          break;
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

  const fetchResponseAI = async (prompt1: string) => {
    try {
      console.log(prompt1);
      const body = { prompt: prompt1 };
      const response = await fetch("/api/requestChat", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);

      try {
        while (true) {
          const response = await fetch("/api/getResponseAI");
          const data = await response.json();
          if (data === undefined || data.res === undefined) {
            continue;
          } else {
            setRenderLoad(false);
            setRes(data.res);
            break;
          }

          await sleep(50);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    } catch (error) {
      console.error("Error fetching response from AI:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitted data: ", formData.textInput);
      await fetchResponseAI(formData.textInput);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <main>
      {isRenderLoad && (
        <div className={page_css.div}>
          <p className={page_css.title}>Explanation:</p>
          <img
            className={page_css.load}
            src="/loadinggif.gif"
            alt="Loading GIF"
          />
        </div>
      )}
      <p className={page_css.text}>{curResponse}</p>
      <div className={page_css.div2}>
        <input
          className={page_css.input}
          placeholder={cur}
          value={formData.textInput}
          onChange={(e) =>
            setFormData({ ...formData, textInput: e.target.value })
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <br />
        <br />
        <button className={page_css.submit} onClick={handleSubmit}>
          I understand!
        </button>
      </div>
    </main>
  );
}
