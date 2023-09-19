// let proxyServer = "http://vcm-33442.vm.duke.edu:8080/";
let proxyServer = "http://10.203.35.85:8080/";

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
    gachaCode,
    end_id,
  }: {
    authToken: any;
    gachaCode: any;
    end_id: any;
  } = {
    authToken: 1,
    gachaCode: 3,
    end_id: 4,
  }
): Promise<any> =>
  (
    await fetch(
      `${proxyServer}https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?win_mode=fullscreen&authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=${gachaCode}&gacha_id=b4ac24d133739b7b1d55173f30ccf980e0b73fc1&lang=en-us&device_type=mobile&game_version=CNRELiOS3.0.0_R10283122_S10446836_D10316937&plat_type=ios&game_biz=hk4e_cn&size=20&authkey=${authToken}&region=cn_gf01&timestamp=1664481732&gacha_type=${gachaCode}&end_id=${end_id}`
    )
  ).json();

var foo = async () => await Promise.resolve("ha");

// export function foo()
