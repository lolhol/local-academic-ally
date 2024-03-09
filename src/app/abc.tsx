"use client";

import abc1 from "./abc.module.css"

export default function AbcTest() {
    return (
        <div className={abc1.container}>
            <button className={abc1.verticalcenter} id="button" onClick={() => console.log("hello world")}>Teach</button>
        </div>
    );
  }