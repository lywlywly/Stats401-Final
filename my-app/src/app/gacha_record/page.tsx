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
function drawChart() {
  const data = [12, 5, 6, 6, 9, 10];
  const h = 120;
  const w = 250;
  const svg = d3.select("div").append("svg");
  console.log(d3.select("div"));
  svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-top", 50)
    .style("margin-left", 50);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d, i) => h - 10 * d)
    .attr("width", 20)
    .attr("height", (d, i) => d * 10)
    .attr("fill", "steelblue");
}
export default function Home() {
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
  const [authToken, setauthToken] = useState<string>("");
  const [server, setServer] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string[]>([]);

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
    getAll({
      authToken: authToken,
      server: server,
      gachaCode: 301,
      end_id: 0,
    });
  };

  const next = async () => {
    try {
      let data = await getForwardedGacha({
        authToken: authToken,
        server: server,
        gachaCode: 301,
        end_id: gachaList.data.list[19].id,
      });
      setGachaList(data);
      console.log(gachaList);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   next();
  // }, []);

  const getImgPath = (character_name: string) => {
    return `/characters/${character_name}.png`;
  };

  React.useEffect(() => {
    drawChart();
  });

  return (
    <main>
      {/* <button onClick={print}>print</button> */}
      <button onClick={getFirst}>让飞告诉你!</button>
      <button onClick={next}>下一页!</button>
      <button onClick={print}>print!</button>
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
      {server}
      <ul>
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
      </ul>
      <div></div>
    </main>
  );
}
