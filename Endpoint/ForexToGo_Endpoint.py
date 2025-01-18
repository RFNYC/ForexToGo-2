from flask import Flask
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import socket
import datetime

# This projects makes use of mongodb to store data temporarily, This is the "connection string".
uri = "mongodb+srv://rftestingnyc:<db-password>@forextogo.1fg9b.mongodb.net/?retryWrites=true&w=majority&appName=ForexToGo"

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
CORS(app)

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
Actual_List = driver.find_elements(By.CSS_SELECTOR,'td.calendar__actual')
Forecasted_List = driver.find_elements(By.CSS_SELECTOR,'td.calendar__forecast')
Previous_List = driver.find_elements(By.CSS_SELECTOR, 'td.calendar__previous')

# If you wanted to add more using the same method unit test them here. They return an array that needs to be formatted using .text
# print(Actual_List[0].text)
# print(Forecasted_List[0].text)
# print(Previous_List[0].text)

# Because Forex factory didn't give a unique ID to the Impact icons I needed to first find its parent element, then save its first child.
# It's first child has a title attribute that gives you pop-up text that correlates to the impact level. I grab this title in my for-loop later.
Event_Impact_Level_Icons = driver.find_elements(By.CSS_SELECTOR, 'td.calendar__impact')

# All other code up to this point will work if there is no news. However if there's no news this will throw an error.
try:
    Impact_level_DOM_title = Event_Impact_Level_Icons[0].find_element(By.TAG_NAME, 'span')
    noNews = False
except:
    noNews = True
    print("An error has occured scraping data from ForexFactory.com.")

# Dictionaries for the scraped data to be stored temporarily before being sent to MongoDB.
News_Event_Title_Dictionary = {

}

Currencies_Impacted_Dictionary = {

}

Event_Impact_Level_Dictionary = {

}

Calendar_Time_Dict = {

}

Actual_Dict = {

}

Forecasted_Dict = {

}

