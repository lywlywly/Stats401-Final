"use client";
// import styles from "./page.module.css";
import {
  getForwardedGacha,
  getGacha,
  getParemetersFromUrl,
} from "@/script/api/gacha";
import { useState, useEffect } from "react";
import Image from "next/image";

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
  const [imgSrc, setImgSrc] = useState<string[]>(["/characters/no.png"]);

  const getFirst = async () => {
    console.log(
      getParemetersFromUrl(
        "https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=zh-cn&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=hk4e_cn&size=20&authkey=fW60Zw10LJ3LvRNV0HERP%2Bg9S6V8hMM1tzsu6ll5mnSnIccX0C17ccRnjMg5AphcGqXu1rlGFsN4yZFD7K0M1V3HQC6YCHc7b4ck87wkn7GZBMaY7TFXDRMi4lVpMB13OB6rUxB9DBtMUljR1JnJgjbEnUYUYWuefFOVNBbIeLcwcPSDtLCoa2I4hMXbWiLpYIRZT4L8I5OygDrRDbXp0E1Az%2F9Drzz8LqXRWqjdpjtjEJHQtOAmnsmGrAT2Jd%2BGzixRrsJu8e62M%2FFDofT1qM6%2BhjgUfLARfYOlJMxaAZbFr4Ennf9fnrvskz6MUM30F%2FwwigWwOCtGVPSqqrpEEg%3D%3D&region=cn_gf01&timestamp=1664481732&gacha_type=200&page=1&end_id=0"
      )
    );
    let list;
    try {
      let data = await getForwardedGacha({
        authToken:
          "594%2b5vaFl7NsG29Qx3ly8x%2b53PgAoYeVDTodawY0AUaSESNvqVzChA0gFKHDgvNOfKlbAdRNQLsq0gYIjrBRtpDguI3e%2bT2BoI1BsELhNjNmTArK78tQtqkrWglF3RrockNNaIoHXQhz7zL7VjOc4GSCQM2UYrMNEVTO5Xmv7kiaRe02OA3pld96YARdPlbWWiFy%2fhgrT77TeT7pPByGo1QGQGO0gF7WCXA1RK%2flvBT8dTEkgbQZPBk5KCHItrj7X2IWaRoYSKNnDQx5gZY9DXgc%2bNOK5RweaQTvFEWtSN7pVmiOSJTgpxafwmVXt3tWWQhWe7VAP9zlDH7cRfNDEVAvAj1lJv6uMnWfYU6OQjoO5rbSjF4DJlV30CTPbV2rwf%2fs6tvf%2bq6jLZEryk0VPiaPwoPgwc3lTvMN%2bUgcz6ruqoaBjM8nDGTAm9ODhJ9IhGJpOo4c8QL%2bgDFOe0jj5PFvzhkb6UuRyJM1UHx5vprOYlU9Dlvb64hVXbrSF2Sh6riC9wUci5wSRL0GoElWMDXZxnVU6cSasodoyla39w6iboM1Zp95ojSrI2oROIpNWl9yeIQYOWJiGE9r3%2bKVlj2aLnhFKsNcADyJBOefMN7fWEWpceh7iinJPrOc4u%2b0m9zFTJRhFwOF%2fQ3Km37RIMUXC3pCvEKZPquPP8TBoamNwRTyq1CtJmb2RlJslERAAjr%2b%2byXaqvL6mTI4L6dyXtPmexYdcAayTMUklkPbSBsFymZOz5LtPT6E%2fIVYLPPAQbIhdEpArfFxo8f4Xq5VmpibxRr0TKmm5SHDN8hxD8qaYEDTZ1Jf2HScI7XKz1x19S4Jdv71iXQHws6HvKcnwh2hwdOieS7gd633VZulsjHLk4Wh831OqDbJxw%2bT904FMWl18CZ7rAcVAdz3Tp1IfvPx43bvjrDWAdqFIhCB%2buFD3ouDlMb0ztU5i8xBRjcncXx1Dj2QlWV0P5il3aT3cI%2bujhExEASwnvyb28E%2fC86AqB%2b5ZpWwXi%2bR8A%2bVHxNVrkR63CmmcY4gsVqNQhCrjBTcZFn4ODGaW6u8McMnaG932u8J2S%2fmMhx8zSRCXr2T8zwh%2bGJ4qpq0fMUdFfd46z8IB6M%2blxP%2fakRzBHcO%2bmXOjqMD3ig3kvPWAUxRCJY3cJssLhHOp0fkCZmp0EwHWJzJltaXCJ%2b3LxMJIs1fjYMpOw3NMjiqp%2fsTqeVqOUkRpyqpd2dLuhRd5bJNqUqZnjiaN4g8sGCNPoFX%2bfFiHUE5rVrzekKj7Xk9oHhpryqiQEhXZ0WCh6VzqYuNz94HKOgVNyb2mvLazkvy3kuKOU%2fRKtDSSApZlTcEi%2fvOm4SaPUbP9rHBTMfgVbIm3GcYlw%3d%3d",
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
    console.log(imgSrc);
    // setTimeout(print, 3000);
  };

  const print = () => {
    for (let entry of gachaList.data.list) {
      console.log(entry);
      setImgSrc((previousState) => {
        return [...previousState, getImgPath(entry.name)];
      });
    }
    console.log(imgSrc);
    for (let entry of gachaList.data.list) {
      console.log(entry);
    }
  };

  const next = async () => {
    try {
      let data = await getForwardedGacha({
        authToken:
          "594%2b5vaFl7NsG29Qx3ly8x%2b53PgAoYeVDTodawY0AUaSESNvqVzChA0gFKHDgvNOfKlbAdRNQLsq0gYIjrBRtpDguI3e%2bT2BoI1BsELhNjNmTArK78tQtqkrWglF3RrockNNaIoHXQhz7zL7VjOc4GSCQM2UYrMNEVTO5Xmv7kiaRe02OA3pld96YARdPlbWWiFy%2fhgrT77TeT7pPByGo1QGQGO0gF7WCXA1RK%2flvBT8dTEkgbQZPBk5KCHItrj7X2IWaRoYSKNnDQx5gZY9DXgc%2bNOK5RweaQTvFEWtSN7pVmiOSJTgpxafwmVXt3tWWQhWe7VAP9zlDH7cRfNDEVAvAj1lJv6uMnWfYU6OQjoO5rbSjF4DJlV30CTPbV2rwf%2fs6tvf%2bq6jLZEryk0VPiaPwoPgwc3lTvMN%2bUgcz6ruqoaBjM8nDGTAm9ODhJ9IhGJpOo4c8QL%2bgDFOe0jj5PFvzhkb6UuRyJM1UHx5vprOYlU9Dlvb64hVXbrSF2Sh6riC9wUci5wSRL0GoElWMDXZxnVU6cSasodoyla39w6iboM1Zp95ojSrI2oROIpNWl9yeIQYOWJiGE9r3%2bKVlj2aLnhFKsNcADyJBOefMN7fWEWpceh7iinJPrOc4u%2b0m9zFTJRhFwOF%2fQ3Km37RIMUXC3pCvEKZPquPP8TBoamNwRTyq1CtJmb2RlJslERAAjr%2b%2byXaqvL6mTI4L6dyXtPmexYdcAayTMUklkPbSBsFymZOz5LtPT6E%2fIVYLPPAQbIhdEpArfFxo8f4Xq5VmpibxRr0TKmm5SHDN8hxD8qaYEDTZ1Jf2HScI7XKz1x19S4Jdv71iXQHws6HvKcnwh2hwdOieS7gd633VZulsjHLk4Wh831OqDbJxw%2bT904FMWl18CZ7rAcVAdz3Tp1IfvPx43bvjrDWAdqFIhCB%2buFD3ouDlMb0ztU5i8xBRjcncXx1Dj2QlWV0P5il3aT3cI%2bujhExEASwnvyb28E%2fC86AqB%2b5ZpWwXi%2bR8A%2bVHxNVrkR63CmmcY4gsVqNQhCrjBTcZFn4ODGaW6u8McMnaG932u8J2S%2fmMhx8zSRCXr2T8zwh%2bGJ4qpq0fMUdFfd46z8IB6M%2blxP%2fakRzBHcO%2bmXOjqMD3ig3kvPWAUxRCJY3cJssLhHOp0fkCZmp0EwHWJzJltaXCJ%2b3LxMJIs1fjYMpOw3NMjiqp%2fsTqeVqOUkRpyqpd2dLuhRd5bJNqUqZnjiaN4g8sGCNPoFX%2bfFiHUE5rVrzekKj7Xk9oHhpryqiQEhXZ0WCh6VzqYuNz94HKOgVNyb2mvLazkvy3kuKOU%2fRKtDSSApZlTcEi%2fvOm4SaPUbP9rHBTMfgVbIm3GcYlw%3d%3d",
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

  return (
    <main>
      {/* <button onClick={print}>print</button> */}
      <button onClick={getFirst}>让飞告诉你!</button>
      <button onClick={next}>下一页!</button>

      <ul>
        {gachaList.data.list.map((entry, i) => (
          <li key={i}>
            <Image
              src={imgSrc[i]}
              height="50"
              alt="f8fq"
              onError={({ currentTarget }) => {
                console.log(currentTarget);
                setImgSrc((previousState) => {
                  let data = [
                    ...previousState.slice(0, i),
                    "/loading.png",
                    ...previousState.slice(i + 1),
                  ];
                  return data;
                });
              }}
              width="50"
            ></Image>
            <h3>{entry.name}</h3>
          </li>
        ))}
      </ul>
    </main>
  );
}
