import sys
import os

# Update the path to include the parent directory of `Backend1`
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.models import Base

# Setup the MySQL connection
engine = create_engine('mysql+pymysql://admin:mentorMate-db-E20363@mentormate-db.chae22ayqwzv.ap-south-1.rds.amazonaws.com:3306/mentormate')
# Create tables if they don't exist
Base.metadata.create_all(engine)

# Create a configured "Session" class
Session = sessionmaker(bind=engine)

# A function to get a new session
def get_session():
    return Session()
