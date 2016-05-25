import csv
import xlrd
from operator import itemgetter

def collect(l, index):
   return map(itemgetter(index), l)

user = "bchartof"

BASE_PATH = "/Users/%s/Box Sync/COMM/**Project Folders**/Spending Drivers/Data Files"%user
FILENAMES = {
	"higher":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"corrections":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"medicaid":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"ssi":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"tanf":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"ccdf":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"housing":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"admin":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"resources":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"parks":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"electric":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"gas":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"sewage":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"waste":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"water":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"k12":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"fire":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"police":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"highway":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx",
	"transit":"All categories/2012_All_ratios_03.04.16_Presentation.xlsx"
}
TABNAMES = {
	"higher": "higher",
	"corrections": "corrections",
	"medicaid": "medicaid",
	"ssi": "ssi",
	"tanf": "tanf",
	"ccdf": "ccdf",
	"housing": "housing",
	"admin": "admin",
	"resources": "natural",
	"parks": "parks",
	"electric": "electric",
	"gas": "gas",
	"sewage": "sewerage",
	"waste": "waste",
	"water": "water",
	"k12": "k12",
	"fire": "fire",
	"police": "police",
	"highway": "highway",
	"transit": "transit"
}
STATES = {"MT": "Montana","WY": "Wyoming","NE": "Nebraska","ME": "Maine","ID": "Idaho","TN": "Tennessee","IN": "Indiana","MS": "Mississippi","OK": "Oklahoma","ND": "North Dakota","KY": "Kentucky","MO": "Missouri","AR": "Arkansas","WV": "West Virginia","SC": "South Carolina","HI": "Hawaii","NC": "North Carolina","LA": "Louisiana","WA": "Washington","AL": "Alabama","IL": "Illinois","KS": "Kansas","GA": "Georgia","UT": "Utah","OH": "Ohio","AZ": "Arizona","SD": "South Dakota","FL": "Florida","WI": "Wisconsin","VA": "Virginia","NH": "New Hampshire","NM": "New Mexico","DE": "Delaware","MA": "Massachusetts","TX": "Texas","RI": "Rhode Island","US": "United States","MI": "Michigan","VT": "Vermont","CO": "Colorado","MD": "Maryland","IA": "Iowa","OR": "Oregon","AK": "Alaska","NV": "Nevada","NY": "New York","DC": "District of Columbia","MN": "Minnesota","PA": "Pennsylvania","CT": "Connecticut","NJ": "New Jersey","CA" : "California"}
allColumns = {
	"higher": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"corrections": [("spending",2),("demographics",False),("eligibility",False),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"medicaid": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("spending-per",6)],
	"ssi": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("spending-per",6)],
	"tanf": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("spending-per",6)],
	"ccdf": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("units",6),("spending-per-u",7)],
	"housing": [("spending",2),("demographics",3),("eligibility",False),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"admin": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"resources": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"parks": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"electric": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"gas": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"sewage": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"waste": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"water": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"k12": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"fire": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",6),("payroll",7),("nonpayroll",8)],
	"police": [("spending",2),("demographics",False),("eligibility",False),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"highway": [("spending",2),("demographics",3),("eligibility",4),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)],
	"transit": [("spending",2),("demographics",3),("eligibility",False),("takeup",5),("units",6),("payroll",7),("nonpayroll",8)]
}

def parseBook(category):
	data = {}
	cw = csv.writer(open("../data/%s.csv"%category,"wb"))
	book = xlrd.open_workbook("%s/%s"%(BASE_PATH, FILENAMES[category]))
	sheets = book.sheet_names()
	xl_sheet = book.sheet_by_name(TABNAMES[category])
	columns = allColumns[category]

	for i in range(1, xl_sheet.nrows-3):
		row = xl_sheet.row(i)
		state = xl_sheet.cell_value(rowx=i, colx=0)
		if state == "":
			break;
		data[state] = {}
		for c in columns:
			if(c[1]):
				print category, c[1], xl_sheet.cell_value(rowx=i,colx=1)
				value = xl_sheet.cell_value(rowx=i,colx=c[1])
				t = xl_sheet.cell_type(rowx=i,colx=c[1])
				if(state == "ID" and category == "gas"):
					print value, t, i, c[1]
				if value == "." or value == "-":
					value = -999999999
				data[state]["%s_value"%c[0]] = value
				data[state]["%s_rank"%c[0]] = 0
				if c[0] not in data:
					data[c[0]] = []
				data[c[0]].append((state, value))
				data[c[0]] = sorted(data[c[0]],key=lambda x: x[1], reverse=True)
	n = -999999999;
	for state in data:
		if state in STATES:
			d = data[state]
			for k in d:
				if k.find("value") != -1:
					cat = k.split("_")[0]
					if d["%s_value"%cat] == -999999999:
						d["%s_rank"%cat] = n
						# n +=1;
					else:
						d["%s_rank"%cat] = collect(data[cat],0).index(state)+1

	header = ["state"]
	for c in columns:
		header.append("%s_value"%c[0])
		header.append("%s_rank"%c[0])
	cw.writerow(header)
	for state in STATES:
		row = [state]
		for c in columns:
			if(c[1]):
				row.append(data[state]["%s_value"%c[0]])
				row.append(data[state]["%s_rank"%c[0]])
			else:
				row.append("")
				row.append("")
		cw.writerow(row)

# parseBook("higher")
# parseBook("corrections")
for filename in FILENAMES:
	parseBook(filename)
