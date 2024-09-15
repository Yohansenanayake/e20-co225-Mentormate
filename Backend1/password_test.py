
from password_manager import PasswordManager

password_manager = PasswordManager()
my_password = "E20365"
hashed_password = password_manager.hash_password(my_password)
print(hashed_password)

check_password = "E20363"
print(password_manager.check_password(check_password, hashed_password))