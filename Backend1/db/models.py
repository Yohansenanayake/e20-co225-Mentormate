from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)  # Unique email , compulsory
    user_name = Column(String(50), nullable=False)  # User's name need not be unique
    password_hash = Column(String(255), nullable=False)  # Hashed password
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to access all threads created by this user
    threads = relationship("ChatThread", back_populates="user", cascade="all, delete-orphan")

class ChatThread(Base):
    __tablename__ = 'chat_threads'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    thread_title = Column(String(255), nullable=True)  # Optional title for the thread
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to access the user who created the thread
    user = relationship("User", back_populates="threads")

    # Relationship to access messages in a thread
    messages = relationship("Message", back_populates="thread", cascade="all, delete-orphan")

class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    thread_id = Column(Integer, ForeignKey('chat_threads.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    message_content = Column(Text, nullable=False)
    message_type = Column(String(10), nullable=False)  # 'human' or 'ai'
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationship to access the thread this message belongs to
    thread = relationship("ChatThread", back_populates="messages")

    # Relationship to access the user who sent the message
    user = relationship("User")
