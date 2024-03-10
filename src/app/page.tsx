"use client";

import Image from "next/image";
import eee from "./page.module.css";
import DropDownMenu from "./components/DropDownMenu";
import page_css from "./page.module.css";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import DropDownImage from "./components/DropDownImage";
import { useRouter } from "next/navigation";
export default function Home() {
  const [courses, setCourses] = useState<any>();
  const [subjectArr, setSubjectArrPos] = useState(["", "", ""]);
  const [curImageSelected, setCurImageSelected] = useState("");

  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/getJsonOptions");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const onImageClick = (option: string) => {
    setCurImageSelected(option);
  };

  const handleClassClick = (option: string) => {
    let tmp = [option, "", ""];
    setSubjectArrPos(tmp);
  };

  const handleSubjectClick = (option: string) => {
    let tmp = [subjectArr[0], option, ""];
    setSubjectArrPos(tmp);
  };

  const handleLevelClick = (option: string) => {
    let tmp = [subjectArr[0], subjectArr[1], option];
    setSubjectArrPos(tmp);
  };

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
    } catch (error) {
      console.error("Error fetching response from AI:", error);
    }
  };

  const getResAI = async () => {
    try {
      const response = await fetch("/api/getResponseAI", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching response from AI:", error);
    }
  };

  const handleButtonClick = () => {
    router.push("/page2");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  let courseOptions = [];
  let subjectOptions = [];
  let levelOptions = [];

  let curSubjectMap = new Map<string, any>();
  let curLevelMap = new Map<string, any>();
  for (let i = 0; i < courses?.schem.length; i++) {
    const curClassKey = courses.schem[i];
    const curClass = courses[curClassKey];
    courseOptions.push({
      text: curClassKey,
      onClick: handleClassClick,
    });

    for (let j = 0; j < curClass.subjects_schem.length; j++) {
      const curSubjectKey = curClass.subjects_schem[j];
      const curSubject = curClass[curSubjectKey];
      subjectOptions.push({
        text: curSubjectKey,
        onClick: handleSubjectClick,
      });

      for (let k = 0; k < curSubject.level_schem.length; k++) {
        const curLevelKey = curSubject.level_schem[k];
        const curLevel = curSubject[curLevelKey];
        levelOptions.push({
          text: curLevelKey,
          onClick: handleLevelClick,
        });
      }

      curLevelMap.set(curSubjectKey, levelOptions);
      levelOptions = [];
    }

    curSubjectMap.set(curClassKey, subjectOptions);
    subjectOptions = [];
  }

  return (
    <main>
      <div className={page_css.d1}>
        <DropDownImage
          options={[
            {
              imagePath: "/india.jpeg",
              defaultWidth: 40,
              defaultHeight: 40,
              onClick: onImageClick,
            },
          ]}
          defaultImagePath={"/usa.jpeg"}
          defaultWidth={40}
          defaultHeight={40}
        />
      </div>
      <div className={page_css.buttonContainer}>
        <p className={page_css.title}>Academic Ally</p>
      </div>

      <DropDownMenu options={courseOptions} defaultText={"Select Class"} />
      {subjectArr[0] != "" && (
        <>
          <DropDownMenu
            options={curSubjectMap.get(subjectArr[0])}
            defaultText={"Select Subject"}
          />
          {subjectArr[1] != "" && (
            <DropDownMenu
              options={curLevelMap.get(subjectArr[1])}
              defaultText={"Select Level"}
            />
          )}
        </>
      )}
      <Button
        name={"Teach"}
        onClick={function (buttonName: string): void {
          console.log(
            courses +
              " " +
              " " +
              subjectArr[0] +
              " " +
              subjectArr[1] +
              " " +
              subjectArr[2]
          );
          fetchResponseAI(
            courses[subjectArr[0]][subjectArr[1]][subjectArr[2]].prompt
          );

          handleButtonClick();
        }}
      />
    </main>
  );
}
