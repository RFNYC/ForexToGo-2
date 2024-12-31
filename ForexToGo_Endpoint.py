from selenium import webdriver
from selenium.webdriver.common.by import By
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import socket
import datetime
import json

# This projects makes use of mongodb to store data temporarily, This is the "connection string".
uri = "mongodb+srv://rftestingnyc:<db_password>@forextogo.1fg9b.mongodb.net/?retryWrites=true&w=majority&appName=ForexToGo"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection to MongoDB
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# To write in here you need to change your python interpereter to the one inside the .venv file in Forex-Project.
# because a .venv is an isolated environment from all the other versions of python and packages on the machine using any other interpereter will
# cause errors when trying to write/run code here.

# import flask class
from flask import Flask, request

# Creates an instance of the flask class framework and saves it in a var "app" to be called later.
app = Flask(__name__)

# Get the local machine name
hostname = socket.gethostname()
# Get the local IP address of the machine, will be used for server routing so that all devices on local network can access it.
ip_address = socket.gethostbyname(hostname)

#---------------------------------------------------------------------------------------------------------------------------------------------------

# MAIN PAGE 

# app.route("/") creates a tab. Editing it creates a branch. So app.route("/hello") will display what you wrote at http://127.0.0.1:5000/hello
@app.route("/")
def main_page():

    return ("<p>This is the main page.</p>" 
        f"<a href='http://{ip_address}:5000/data'>visit data</a>")

#---------------------------------------------------------------------------------------------------------------------------------------------------

# DATA-SCRAPING PAGE:
url = "https://www.forexfactory.com"

"""
Creates a new instance of the chrome driver and saves it for later use. My understanding is that a driver is a version of the browser controlled
by python which can access and interact with websites the same way an organic user would. This is pivotal to the success of the project.
"""
driver = webdriver.Chrome()

# Tells driver to navigate to forexfactory.
driver.get(url)

# Zeroes in on the table, specifically the element that tells you each event.
# The currency element containing text had more than one class and no ID, that caused errors when searching by classname. Switched to CSS selector.
News_Event_Titles_List = driver.find_elements(By.CLASS_NAME, 'calendar__event-title')
Currencies_Impacted_List = driver.find_elements(By.CSS_SELECTOR, 'td.calendar__currency')
Calendar_Time_List = driver.find_elements(By.CSS_SELECTOR, 'td.calendar__time')

# Because Forex factory didn't give a unique ID to the Impact icons I needed to first find its parent element, then save its first child.
# It's first child has a title attribute that gives you pop-up text that correlates to the impact level. I grab this title in my for-loop later.
Event_Impact_Level_Icons = driver.find_elements(By.CSS_SELECTOR, 'td.calendar__impact')
Impact_level_DOM_title = Event_Impact_Level_Icons[0].find_element(By.TAG_NAME, 'span')

# Dictionaries for the scraped data to be stored temporarily before being sent to MongoDB.
News_Event_Title_Dictionary = {

}

Currencies_Impacted_Dictionary = {

}

Event_Impact_Level_Dictionary = {

}

Calendar_Time_Dict = {

}

# Locates the database and collection where data is to be stored on Mongodb
data_base = client["forex"]
collection_file = data_base['collection']

# How to Query in MongoDB Examples:
    # documentID_X = ObjectId("target-document-id")
    # query_filter = { "_id": documentID_X})
    # Search by an ID: collection_file.replace_one(query_filter, your_new_data)

    # Search by keys: collection_file.find_one({ "<key/field>": "info/value" })


# The number of dictionaries aka documents saved to Mongodb
dictionary_count = collection_file.count_documents({})

# for-loop to extract data from the page and save it in the beforementioned dict.
'''
In python for-loops the iterator (the first variable) can be named anything. In this case I named it news entry. This basically says:
For each individual number, corresponding to the amount of items in this list, do a thing. 

So for each number (news_entry_num), corresponding to the number news event it is on the page (len(News_Event_Title)),
print News_Event_Title indexed with the number of this iteration.
'''
for news_entry_num in range(len(News_Event_Titles_List)):

    # Adds a new entry to the dictionary based on the iteration number and the forex information we scraped. 
    News_Event_Title_Dictionary[f"News-Event-Cell{news_entry_num}"] = f"{News_Event_Titles_List[news_entry_num].text}"
    Currencies_Impacted_Dictionary[f"Currency-Impacted-Cell{news_entry_num}"] = f"{Currencies_Impacted_List[news_entry_num].text}"
    Impact_level_DOM_title = Event_Impact_Level_Icons[news_entry_num].find_element(By.TAG_NAME, 'span')
    Event_Impact_Level_Dictionary[f"Impact-Level-Cell{news_entry_num}"] = f"{Impact_level_DOM_title.get_attribute('title')}"
    Calendar_Time_Dict[f"Calendar-Time-Cell{news_entry_num}"] = f"{Calendar_Time_List[news_entry_num].text}"

