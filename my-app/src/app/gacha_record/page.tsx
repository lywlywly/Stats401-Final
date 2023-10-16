"use client";
// import styles from "./page.module.css";
import {
  getForwardedGacha,
  getGacha,
  getParemetersFromUrl,
  getAll,
  asyncLoop,
} from "@/script/api/gacha";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as React from "react";
import useInterval from "react-useinterval";
import local_record from "./local_record.json";
import "./styles.css";
import { Control } from "./control";
import { D3Graph } from "./d3Graph";

export interface GachaItem {
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

export const regular = [
  "Dehya",
  "Diluc",
  "Jean",
  "Keqing",
  "Klee",
  "Mona",
  "Qiqi",
  "Tighnari",
];

export default function Home(): React.JSX.Element {
  const [authToken, setauthToken] = useState<string>("");
  const [server, setServer] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [allProcessedData, setAllProcessedData] = useState<GachaItem[]>();
  const [allRequestedData, setAllRequestedData] = useState<GachaItem[]>();
  const [progress, setProgress] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setAllProcessedData(fiveStarItems);
  }

  const requestData = async () => {
    let allGachaResult = await getAll({
      authToken: authToken,
      server: server,
      gachaCode: 301,
      language: "zh-CN",
      end_id: 0,
      onProgress: (p: string) => {
        setProgress(p);
      },
      setIsLoadingCallBack: (l: boolean) => {
        setIsLoading(l);
      },
      progress: progress,
    });
    console.log(allGachaResult);
    setAllRequestedData(allGachaResult);
  };

  const print = () => requestData();

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
  const [useLocalData, setUseLocalData] = useState<boolean>(true);
  const [idx, setIdx] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const interval = React.useRef(50);

  useInterval(
    () => {
      // without this line, this piece of code is always running
      let reversedRecord;
      if (useLocalData) {
        reversedRecord = local_record?.toReversed();
      } else {
        reversedRecord = allRequestedData?.toReversed();
      }
      if (reversedRecord == undefined) {
        setIsRunning(false);
      }
      if (idx == local_record.length) setIsRunning(false);
      setIdx((idx) => idx + 1);
      generateFiveStarData(reversedRecord!.slice(0, idx));
    },
    isRunning ? interval.current : null
  );

  const getQualifier = (num: string) => {
    switch (num.at(-1)) {
      case "1":
        return "st";
      case "2":
        return "nd";
      case "3":
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <main>
      <Control
        print={print}
        launch={launch}
        pause={pause}
        setauthToken={setauthToken}
        setServer={setServer}
        interval={interval}
        onToggleChange={setUseLocalData}
      ></Control>
      <>
        {isLoading ? (
          <h1>
            loading {progress}
            {getQualifier(progress)} page
          </h1>
        ) : (
          <></>
        )}
      </>
      <D3Graph allData={allProcessedData}></D3Graph>
    </main>
  );
}
