from bs4 import BeautifulSoup
import requests
import re
import time
import json

r = requests.get("https://genshin-impact.fandom.com/wiki/Character/List")
content = r.text
soup = BeautifulSoup(content, "html.parser")

tbody = soup.find_all("tbody")[0]
trs = tbody.find_all("tr")
stars_dict = {}
for i in range(1, len(trs)):
    stars = trs[i].find_all("td")[2].img["alt"][0]
    character_name = trs[i].find_all("td")[1].a["title"]
    stars_dict.update({character_name: stars})
    print(stars, character_name)

with open("stars_dict", "w") as f:
    f.write(json.dumps(stars_dict))

for i in range(1, len(trs)):
    if i == 1:
        img_url = trs[i].find_all("td")[0].a.img["src"]
    else:
        img_url = trs[i].find_all("td")[0].a.img["data-src"]
    character_name = trs[i].find_all("td")[1].a["title"]
    new_url = (
        img_url[: re.search("scale-to-width-down", img_url).span()[1] + 1]
        + "150"
        + img_url[re.search("scale-to-width-down", img_url).span()[1] + 3 :]
    )
    print(new_url, character_name)

    try:
        req = requests.get(new_url)
    except:
        time.sleep(2)
        req = requests.get(new_url)

    with open("character/" + character_name + ".png", "wb") as f:
        f.write(req.content)
