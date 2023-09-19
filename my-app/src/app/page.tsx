"use client";
// import styles from "./page.module.css";
import { getForwardedGacha, getGacha } from "@/script/api/gacha";
import { useState } from "react";

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

  const getFirst = async () => {
    try {
      let data = await getForwardedGacha({
        authToken:
          "8NrolP3BfxIxpBNhBAtUSLvArHwKyxadx80H0ifXUs2pJSbUdBpEWztY%2FKtITRTfwJBLxH6m8YJsRIl5WBHwG5BwGw3SYMflxTMmF3gI%2F6W9DQIMZ8aYNOCN2RWHhF30KQ%2B3ZhQqxwI%2FEL%2BTWUjeFcbyeLglPhtVOjYpWOYPLNzC7M8EzZNpi3%2FrzD0EhLD%2BJZObVtQ6NsyRbXwyQqUVo6sgQnzKUXPJfa823ieTuOKcz1eO%2Ba5b%2FsDPszjo7izlWXaKxXLVshyTfjZDp%2BeNt22EK0q2IYVHrhvdfsHghZX%2F3vRXJjSaRT1JpFFNfHTlFruuC5YH28pU0qCGIgpyPA%3D%3D",
        gachaCode: 301,
        end_id: 0,
      });
      setGachaList(data);
      console.log(gachaList);
    } catch (e) {
      console.log(e);
    }
    console.log(gachaList);
    for (let entry of gachaList.data.list) {
      console.log(entry);
    }
    setTimeout(print, 3000);
  };

  const print = () => {
    for (let entry of gachaList.data.list) {
      console.log(entry);
    }
  };

  const next = async () => {
    try {
      let data = await getForwardedGacha({
        authToken:
          "8NrolP3BfxIxpBNhBAtUSLvArHwKyxadx80H0ifXUs2pJSbUdBpEWztY%2FKtITRTfwJBLxH6m8YJsRIl5WBHwG5BwGw3SYMflxTMmF3gI%2F6W9DQIMZ8aYNOCN2RWHhF30KQ%2B3ZhQqxwI%2FEL%2BTWUjeFcbyeLglPhtVOjYpWOYPLNzC7M8EzZNpi3%2FrzD0EhLD%2BJZObVtQ6NsyRbXwyQqUVo6sgQnzKUXPJfa823ieTuOKcz1eO%2Ba5b%2FsDPszjo7izlWXaKxXLVshyTfjZDp%2BeNt22EK0q2IYVHrhvdfsHghZX%2F3vRXJjSaRT1JpFFNfHTlFruuC5YH28pU0qCGIgpyPA%3D%3D",
        gachaCode: 301,
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

  return (
    <main>
      <button onClick={getFirst}>让飞告诉你!</button>
      <button onClick={next}>下一页!</button>

      <ul>
        {gachaList.data.list.map((entry) => (
          <li>
            <img src={getImgPath(entry.name)} width="50"></img> {entry.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
