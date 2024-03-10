"use client";
import page_css from "./page.module.css";
export default function Home() {
  return (
    <main>
      <div className={page_css.div}>
        <p className={page_css.title}>Explanation:</p>
        <img className={page_css.load} src="/loadinggif.gif"></img>
      </div>
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
