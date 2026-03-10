import mysql.connector
import random

connection = mysql.connector.connect(
    host='127.0.0.1',
    port=3306,
    database='game_project',
    user='aleksandra',
    password='H6nckrxfRMz',
    autocommit=True
)

cursor = connection.cursor(dictionary=True)
def get_airports_eu():
    country_name = "Finland", "France"
    return country_name

def get_the_distance_to_the_suitcase (current_location,airport_random):
    return 200

def determine_neighboring_countries (current_location):
    neighboring_countries = []
    return neighboring_countries

def list_of_available_airports_for_travel():
    available_airports = []
    return available_airports

def show_welcome_text():
    path = r"C:\Users\aleks\Desktop\Ryhmätyö (Ryhmä 7)\Ohjelmointi\welcome_screen.txt"
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
        print(text)

def get_random_meme():
    path = r"C:/Users/aleks/Desktop/Ryhmätyö (Ryhmä 7)/Ohjelmointi/meme.txt"
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        lines = [line.strip() for line in lines if line.strip()]
    return random.choice(lines)

def welcome_screen():
    show_welcome_text()
    previous_was_no = False
    while True:
            answer = input("Would you like to play? (yes/no): ").strip().lower()

            if answer == "yes":
                if previous_was_no:
                    print("\n" + get_random_meme() + "\n")
                return

            elif answer == "no":
                previous_was_no = True

            else:
                print("Please answer yes or no.")

def airport_exists(country):
    query = """
    SELECT a.ident, a.name
    FROM airport a, country c
    WHERE c.name = %s and c.iso_country = a.iso_country
    ORDER BY RAND() LIMIT 1
    """
    cursor.execute(query, (country,))
    return cursor.fetchone()
def update_player_location(name, location):
    cursor.execute(
        "UPDATE GAME SET current_location = %s WHERE player_name = %s",
        (location, name)
    )
def player_exists(name):
    cursor.execute("SELECT id FROM GAME WHERE player_name = %s", (name,))
    return cursor.fetchone() is not None

def register_new_player(name, country):
    airport = airport_exists(country)
    if airport and airport.get('ident'):  # dict.get()
        ident = airport['ident']
        a_name = airport['name']
        c_name = airport['name']  # или 'country_name'
        cursor.execute(
            "INSERT INTO GAME (player_name, current_level, current_location) VALUES (%s, 1, %s)",
            (name, ident)
        )
        print(f"Registered: {a_name} ({c_name})")

def airport_exists(country):
    query = """
    SELECT a.ident, a.name, c.name
    FROM airport a JOIN country c ON a.iso_country = c.iso_country
    WHERE c.name = %s AND a.ident IS NOT NULL
    ORDER BY RAND() LIMIT 1
    """
    cursor.execute(query, (country,))
    result = cursor.fetchone()
    return result


welcome_screen()

name = input("Enter your name: ").strip()
is_existing = player_exists(name)

if is_existing:
    print(f"Welcome back, {name}!")
else:
    print(f"Hello, {name}! Let's register you as a new player. Your adventure begins at difficulty level 1.")

fly_last_time = input("Where did you fly from last time? \n")
#current_location = input("Where did you fly to last time? \n")
while True:
    current_location = input("Where did you fly to last time? \n").strip().upper()

    if airport_exists(current_location):
        break
    else:
        print("This airport code does not exist.")
if not is_existing:
    register_new_player(name, current_location)
else:
    update_player_location(name, current_location)


airports_eu = get_airports_eu()
count = len(airports_eu)
airport_random = random.choice(airports_eu)
distance_to_the_suitcase = get_the_distance_to_the_suitcase(current_location, airport_random)
neighboring_countries = determine_neighboring_countries(current_location)
print(f"{name}. Current location is {current_location}. (Neighboring countries: {neighboring_countries}.) Distance to the suitcase: {distance_to_the_suitcase}. ")
next_country = input("Which country would you like to fly to next?\n")
list_countries = list_of_available_airports_for_travel()
for country in list_countries:
    print(country)
