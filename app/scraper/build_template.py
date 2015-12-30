from loremipsum import generate_paragraph
cats = [("higher",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("corrections",[("spending",True),("demographics",False),("eligibility",False),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("medicaid",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("spending",True)]),
("ssi",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("spending",True)]),
("tanf",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("spending",True)]),
("ccdf",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("units",True),("spending",True)]),
("housing",[("spending",True),("demographics",True),("eligibility",False),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("admin",[("spending",True),("demographics",False),("eligibility",False),("takeup",False),("units",True),("payroll",True),("nonpayroll",True)]),
("resources",[("spending",True),("demographics",False),("eligibility",False),("takeup",False),("units",True),("payroll",True),("nonpayroll",True)]),
("parks",[("spending",True),("demographics",False),("eligibility",False),("takeup",False),("units",True),("payroll",True),("nonpayroll",True)]),
("utilities",[("spending",True),("demographics",False),("eligibility",False),("takeup",False),("units",True),("payroll",True),("nonpayroll",True)]),
("k12",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("fire",[("spending",True),("demographics",False),("eligibility",False),("takeup",False),("units",True),("payroll",True),("nonpayroll",True)]),
("police",[("spending",True),("demographics",False),("eligibility",False),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("highway",[("spending",True),("demographics",True),("eligibility",True),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)]),
("transit",[("spending",True),("demographics",True),("eligibility",False),("takeup",True),("units",True),("payroll",True),("nonpayroll",True)])]

# lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis"

with open("templates/template.txt", "w") as f:
	for c in cats:
		cat = c[0]
		cols = c[1]

		for col in cols:
			lorem = generate_paragraph()
			while lorem[1] < 60 or lorem[1] > 70:
				lorem = generate_paragraph()
			if  col[1]:
				f.write("####### START_SECTION #######\n")
				f.write("Category: %s\n"%cat)
				f.write("Sorted by: %s\n\n"%col[0])

				f.write("Top left State:\n")
				f.write("Top left Column:\n\n")

				f.write("Bottom right State:\n")
				f.write("Bottom right Column:\n\n")

				f.write("### Blurb text starts here ###\n")
				f.write("%s\n"%lorem[2])
				f.write("### Blurb text ends here ###\n\n")
				f.write("####### END_SECTION #######\n\n\n")


