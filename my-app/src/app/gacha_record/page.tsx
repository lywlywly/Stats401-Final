"use client";
// import styles from "./page.module.css";
import {
  getForwardedGacha,
  getGacha,
  getParemetersFromUrl,
  getAll,
} from "@/script/api/gacha";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as React from "react";
import * as d3 from "d3";
import useInterval from "react-useinterval";
import local_record from "./local_record.json";
interface GachaItem {
  uid: string;
  index?: number;
  draws?: number;
  gacha_type: string;
  item_id: string;
  count: string;
  time: string;
  name: string;
  en_name?: string;
  lang: string;
  item_type: string;
  rank_type: string;
  id: string;
}

const regular = [
  "Dehya",
  "Diluc",
  "Jean",
  "Keqing",
  "Klee",
  "Mona",
  "Qiqi",
  "Tighnari",
];

const Control = function (props: {
  print: React.MouseEventHandler<HTMLButtonElement> | undefined;
  launch: React.MouseEventHandler<HTMLButtonElement> | undefined;
  pause: React.MouseEventHandler<HTMLButtonElement> | undefined;
  setauthToken: (arg0: string) => void;
  setServer: (arg0: number) => void;
  interval: { current: number };
}): React.JSX.Element {
  return (
    <>
      {" "}
      <button onClick={props.print}>print!</button>
      <button onClick={props.launch}>launch</button>
      <button onClick={props.pause}>pause</button>
      <input
        type="text"
        onChange={(e) => {
          props.setauthToken(e.target.value);
        }}
      ></input>
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
      <input
        type="range"
        onChange={(e) => {
          props.interval.current = Math.round(
            Math.pow(Math.pow(1000, 1 / 100), parseInt(e.target.value))
          );
        }}
      ></input>
    </>
  );
};

const D3Graph = function (props: { allData: GachaItem[] }): React.JSX.Element {
  function drawChart() {
    const h = 1080;
    const w = 1080;
    d3.select("div").select("svg").remove();
    const svg = d3.select("div").append("svg");
    // console.log(allData.length);
    // if (allData.length == 1) return;
    svg
      .append("text")
      .attr("y", 20)
      .attr("x", 100)
      .style("fill", "#ff698d")
      .text(props.allData[props.allData.length - 1]?.time);

    svg
      .attr("width", w)
      .attr("height", h)
      .style("margin-top", 50)
      .style("margin-left", 50);
    svg
      .selectAll("rect")
      .data(props.allData)
      .enter()
      .append("rect")
      .attr("y", (d, i) => i * 60 + 30)
      .attr("x", (d, i) => 100)
      .attr("width", (d, i) => {
        return 10 * (d.draws ?? 0);
      })
      .attr("height", (d, i) => 15)
      .attr("fill", (d, i) => {
        if (d.draws! > 70) return "red";
        else if (d.draws! < 50) return "green";
        return "yellow";
      });

    // svg
    //   .selectAll("text")
    //   .data(allData)
    //   .enter()
    //   .append("text")
    //   .attr("y", (d, i) => i * 60 + 14)
    //   .attr("x", (d, i) => 0)
    //   .style("fill", "#ff698d");
    svg
      .selectAll("text")
      .data(props.allData)
      .enter()
      .append("text")
      .attr("y", (d, i) => i * 60 + 40)
      .attr("x", (d, i) => 1000)
      .style("fill", "#ff698d")
      .text((d, i) => {
        if (regular.includes(d.name)) return "歪";
        return "";
      });

    svg
      .selectAll("image")
      .data(props.allData)
      .enter()
      .append("image")
      .attr("y", (d, i) => i * 60 + 20)
      .attr("x", (d, i) => 0)
      .attr("width", 40)
      .attr("height", 40)
      .attr("href", (d, i) => `/characters/${d.name}.png`)
      .append("title")
      .text((d, i) => `${d.name} - ${d.time}`);
  }
  React.useEffect(() => {
    drawChart();
  }, [props.allData]);

  return (
    <div>
      <svg></svg>
    </div>
  );
};

export default function Home(): React.JSX.Element {
  const [authToken, setauthToken] = useState<string>("");
  const [server, setServer] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [allData, setAllData] = useState<GachaItem[]>([
    {
      uid: "",
      gacha_type: "",
      item_id: "",
      count: "",
      time: "",
      name: "321",
      lang: "",
      item_type: "",
      rank_type: "",
      id: "",
    },
  ]);

  type ItemType = "Weapon" | "Armor" | "Accessory"; // Adjust the possible item types accordingly

  function generateFiveStarData(gachaDataCurrent: GachaItem[]) {
    const fiveStarItems: GachaItem[] = [];
    for (let i = 0; i < gachaDataCurrent.length; i++) {
      let item = gachaDataCurrent[i];
      item.index = i;
      // pop current non 5-star entry
      if (fiveStarItems[fiveStarItems.length - 1]?.rank_type != "5") {
        fiveStarItems.pop();
      }
      item.draws =
        item.index - (fiveStarItems[fiveStarItems.length - 1]?.index! ?? 0);
      fiveStarItems.push(item);
    }
    setAllData(fiveStarItems);
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const print = () => {
    let allGachaResult = getAll({
      authToken: authToken,
      server: server,
      gachaCode: 301,
      language: "zh-CN",
      end_id: 0,
    });
    console.log(allGachaResult);
  };

  const launch = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const getImgPath = (character_name: string) => {
    return `/characters/${character_name}.png`;
  };

  // TODO
  const [idx, setIdx] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const interval = React.useRef(50);

  useInterval(
    () => {
      // without this line, this piece of code is always running
      let reversedRecord = local_record.toReversed();
      if (idx == local_record.length) setIsRunning(false);
      setIdx((idx) => idx + 1);
      generateFiveStarData(reversedRecord.slice(0, idx));
    },
    isRunning ? interval.current : null
  );

  return (
    <main>
      <Control
        print={print}
        launch={launch}
        pause={pause}
        setauthToken={setauthToken}
        setServer={setServer}
        interval={interval}
      ></Control>
      <D3Graph allData={allData}></D3Graph>
    </main>
  );
}
