import React from "react";
import './style.css'

export default function Loading() {
  return (
   <div className="app">
     <div className="loading">
      <span data-text="N">N</span>
      <span data-text="H">H</span>
      <span data-text="U">U</span>
      <span data-text="N">N</span>
    </div>
   </div>
  );
}
