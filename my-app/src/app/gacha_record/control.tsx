"use client";
import { useState } from "react";
import * as React from "react";

export const Control = function (props: {
  print: React.MouseEventHandler<HTMLButtonElement> | undefined;
  launch: React.MouseEventHandler<HTMLButtonElement> | undefined;
  pause: React.MouseEventHandler<HTMLButtonElement> | undefined;
  setauthToken: (arg0: string) => void;
  setServer: (arg0: number) => void;
  interval: { current: number };
  onToggleChange: (arg0: boolean) => void;
  setBannerId: (arg0: string) => void;
}): React.JSX.Element {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <button onClick={props.launch}>launch</button>
      <button onClick={props.pause}>pause</button>
      <input
        type="text"
        onChange={(e) => {
          props.setauthToken(e.target.value);
        }}
      ></input>
      <button onClick={props.print}>get data</button>
      <select
        onChange={(e) => {
          switch (e.target.value) {
            case "cn":
              props.setServer(0);
              break;
            case "global":
              props.setServer(1);
              break;
            default:
              props.setServer(0);
          }
        }}
      >
        <option value="cn">cn</option>
        <option value="global">global</option>
      </select>
      <select
        onChange={(e) => {
          switch (e.target.value) {
            case "event":
              props.setBannerId("301");
              break;
            case "permanent":
              props.setBannerId("200");
              break;
            case "weapon":
              props.setBannerId("302");
              break;
            default:
              props.setBannerId("301");
          }
        }}
      >
        <option value="event">event</option>
        <option value="permanent">permanent</option>
        <option value="weapon">weapon</option>
      </select>
      <input
        type="range"
        onChange={(e) => {
          props.interval.current = Math.round(
            Math.pow(Math.pow(1000, 1 / 100), parseInt(e.target.value))
          );
        }}
      ></input>
      <div style={{ display: "inline" }}>
        <label className="switch">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              props.onToggleChange(!checked);
              setChecked(!checked);
            }}
          ></input>
          <span className="slider round"></span>
        </label>
        demo mode
      </div>
    </>
  );
};