# Using collection_file.find_one(query_filter) produces a none type which caused errors so I had to get each document again manually.
# I figured out that when the script is run again, if the data is replaced, so is the ID. Adding a custom ID works around this
# This for adds a custom ID entry so that regardless of if the MongoDB set ID or scraped info ever changes I can still call dictionaries later.
News_Event_Title_Dictionary["MyID"] = "News_Dictionary"
Currencies_Impacted_Dictionary["MyID"] = "Currency_Dictionary"
Event_Impact_Level_Dictionary["MyID"] = "Impact_Dictionary"
Calendar_Time_Dict["MyID"] = "Time_Dictionary"

'''
Because I didn't understand how to delete files automatically via MongoDB's expiration/timeseries system I opted to use an impromptu timestamp
system to get the job done. Everytime I upload scraped data to MongoDB I will include a timestamp of the date it was posted. Using this time-
stamp I will compare the current day to the day the data was posted on. If these dates are not the same I will replace the information on
MongoDB with new information.
'''

# Adding the date posted timestamp to the first dictionary of the collection, and keeping track of the time this script is run.
posted_time = str(datetime.datetime.now())
News_Event_Title_Dictionary["timestamp"] = f"{posted_time}"

"""
This system runs on the assumption that a timestamp already exists. When a timestamp is first uploaded to the dictionary datetime is considered 
the date it was posted. The nth time this script is run we are simply comparing. There should be a timestamp from the previous time we uploaded
datetime, we will compare that to the current datetime.now, or in other words the date right now, to see if they are different.
"""
# This is the string showing todays date in the form 2024-11-14.
current_time = str(datetime.datetime.now)
date_today = (current_time[0:10])

#json.dumps() turns the dictionary into raw JSON data which is easier to transfer.
shareable_data = json.dumps(News_Event_Title_Dictionary)
shareable_data2 = json.dumps(Currencies_Impacted_Dictionary)
shareable_data3 = json.dumps(Event_Impact_Level_Dictionary)

# Here are the Search filters to each dictionary:
query_filter1 = {"MyID": "News_Dictionary"}
query_filter2 = {"MyID": "Currency_Dictionary"}
query_filter3 = {"MyID": "Impact_Dictionary"}
query_filter4 = {"MyID": "Time_Dictionary"}

# Gets the {"timestamp":"<date>"} entry info from MongoDB and saves the date "20YY-MM-DD" into date_posted
get_timestamp = collection_file.distinct("timestamp")
timestamp = get_timestamp[0]
date_posted = timestamp[0:10]

# I only ever want there to be 3 entries each day. If there are already 3 entries from the same day, nothing is added.
if dictionary_count < 4:
    # Inserting each dict. into MongoDB, I'm not sure why but collection.insert_many(d1,d2,d3) didnt work so I did it separately.
    a = collection_file.insert_one(News_Event_Title_Dictionary) 
    b = collection_file.insert_one(Currencies_Impacted_Dictionary)
    c = collection_file.insert_one(Event_Impact_Level_Dictionary)
    d = collection_file.insert_one(Calendar_Time_Dict)
elif dictionary_count >= 4:
    if date_today != date_posted:
        collection_file.replace_one(query_filter1, News_Event_Title_Dictionary)
        collection_file.replace_one(query_filter2, Currencies_Impacted_Dictionary)
        collection_file.replace_one(query_filter3, Event_Impact_Level_Dictionary)
        collection_file.replace_one(query_filter4, Calendar_Time_Dict)
elif dictionary_count >= 4 and date_today == date_posted:
    print("Forex data is already on MongoDB. Nothing will be changed.")
else:
    print("Some error has occured.")

# Finds the documents I need and turns them into strings. If I don't returning these variables throws an error.
News_doc = str(collection_file.find_one(query_filter1))
Currency_doc = str(collection_file.find_one(query_filter2))
Impact_doc = str(collection_file.find_one(query_filter3))
Time_doc = str(collection_file.find_one(query_filter4))

@app.route("/data")
def database():

    # return signals the instance to show the user whatever we data we scraped and saved into the dictionary previously.
    return (News_doc+Currency_doc+Impact_doc+Time_doc), 200

driver.close()

#----------------------------------------------------------------------------------------------------------------------------------------------------

# allows the program to be opened by running file instead of using the terminal. debug=true refreshes website everytime a change is made.
if __name__ == "__main__":
   app.run(debug=False,host="0.0.0.0",port="5000")

