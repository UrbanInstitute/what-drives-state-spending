import json

# def parseBlurb(blurb):
def parseSection(section, output):
	blurbs = []
	blurb = {}
	category = False
	sortedBy = False
	blurbText = False
	for line in section:
		if line.find("Category:") == 0:
			category = line.replace("Category:","").strip()
			if category not in output:
				output[category] = {}
			continue
		elif line.find("Sorted by:") == 0:
			sortedBy = line.replace("Sorted by:","").strip()
			if sortedBy not in output[category]:
				output[category][sortedBy] = []
			continue
		elif line != "\n" and category and sortedBy:
			# output[category][sortedBy].append(line)
			if line.find("Top left State:") == 0:
				if not blurb:
					blurb["top_left"] = {}
					blurb["bottom_right"] = {}
					blurb["text"] = ""

					blurb["top_left"]["state"] = line.replace("Top left State:","").strip()
				else:
					blurb = {}
					blurb["top_left"] = {}
					blurb["bottom_right"] = {}
					blurb["text"] = ""

					blurb["top_left"]["state"] = line.replace("Top left State:","").strip()
			elif line.find("Top left Column:") == 0:
				blurb["top_left"]["column"] = line.replace("Top left Column:","").strip()
			
			if line.find("Bottom right State:") == 0:
				blurb["bottom_right"]["state"] = line.replace("Bottom right State:","").strip()
			elif line.find("Bottom right Column:") == 0:
				blurb["bottom_right"]["column"] = line.replace("Bottom right Column:","").strip()
			elif line.find("Image:") == 0:
				blurb["image"] = line.replace("Image:","").strip()

			elif line.find("Blurb text starts here") != -1:
				blurbText = ""
				continue
			elif isinstance(blurbText, str) and line.find("Blurb text ends here") == -1:
				blurbText += line
			if line.find("Blurb text ends here") != -1:
				blurb["text"] = blurbText
				blurbText = False
				blurbs.append(blurb)
				
	for blurb in blurbs:
		output[category][sortedBy].append(blurb)



with open("templates/template_out.txt") as f:
	lines = f.readlines()
	output = {}
	sections = []
	section = []
	for line in lines:
		section.append(line)
		if line.find("END_SECTION") != -1:
			sections.append(section)
			section = []
	for section in sections:
		parseSection(section, output)

	with open('../data/blurbs/blurbs.js', 'w') as fp:
		fp.write("var blurbs = ")
		json.dump(output, fp, indent=2, sort_keys=True)