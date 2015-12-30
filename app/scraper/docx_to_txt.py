import docx2txt
text = docx2txt.process("templates/spending_drivers_blurb_template.docx")

with open("templates/template_out.txt", "w") as f:
	f.write(text)