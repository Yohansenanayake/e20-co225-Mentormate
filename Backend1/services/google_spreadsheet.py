import gspread
from google.oauth2.service_account import Credentials
from db_update import update_unit, update_question , update_answer

def get_google_spreadsheet(spreadsheet_id, credentials_path):
    scope = ["https://www.googleapis.com/auth/spreadsheets.readonly"]  # Read-only access

    # Path to the service account key file
    SERVICE_ACCOUNT_FILE = credentials_path

    try:
        # Create credentials using the service account file and defined scope
        credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=scope)

        # Authenticate with Google Sheets API
        client = gspread.authorize(credentials)

        # Open the spreadsheet by its ID
        spreadsheet = client.open_by_key(spreadsheet_id)

        return spreadsheet  

    except gspread.SpreadsheetNotFound:
        print(f"Spreadsheet with ID {spreadsheet_id} not found.")
    except gspread.AuthError:
        print("Authentication error. Check your service account credentials.")
    except Exception as e:
        print(f"An error occurred: {e}")


def populate_units_from_spreadsheet(spreadsheet_id, credentials_path):
    """
    Populate the Unit table in the database using data from the 'units' sheet in a Google Spreadsheet.
    
    :param spreadsheet_id: The Google Spreadsheet ID.
    :param credentials_path: Path to the Google Service Account credentials file.
    """
    try:
        # Step 1: Access the Google Spreadsheet
        spreadsheet = get_google_spreadsheet(spreadsheet_id, credentials_path)
        
        # Step 2: Access the 'units' sheet
        sheet = spreadsheet.worksheet('units')

        # Step 3: Retrieve all values from the sheet
        range = 'A2:B'  # Columns A and B without headers
        units_data = sheet.get(range)

        # Step 4: Iterate through the rows and update the database
        for row in units_data:
            unit_name = row[0].strip()  # First column: Unit Name
            unit_description = row[1].strip() if len(row) > 1 and row[1].strip else None  # if the description is emtpy, set it to None
            
            # Step 5: Check if the row is not empty (skip empty rows)
            if not unit_name:
                continue

            # Step 6: Update or create the unit in the database
            update_unit(unit_name, unit_description)

        print("Database updated successfully with unit data from spreadsheet.")

    except Exception as e:
        print(f"Error occurred while populating the database: {e}")



def populate_questions_from_spreadsheet(spreadsheet_id, credentials_path):
    """
    Populate the Question table in the database using data from the 'questions' sheet in a Google Spreadsheet.
    
    :param spreadsheet_id: The Google Spreadsheet ID.
    :param credentials_path: Path to the Google Service Account credentials file.
    """
    try:
        # Step 1: Access the Google Spreadsheet
        spreadsheet = get_google_spreadsheet(spreadsheet_id, credentials_path)
        
        # Step 2: Access the 'questions' sheet
        sheet = spreadsheet.worksheet('Sheet1')

        # Step 3: Retrieve all values from the sheet (excluding the header row)
        questions_data = sheet.get_all_values()[1:]

        # Step 4: Iterate through the rows and update the database
        for row in questions_data:
            unit_name = row[1].strip()  #column B: Unit Name
            question_text = row[3].strip()  # column D: Question Text
            question_no = int(row[2].strip())  # column C: Question Number

            # Step 5: Check if the row is not empty (skip empty rows) both unit_name and question_text should not be empty
            if not unit_name or not question_text:
                continue

            # Step 6: Update or create the question in the database
            update_question(unit_name, question_text,question_no)

        print("Database updated successfully with question data from spreadsheet.")

    except Exception as e:
        print(f"Error occurred while populating the database: {e}")


def populate_answers_from_spreadsheet(spreadsheet_id, credentials_path):
    """
    Populate the Answer table in the database using data from the 'answers' sheet in a Google Spreadsheet.
    
    :param spreadsheet_id: The Google Spreadsheet ID.
    :param credentials_path: Path to the Google Service Account credentials file.
    """
    try:
        # Step 1: Access the Google Spreadsheet
        spreadsheet = get_google_spreadsheet(spreadsheet_id, credentials_path)
        
        # Step 2: Access the 'answers' sheet
        sheet = spreadsheet.worksheet('Sheet1')

        # Step 3: Retrieve all values from the sheet (excluding the header row)
        answers_data = sheet.get_all_values()[1:]

        # Step 4: Iterate through the rows and update the database
        for row in answers_data:
            question_no = int(row[2].strip())  #column c: Question np
            answer_text = row[4].strip()  # column E: Answer Text
            unit_id = int(row[0].strip())

            # Step 5: Check if the row is not empty (skip empty rows) both question_text and answer_text should not be empty
            if not question_no or not answer_text:
                continue

            # Step 6: Update or create the answer in the database
            update_answer(unit_id=unit_id, question_no=question_no, answer_text=answer_text)

        print("Database updated successfully with answer data from spreadsheet.")

    except Exception as e:
        print(f"Error occurred while populating the database: {e}")


if __name__ == "__main__":
    spreadsheet_id = "1kwHVw2V32SvgUWGn398YekCjHyfk4vUF4fouTV-j5-M"
    credentials_path = "../mentormate-googlecloud.json"
    #populate_questions_from_spreadsheet(spreadsheet_id, credentials_path)
    #populate_units_from_spreadsheet(spreadsheet_id, credentials_path)
    #populate_answers_from_spreadsheet(spreadsheet_id, credentials_path)


