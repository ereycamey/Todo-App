import React from "react";
import styles from "./styles.module.css";

import Todo from "./Todo";

export default function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.main}>React Todo-App</h1>

      <Todo />
    </div>
  );
}
