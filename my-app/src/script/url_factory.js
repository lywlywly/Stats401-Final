// const { URL, URLSearchParams } = require("url");
// const { URLSearchParams } = require("url");
// const URL = require("url").Url;

export class ParsedURL {
  constructor(url, parsedUrl) {
    console.log(parsedUrl);
    this.url = url;
    this.scheme = parsedUrl.protocol.replace(":", "");
    this.netloc = parsedUrl.hostname;
    this.path = parsedUrl.pathname;
    this.params = parsedUrl.pathname.split(";")[1] || "";
    this.query = parsedUrl.search.slice(1);
    this.fragment = parsedUrl.hash.slice(1);
    this.queryParams = Object.fromEntries(new URLSearchParams(this.query));
  }

  toURLString() {
    const query = new URLSearchParams(this.queryParams).toString().replaceAll("%25", "%");
    console.log(query);
    let urlString = `${this.scheme}://${this.netloc}${this.path}`;
    if (this.params) {
      urlString += `;${this.params}`;
    }
    if (query) {
      urlString += `?${query}`;
    }
    if (this.fragment) {
      urlString += `#${this.fragment}`;
    }
    return urlString;
  }
}

export function parseURL(url) {
  const parsedUrl = new URL(url);
  console.log(parsedUrl);
  return new ParsedURL(url, parsedUrl);
}

// // Example usage
// const url =
//   "https://www.example.com/path/to/resource;param1=value1?param2=value2&param3=value3#section1";
// const parsedURL = parseURL(url);

// console.log("Original URL:", url);
// console.log("Parsed URL:", parsedURL);

// // Convert the ParsedURL object back to a URL string
// const urlString = parsedURL.toURLString();
// console.log("Reconstructed URL:", urlString);
