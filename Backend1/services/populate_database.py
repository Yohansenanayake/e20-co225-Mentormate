from google_spreadsheet import populate_answers_from_spreadsheet,populate_questions_from_spreadsheet,populate_units_from_spreadsheet


spreadsheet_id = "1kwHVw2V32SvgUWGn398YekCjHyfk4vUF4fouTV-j5-M"
credentials_path = "../mentormate-googlecloud.json"

# Add the parent directory to the Python path
#sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

populate_units_from_spreadsheet(spreadsheet_id, credentials_path)
populate_questions_from_spreadsheet(spreadsheet_id, credentials_path)
populate_answers_from_spreadsheet(spreadsheet_id, credentials_path)
