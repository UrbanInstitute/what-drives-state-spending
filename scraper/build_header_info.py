import csv
import json

cr = csv.reader(open("../data/annotations/headerInfo.csv", 'rU'))

data = {}
head = cr.next()
for row in cr:
  data[row[0]] = {}
  obj = data[row[0]]
  for i in range(1, len(row)):
    obj[head[i]] = row[i].strip()

with open('../data/annotations/headerInfo.js', 'w') as fp:
  fp.write("var HEADER_INFO = ")
  json.dump(data, fp, indent=2, sort_keys=True, ensure_ascii=False)