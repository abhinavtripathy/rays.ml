import csv
import shutil
import os.path
from os import path

with open('./data/Data_Entry_2017.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    ogDir = "./data/images6/"
    newDir = "./data/Pleural_Thickening/"
    for row in csv_reader:
        if line_count > -1:
            if str({row["Finding Labels"]}).find("Pleural_Thickening") > -1:
                imgSet = str({row['Image Index']})
                imgFileName = imgSet[6:-3]
                if (path.exists(ogDir + imgFileName)):
                    print(imgFileName)
                    shutil.move(ogDir + imgFileName, newDir + imgFileName)
        line_count += 1
