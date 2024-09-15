from werkzeug.security import generate_password_hash, check_password_hash

class PasswordManager:
    def __init__(self):
        pass
    
    def hash_password(self, password: str) -> str:
        """
        Hash the password using Werkzeug.
        
        :param password: The plain text password to hash.
        :return: The hashed password.
        """
        # Generate the hash using Werkzeug
        hashed_password = generate_password_hash(password)
        return hashed_password
    
    def check_password(self, password: str, hashed_password: str) -> bool:
        """
        Check if the provided password matches the hashed password.
        
        :param password: The plain text password to check.
        :param hashed_password: The hashed password to compare against.
        :return: True if the password matches, False otherwise.
        """
        # Check if the password matches the hashed password
        return check_password_hash(hashed_password, password)
