// let proxyServer = "http://vcm-33442.vm.duke.edu:8080/";
let proxyServer = "http://localhost:8080/";
import { ParsedURL, parseURL } from "../url_factory";
import stars_dict from "./stars_dict.json";

interface MyData {
  [key: string]: string;
}

const data_cast: MyData = stars_dict;
console.log(stars_dict);
console.log(data_cast);
interface ParsedUrlParemeters {
  [key: string]: any;
}

export function getParemetersFromUrl(url: string) {
  if (!url) url = location.search;
  var query = url.split("?")[1];
  var result: ParsedUrlParemeters = {};
  query.split("&").forEach(function (part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

export const test = (): Promise<Response> =>
  fetch(`https://jsonplaceholder.typicode.com/posts`);

export const getGacha = async (): Promise<any> =>
  (
    await fetch(
      `https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=zh-cn&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=hk4e_cn&size=20&authkey=8NrolP3BfxIxpBNhBAtUSLvArHwKyxadx80H0ifXUs2pJSbUdBpEWztY%2FKtITRTfwJBLxH6m8YJsRIl5WBHwG5BwGw3SYMflxTMmF3gI%2F6W9DQIMZ8aYNOCN2RWHhF30KQ%2B3ZhQqxwI%2FEL%2BTWUjeFcbyeLglPhtVOjYpWOYPLNzC7M8EzZNpi3%2FrzD0EhLD%2BJZObVtQ6NsyRbXwyQqUVo6sgQnzKUXPJfa823ieTuOKcz1eO%2Ba5b%2FsDPszjo7izlWXaKxXLVshyTfjZDp%2BeNt22EK0q2IYVHrhvdfsHghZX%2F3vRXJjSaRT1JpFFNfHTlFruuC5YH28pU0qCGIgpyPA%3D%3D&region=cn_gf01&timestamp=1664481732&gacha_type=200&page=1&end_id=0`
    )
  ).json();

export const getForwardedGacha = async (
  {
    authToken,
    server,
    gachaCode,
    language,
    end_id,
  }: {
    authToken: any;
    server: any;
    gachaCode: any;
    language: any;
    end_id: any;
  } = {
    authToken: 1,
    server: 0,
    gachaCode: 3,
    language: "en-US",
    end_id: 0,
  }
): Promise<any> => {
  let serverHost: String;
  console.log(end_id);
  switch (server) {
    case 0:
      // cn
      serverHost = "hk4e-api.mihoyo";
      break;
    case 1:
      // global
      serverHost = "hk4e-api-os.hoyoverse";
      break;
    default:
      serverHost = "hk4e-api.mihoyo";
  }
  const url = `https://${serverHost}.com/event/gacha_info/api/getGachaLog?authkey_ver=1&lang=${language}&gacha_type=301&size=20&end_id=${end_id}`;
  const parsedURL = parseURL(url);
  parsedURL.queryParams.authkey = authToken;
  const urlString = parsedURL.toURLString();
  console.log(urlString);
  return (await fetch(`${proxyServer}${urlString}`)).json();
};

export const getAll = async (
  {
    authToken,
    server,
    gachaCode,
    language,
    end_id,
  }: {
    authToken: any;
    server: any;
    gachaCode: any;
    language: any;
    end_id: any;
  } = {
    authToken: 1,
    server: 0,
    gachaCode: 3,
    language: "en-US",
    end_id: 4,
  }
): Promise<any> => {
  let last_id = 0;
  let data;
  let en_data;
  let result: string | any[] = [];
  let i = 1;
  // for (let i of Array.from({ length: 20 }, (x, i) => i))
  while (true) {
    console.log(i);
    i++;
    console.log(last_id);
    data = (
      await getForwardedGacha({
        authToken: authToken,
        server: server,
        gachaCode: gachaCode,
        language: language,
        end_id: last_id,
      })
    ).data.list;
    en_data = (
      await getForwardedGacha({
        authToken: authToken,
        server: server,
        gachaCode: gachaCode,
        language: "en-US",
        end_id: last_id,
      })
    ).data.list;
    if (data.length == 0) break;
    for (let i in data) {
      data[i].en_name = en_data[i].name;
    }
    result = result.concat(data);
    last_id = data[data.length - 1].id;
  }
  console.log(result);
  return result;
};

interface Map {
  [key: string]: number | undefined;
}

export const transform5Stars = (data: { name: "" }[]) => {
  let stars_dct: Map = { a: 1 };
  for (let e of data) {
    if ((data_cast[e.name] = "5")) {
    }
  }
};
