import csv
import xlrd
from operator import itemgetter

def collect(l, index):
   return map(itemgetter(index), l)

user = "bchartoff"

BASE_PATH = "/Users/%s/Box Sync/COMM/**Project Folders**/Spending Drivers/Data Files"%user
FILENAMES = {
	"higher":"higher/Data_higher_2012.xlsx",
	"corrections":"saftey/Corrections/Data_corrections_2012.xlsx",
	"medicaid": "health/Data_medicaid_2012.xlsx",
	"ssi": "social/Data_Public Welfare (SSI)_2012.xlsx",
	"tanf": "social/Data_Public Welfare (TANF - CCDF - SSBG)_2012.xlsx",
	"ccdf": "social/Data_Public Welfare (TANF - CCDF - SSBG)_2012.xlsx",
	"housing": "env/housing/Data_housing_2012.xlsx",
	"admin": "admin/Data_admin_2012.xlsx",
	"resources": "env/natural resources/Data_resource_2012.xlsx",
	"parks": "env/parks/Data_parks_2012.xlsx",
	"utilities": "env/utilities/Data_utilities_2012.xlsx",
	"k12": "k12/Data_k12_2012_v2.xlsx",
	"fire": "saftey/Fire/Data_fire_2012.xlsx",
	"police": "saftey/Police/Data_police_2012.xlsx",
	"highway": "transport/Highway/Data_highway_2012.xlsx",
	"transit": "transport/Transit/Data_transit_2012.xlsx"
}
TABNAMES = {
	"higher": "Ratios - Current",
	"corrections": "Ratios - Current",
	"medicaid": "Ratios - Total",
	"ssi": "Ratios - Total",
	"tanf": "Ratios - TANF",
	"ccdf": "Ratios - CCDF",
	"housing": "Ratios - Current",
	"admin": "Ratios - Current",
	"resources": "Ratios - Current",
	"parks": "Ratios - Current",
	"utilities": "Ratios - Current",
	"k12": "Ratios - Current",
	"fire": "Ratios - Current",
	"police": "Ratios - Current",
	"highway": "Ratios - Current",
	"transit": "Ratios - Current"
}
STATES = {"MT": "Montana","WY": "Wyoming","NE": "Nebraska","ME": "Maine","ID": "Idaho","TN": "Tennessee","IN": "Indiana","MS": "Mississippi","OK": "Oklahoma","ND": "North Dakota","KY": "Kentucky","MO": "Missouri","AR": "Arkansas","WV": "West Virginia","SC": "South Carolina","HI": "Hawaii","NC": "North Carolina","LA": "Louisiana","WA": "Washington","AL": "Alabama","IL": "Illinois","KS": "Kansas","GA": "Georgia","UT": "Utah","OH": "Ohio","AZ": "Arizona","SD": "South Dakota","FL": "Florida","WI": "Wisconsin","VA": "Virginia","NH": "New Hampshire","NM": "New Mexico","DE": "Delaware","MA": "Massachusetts","TX": "Texas","RI": "Rhode Island","US": "United States","MI": "Michigan","VT": "Vermont","CO": "Colorado","MD": "Maryland","IA": "Iowa","OR": "Oregon","AK": "Alaska","NV": "Nevada","NY": "New York","DC": "District of Columbia","MN": "Minnesota","PA": "Pennsylvania","CT": "Connecticut","NJ": "New Jersey","CA" : "California"}
allColumns = {
	"higher": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("units",16),("payroll",20),("nonpayroll",21)],
	"corrections": [("spending",2),("demographics",False),("eligibility",False),("takeup",13),("units",16),("payroll",20),("nonpayroll",21)],
	"medicaid": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("spending-per",6)],
	"ssi": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("spending-per",6)],
	"tanf": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("spending-per",6)],
	"ccdf": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("units",16),("spending-per",6)],
	"housing": [("spending",2),("demographics",9),("eligibility",False),("takeup",13),("units",16),("payroll",20),("nonpayroll",21)],
	"admin": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",16),("payroll",20),("nonpayroll",21)],
	"resources": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",16),("payroll",20),("nonpayroll",21)],
	"parks": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",16),("payroll",20),("nonpayroll",21)],
	"utilities": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",16),("payroll",20),("nonpayroll",21)],
	"k12": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("units",16),("payroll",20),("nonpayroll",21)],
	"fire": [("spending",2),("demographics",False),("eligibility",False),("takeup",False),("units",16),("payroll",20),("nonpayroll",21)],
	"police": [("spending",2),("demographics",False),("eligibility",False),("takeup",13),("units",16),("payroll",20),("nonpayroll",21)],
	"highway": [("spending",2),("demographics",9),("eligibility",11),("takeup",13),("units",16),("payroll",23),("nonpayroll",24)],
	"transit": [("spending",2),("demographics",9),("eligibility",False),("takeup",13),("units",16),("payroll",23),("nonpayroll",24)]
}

def parseBook(category):
	data = {}
	cw = csv.writer(open("../data/%s.csv"%category,"wb"))
	book = xlrd.open_workbook("%s/%s"%(BASE_PATH, FILENAMES[category]))
	sheets = book.sheet_names()
	xl_sheet = book.sheet_by_name(TABNAMES[category])
	columns = allColumns[category]

	for i in range(2, xl_sheet.nrows):
		row = xl_sheet.row(i)
		state = xl_sheet.cell_value(rowx=i, colx=0)
		if state == "":
			break;
		data[state] = {}
		for c in columns:
			if(c[1]):
				value = xl_sheet.cell_value(rowx=i,colx=c[1])
				data[state]["%s_value"%c[0]] = value
				data[state]["%s_rank"%c[0]] = 0
				if c[0] not in data:
					data[c[0]] = []
				data[c[0]].append((state, value))
				data[c[0]] = sorted(data[c[0]],key=lambda x: x[1], reverse=True)
	for state in data:
		if state in STATES:
			d = data[state]
			for k in d:
				if k.find("value") != -1:
					cat = k.split("_")[0]
					if d["%s_value"%cat] == "Missing Data":
						d["%s_rank"%cat] = 99
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
