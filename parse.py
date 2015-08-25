#!/usr/bin/env python2.7

from bs4 import BeautifulSoup
import json
import sys

html = ''
for line in sys.stdin:
    html += line

html = html.replace('</tr>', '')
soup = BeautifulSoup(html, 'html.parser')

data = []
c = 0
col = {}
cells = soup.find('tbody').find_all('td')
for cell in cells:
    c += 1
    if c == 1:
        a = cell.find('a')
        col['crn'] = a.contents[0]
    elif c == 12:
        col['status'] = cell.contents[0]
        c = 0
        data.append(col)
        col = {}

print json.dumps(data)
