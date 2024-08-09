import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function chatOnline() {
  return (
    <div className="chatOnline">
     
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src=""
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName"></span>
        </div>

    </div>
  )
}
