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

function init() {}
export default function Home() {
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
      .text(allData[allData.length - 1]?.time);

    svg
      .attr("width", w)
      .attr("height", h)
      .style("margin-top", 50)
      .style("margin-left", 50);
    svg
      .selectAll("rect")
      .data(allData)
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
      .data(allData)
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
      .data(allData)
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

  const [gachaList, setGachaList] = useState({
    data: {
      list: [
        {
          uid: "",
          gacha_type: "200",
          name: "",
          time: "2023-09-13 15:00:00",
          item_type: "武器",
          lang: "zh-cn",
          rank_type: "3",
          id: "1694588760000046658",
        },
      ],
    },
  });

  type ItemType = "Weapon" | "Armor" | "Accessory"; // Adjust the possible item types accordingly

  // console.log(all);
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

  const getFirst = async () => {
    console.log(
      getParemetersFromUrl(
        "https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=zh-cn&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=hk4e_cn&size=20&authkey=fW60Zw10LJ3LvRNV0HERP%2Bg9S6V8hMM1tzsu6ll5mnSnIccX0C17ccRnjMg5AphcGqXu1rlGFsN4yZFD7K0M1V3HQC6YCHc7b4ck87wkn7GZBMaY7TFXDRMi4lVpMB13OB6rUxB9DBtMUljR1JnJgjbEnUYUYWuefFOVNBbIeLcwcPSDtLCoa2I4hMXbWiLpYIRZT4L8I5OygDrRDbXp0E1Az%2F9Drzz8LqXRWqjdpjtjEJHQtOAmnsmGrAT2Jd%2BGzixRrsJu8e62M%2FFDofT1qM6%2BhjgUfLARfYOlJMxaAZbFr4Ennf9fnrvskz6MUM30F%2FwwigWwOCtGVPSqqrpEEg%3D%3D&region=cn_gf01&timestamp=1664481732&gacha_type=200&page=1&end_id=0"
      )
    );
    let list;
    try {
      let data = await getForwardedGacha({
        authToken: authToken,
        server: server,
        gachaCode: 301,
        language: "zh-CN",
        end_id: 0,
      });
      setGachaList(data);
      list = data;
      console.log(gachaList);
    } catch (e) {
      console.log(e);
    }
    console.log(gachaList);
    for (let entry of list.data.list) {
      console.log(entry);
      setImgSrc((previousState) => {
        return [...previousState, getImgPath(entry.name)];
      });
    }
    // console.log(imgSrc);
    // setTimeout(print, 3000);
  };

  const print = () => {
    // console.log(gachaList);
    // console.log(imgSrc);
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

  const next = async () => {
    try {
      let data = await getForwardedGacha({
        authToken: authToken,
        server: server,
        gachaCode: 301,
        language: "zh-CN",
        end_id: gachaList.data.list[19].id,
      });
      setGachaList(data);
      console.log(gachaList);
    } catch (e) {
      console.log(e);
    }
  };

  const getImgPath = (character_name: string) => {
    return `/characters/${character_name}.png`;
  };

  React.useEffect(() => {
    drawChart();
  }, [allData]);

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
      {/* <button onClick={print}>print</button> */}
      {/* <button onClick={getFirst}>让飞告诉你!</button>
      <button onClick={next}>下一页!</button>
      <button onClick={print}>print!</button> */}
      <button onClick={launch}>launch</button>
      <button onClick={pause}>pause</button>
      <input
        type="text"
        onChange={(e) => {
          setauthToken(e.target.value);
        }}
      ></input>
      <select
        onChange={(e) => {
          switch (e.target.value) {
            case "cn":
              setServer(0);
              break;
            case "global":
              setServer(1);
              break;
            default:
              setServer(0);
          }
        }}
      >
        <option value="cn">cn</option>
        <option value="global">global</option>
      </select>
      {/* {server} */}
      <input
        type="range"
        onChange={(e) => {
          // setInterval(
          //   Math.round(
          //     Math.pow(Math.pow(1000, 1 / 100), parseInt(e.target.value))
          //   )
          // );

          interval.current = Math.round(
            Math.pow(Math.pow(1000, 1 / 100), parseInt(e.target.value))
          );

          // if (isRunning) {
          //   pause();
          //   sleep(100).then(launch);
          // }
        }}
      ></input>
      {/* <ul>
        {gachaList.data.list.map((entry, i) => (
          <li key={i}>
            <Image
              src={imgSrc[i]}
              height="50"
              alt="f8fq"
              // onError={({ currentTarget }) => {
              //   console.log(currentTarget);
              //   setImgSrc((previousState) => {
              //     let data = [
              //       ...previousState.slice(0, i),
              //       "/loading.png",
              //       ...previousState.slice(i + 1),
              //     ];
              //     return data;
              //   });
              // }}
              width="50"
            ></Image>
            <h3>{entry.name}</h3>
          </li>
        ))}
      </ul> */}
      <div>
        <svg></svg>
      </div>
    </main>
  );
}
