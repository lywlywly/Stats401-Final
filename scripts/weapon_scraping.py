from bs4 import BeautifulSoup
import requests
import re
import time

r = requests.get('https://genshin-impact.fandom.com/wiki/Weapon/List')
content = r.text
soup = BeautifulSoup(content, 'html.parser')
tbody = soup.find_all('tbody')[0]
trs = tbody.find_all("tr")


for i in range(1, len(trs)): 
    img_url = trs[i].find_all("td")[0].a.img['data-src']
    character_name = trs[i].find_all("td")[1].a["title"]
    new_url = img_url[:re.search("scale-to-width-down", img_url).span()[1]+1]+'150'+img_url[re.search("scale-to-width-down", img_url).span()[1]+3:]
    print(new_url, character_name)

    try:
        req = requests.get(new_url)
    except:
        time.sleep(2)
        req = requests.get(new_url)

    with open("weapon/" + character_name + ".png", "wb") as f:
        f.write(req.content)
    
