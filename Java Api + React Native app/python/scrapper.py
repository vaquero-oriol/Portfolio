from bs4 import BeautifulSoup
import requests
import json
import re

page = requests.get("https://ca.wikipedia.org/wiki/Llista_de_l%27art_p%C3%BAblic_de_l%27Eixample_de_Barcelona")

soup = BeautifulSoup(page.content, 'html.parser')

table = soup.find('table', {'class': 'wikitable'})

data = []
locations = []

for row in table.find_all('tr')[1:]:
    columns = row.find_all('td')

    title = columns[0].get_text(strip=True)
    description = columns[1].get_text(strip=True)

    author_date = columns[2].get_text(strip=True)

    material = columns[3].get_text(strip=True)
    location = columns[4].get_text(strip=True)

    location_match = re.search(r'(\d+\.\d+)°N,\s*(\d+\.\d+)°E', location)
    if location_match:
        latitude = float(location_match.group(1))
        longitude = float(location_match.group(2))
    else:
        latitude = None
        longitude = None

    image_url = "https:" + columns[6].find('img')['src'] if columns[6].find('img') else None

    entry = {
        "title": title,
        "description": description,
        "author_date": author_date,
        "material": material,
        "latitude": latitude,
        "longitude": longitude,
        "image_url": image_url
    }
    
    data.append(entry)
    

# json_data = json.dumps(data, ensure_ascii=False, indent=2)

# with open('data.json', 'w', encoding='utf-8') as json_file:
#    json_file.write(json_data)


db = requests.post('http://localhost:8080/statues', json=data)
print(db.text)