Previous_Dict = {

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
    Actual_Dict[f"Actual-Cell{news_entry_num}"] = f"{Actual_List[news_entry_num].text}"
    Forecasted_Dict[f"Forecasted-Cell{news_entry_num}"] = f"{Forecasted_List[news_entry_num].text}"
    Previous_Dict[f"Previous-Cell{news_entry_num}"] = f"{Previous_List[news_entry_num].text}"

# Using collection_file.find_one(query_filter) produces a none type which caused errors so I had to get each document again manually.
# I figured out that when the script is run again, if the data is replaced, so is the ID. Adding a custom ID works around this
# This for adds a custom ID entry so that regardless of if the MongoDB set ID or scraped info ever changes I can still call dictionaries later.
News_Event_Title_Dictionary["SectionID"] = "News_Dictionary"
Currencies_Impacted_Dictionary["SectionID"] = "Currency_Dictionary"
Event_Impact_Level_Dictionary["SectionID"] = "Impact_Dictionary"
Calendar_Time_Dict["SectionID"] = "Time_Dictionary"
Actual_Dict["SectionID"] = "Actual_Dictionary"
Forecasted_Dict["SectionID"] = "Forecasted_Dictionary"
Previous_Dict["SectionID"] = "Previous_Dictionary"

'''
Because I didn't understand how to delete files automatically via MongoDB's expiration/timeseries system I opted to use an impromptu timestamp
system to get the job done. Everytime I upload scraped data to MongoDB I will include a timestamp of the date it was posted. Using this time-
stamp I will compare the current day to the day the data was posted on. If these dates are not the same I will replace the information on
MongoDB with new information.
'''

# Adding the date posted timestamp to the all dictionaries of the collection. This helps keep track of when the date was posted.
posted_time = str(datetime.datetime.now())
News_Event_Title_Dictionary["timestamp"] = f"{posted_time}"
Currencies_Impacted_Dictionary["timestamp"] = f"{posted_time}"
Event_Impact_Level_Dictionary["timestamp"] = f"{posted_time}"
Calendar_Time_Dict["timestamp"] = f"{posted_time}"
Actual_Dict["timestamp"] = f"{posted_time}"
Forecasted_Dict["timestamp"] = f"{posted_time}"
Previous_Dict["timestamp"] = f"{posted_time}"


"""
This system runs on the assumption that a timestamp already exists. When a timestamp is first uploaded to the dictionary datetime is considered 
the date it was posted. The nth time this script is run we are simply comparing. There should be a timestamp from the previous time we uploaded
datetime, we will compare that to the current datetime.now, or in other words the date right now, to see if they are different.
"""
# This is the string showing todays date in the form 20YY-DD-MM.
current_time = str(datetime.datetime.now())
date_today = (current_time[0:10])

# Here are the Search filters to each dictionary:
query_filter1 = {"SectionID": "News_Dictionary"}
query_filter2 = {"SectionID": "Currency_Dictionary"}
query_filter3 = {"SectionID": "Impact_Dictionary"}
query_filter4 = {"SectionID": "Time_Dictionary"}
query_filter5 = {"SectionID": "Actual_Dictionary"}
query_filter6 = {"SectionID": "Forecasted_Dictionary"}
query_filter7 = {"SectionID": "Previous_Dictionary"}

# Gets the {"timestamp":"<date>"} entry info from MongoDB and saves the date "20YY-MM-DD" into date_posted
get_timestamp = collection_file.distinct("timestamp")

# Asks user on the condition that news was found.
if noNews == False:
    # Asks the user whether or not to run the script without scraping new data.
    print("Would you like to run the server using existing server data?")
    print('"Y" for yes, "N" for no. ')
    answer = input().upper()
    print(f'You answered "{answer}"')
else:
    if noNews == True:
        answer = "Y"

if answer == "Y":
    Response = "Running with existing server data..."

# This works because if the user typed "N" into the prompt it would throw an error. So its basically an if else (idk why i wrote it like that.)
try:
    print(Response)
except:
# I only ever want there to be 7 entries each day. If there are already 7 entries from the same day, nothing is added.
    if dictionary_count == 0:
        # If there  each dictionary into MongoDB.
        a = collection_file.insert_one(News_Event_Title_Dictionary) 
        b = collection_file.insert_one(Currencies_Impacted_Dictionary)
        c = collection_file.insert_one(Event_Impact_Level_Dictionary)
        d = collection_file.insert_one(Calendar_Time_Dict)
        e = collection_file.insert_one(Actual_Dict)
        f = collection_file.insert_one(Forecasted_Dict)
        g = collection_file.insert_one(Previous_Dict)     
    elif dictionary_count <= 7:
        # If theres already documents we can check for a timestamp string in the first doc of the collection.
        timestamp = get_timestamp[0]
        date_posted = timestamp[0:10]
        print(date_posted)
        if date_today != date_posted:
                print("Old or insufficient data detected. Replacing with most recent data.")
                x = collection_file.delete_many({})
                a = collection_file.insert_one(News_Event_Title_Dictionary) 
                b = collection_file.insert_one(Currencies_Impacted_Dictionary)
                c = collection_file.insert_one(Event_Impact_Level_Dictionary)
                d = collection_file.insert_one(Calendar_Time_Dict)
                e = collection_file.insert_one(Actual_Dict)
                f = collection_file.insert_one(Forecasted_Dict)
                g = collection_file.insert_one(Previous_Dict)
        else:
            print("Some error has occured. Nothing was changed. Note: If today's date was logged twice the data should be up to date.")

# Finds the documents I need and saves them into 1 variable 
# Also removed the "_id": ObjectID(...) field, it wasn't necessary and caused problems when converting to JSON.
News_doc = (collection_file.find_one(query_filter1,{'_id': False}))
Currency_doc = (collection_file.find_one(query_filter2,{'_id': False}))
Impact_doc = (collection_file.find_one(query_filter3,{'_id': False}))
Time_doc = (collection_file.find_one(query_filter4,{'_id': False}))
Actual_doc = (collection_file.find_one(query_filter5,{'_id': False}))
Forecasted_doc = (collection_file.find_one(query_filter6,{'_id': False}))
Previous_doc = (collection_file.find_one(query_filter7,{'_id': False}))


# Combines the strings from all dictionaries into one variable then formats it into JSON by editing the string.
combinedData = (f'{News_doc},{Currency_doc},{Impact_doc},{Time_doc},{Actual_doc},{Forecasted_doc},{Previous_doc}')
combinedData = combinedData.replace("'",'"')
serverOutput = ("["+combinedData+"]")
# print(serverOutput)

@app.route("/data")
def database():

    # return signals the instance to show the user whatever we data we scraped and saved into the dictionary previously.
    return (serverOutput), 200

driver.close()

#----------------------------------------------------------------------------------------------------------------------------------------------------

# allows the program to be opened by running file instead of using the terminal. debug=true refreshes website everytime a change is made.
if __name__ == "__main__":
   app.run(debug=False,host="0.0.0.0",port="5000")

