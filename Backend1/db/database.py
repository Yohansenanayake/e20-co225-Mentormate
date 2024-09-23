"""
This script is responsible for setting up the database connection and session management
using SQLAlchemy. It loads environment variables, initializes the database engine, 
creates tables if needed, and provides a function to get a session for database transactions.
"""

import sys
import os
from dotenv import load_dotenv

# Load environment variables (e.g., DATABASE_URL) from the .env file to keep sensitive data secure.
load_dotenv()

# Modify the Python path to include the parent directory of this script.
# This allows importing from sibling directories such as 'db' for models.
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.models import Base  # Import Base, which holds all model definitions for table creation

# Retrieve the database connection URL from environment variables (set in .env file).
# This setup ensures flexibility between local development and production environments.
database_url = os.getenv('DATABASE_URL')

# Create a SQLAlchemy engine using the database URL. This engine will be used to connect 
# and execute queries against the database.
engine = create_engine(database_url)

# Automatically generate the database tables (if they don't already exist) 
# based on the models defined and associated with the Base class.
Base.metadata.create_all(engine)

# Create a session factory bound to the engine. This factory will produce new sessions
# for interacting with the database.
Session = sessionmaker(bind=engine)

# This function returns a new session object for interacting with the database.
# It's a good practice to create a new session for each transaction or set of operations.
def get_session():
    return Session()
