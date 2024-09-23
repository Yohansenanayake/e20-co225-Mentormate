//Account.jsx - User account page

import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Input,
  Divider,
  List,
  ListItem,
  Avatar,
  Heading,
  Stack,
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Input as ChakraInput,
  Select,
} from '@chakra-ui/react';
import { FaUserEdit, FaSignOutAlt, FaCalendarAlt, FaMapMarkerAlt, FaLanguage, FaEnvelope, FaCreditCard, FaLock } from 'react-icons/fa';

function Account() {
  // Managing state for profile picture, password modal, card details modal, and form data
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/80');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isCardDetailsOpen, setIsCardDetailsOpen] = useState(false);
  const [editing, setEditing] = useState(null); //track currently editing field
  const [formData, setFormData] = useState({
    name: 'Firstname Lastname',
    dob: '07 July 2005',
    address: 'Give your address here',
    language: 'English',
    email: 'ikakodesign@gmail.com',
  });
  
  //open field for editing
  const handleEditClick = (field) => {
    setEditing(field);
  };

  //update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  //save and exit
  const handleSave = () => {
    setEditing(null);
  };

  //profile pic changes handling
  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  //password change model
  const handleOpenChangePassword = () => setIsChangePasswordOpen(true);
  const handleCloseChangePassword = () => setIsChangePasswordOpen(false);
  
  //card details model
  const handleOpenCardDetails = () => setIsCardDetailsOpen(true);
  const handleCloseCardDetails = () => setIsCardDetailsOpen(false);

  return (
    <Box bg={useColorModeValue('gray.300', 'gray.800')} minH="100vh" p={6}>
      {/* Navbar */}
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color="blue.700">My Account</Text>
      </Box>
      
      <HStack align="flex-start" spacing={6}>
        {/* Sidebar */}
        <VStack
          spacing={4}
          p={6}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          rounded="lg"
          w="300px"
        >
          {/* User's Profile Picture */}
          <Avatar size="xl" src={profilePicture} mb={4} />
          <Input
            type="file"
            id="profile-picture-upload"
            accept="image/*"
            display="none"
            onChange={handleProfilePictureChange}
          />
          {/* Button to upload a new profile picture */}
          <Button
            onClick={() => document.getElementById('profile-picture-upload').click()}
            variant="outline"
            colorScheme="blue"
          >
            Change Profile Picture
          </Button>
          <Heading size="md">{formData.name}</Heading>
          <Text color="gray.500">{formData.email}</Text>

          <Divider />

          {/* Sidebar Navigation Links */}
          <List spacing={4} textAlign="left" w="full">
            <ListItem
              fontWeight="bold"
              color="blue.500"
            >
              <Link href="#profile">My Profile</Link>
            </ListItem>
            <ListItem>
              <Link onClick={handleOpenCardDetails}>Billing & Payments</Link>
            </ListItem>
            <ListItem>
              <Link onClick={handleOpenChangePassword}>Change Password</Link>
            </ListItem>
          </List>
        </VStack>

        {/* Content */}
        <Box
          flex={1}
          p={6}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          rounded="lg"
        >
          {/* Header and Sign Out Button */}
          <HStack justify="space-between" mb={6}>
            <Heading size="lg">My Profile</Heading>
            <Button leftIcon={<FaSignOutAlt />} colorScheme="red">
              Sign Out
            </Button>
          </HStack>

          {/* Introductory Text */}
          <Text mb={6}>
            Manage your personal information, including phone numbers and email addresses where you can be contacted.
          </Text>

          {/* List of Editable Profile Fields */}
          <Stack spacing={4}>
            <ProfileCard
              icon={FaUserEdit}
              title="Name"
              description={formData.name}
              type="text"
              isEditing={editing === 'name'}
              onEditClick={() => handleEditClick('name')}
              onSave={handleSave}
              onChange={handleInputChange}
            />
            <ProfileCard
              icon={FaCalendarAlt}
              title="Date of Birth"
              description={formData.dob}
              type="date"
              isEditing={editing === 'dob'}
              onEditClick={() => handleEditClick('dob')}
              onSave={handleSave}
              onChange={handleInputChange}
            />
            <ProfileCard
              icon={FaMapMarkerAlt}
              title="Address"
              description={formData.address}
              type="address"
              isEditing={editing === 'address'}
              onEditClick={() => handleEditClick('address')}
              onSave={handleSave}
              onChange={handleInputChange}
            />
            <ProfileCard
              icon={FaLanguage}
              title="Language"
              description={formData.language}
              type="dropdown"
              isEditing={editing === 'language'}
              onEditClick={() => handleEditClick('language')}
              onSave={handleSave}
              onChange={handleInputChange}
            />
            <ProfileCard
              icon={FaEnvelope}
              title="Contactable at"
              description={formData.email}
              type="email"
              isEditing={editing === 'email'}
              onEditClick={() => handleEditClick('email')}
              onSave={handleSave}
              onChange={handleInputChange}
            />
          </Stack>
        </Box>
      </HStack>

      {/* Change Password Modal */}
      <Modal isOpen={isChangePasswordOpen} onClose={handleCloseChangePassword}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <ChakraInput type="password" placeholder="Current Password" />
              <FormHelperText>Enter your current password.</FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <ChakraInput type="password" placeholder="New Password" />
              <FormHelperText>Enter a new password.</FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <ChakraInput type="password" placeholder="Confirm New Password" />
            </FormControl>
            <Button mt={4} colorScheme="blue" onClick={handleCloseChangePassword}>
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Card Details Modal */}
      <Modal isOpen={isCardDetailsOpen} onClose={handleCloseCardDetails}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Card Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Heading size="md" mb={4}>Card Information</Heading>
              <Text mb={4}>Here you can manage your card details.</Text>
              <Button colorScheme="blue">Add New Card</Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

// Reusable component to display and edit profile fields
const ProfileCard = ({ icon, title, description, type, isEditing, onEditClick, onSave, onChange }) => {
    const [value, setValue] = useState(description);
  
    const handleChange = (e) => {
      setValue(e.target.value);
      onChange(e);
    };
  
    return (
      <HStack
        p={4}
        bg={useColorModeValue('gray.100', 'gray.600')}
        rounded="md"
        boxShadow="md"
        justify="space-between"
      >
        <HStack spacing={4}>
          <Icon as={icon} boxSize={6} color="blue.500" />
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">{title}</Text>
            {isEditing ? (
              type === 'text' ? (
                <FormControl>
                  <Input
                    value={value}
                    onChange={handleChange}
                    name={title.toLowerCase().replace(/\s+/g, '')}
                  />
                </FormControl>
              ) : type === 'date' ? (
                <FormControl>
                  <Input
                    type="date"
                    value={value}
                    onChange={handleChange}
                    name={title.toLowerCase().replace(/\s+/g, '')}
                  />
                </FormControl>
              ) : type === 'address' ? (
                <FormControl>
                  <Input
                    value={value}
                    onChange={handleChange}
                    name={title.toLowerCase().replace(/\s+/g, '')}
                    placeholder="Enter address"
                  />
                </FormControl>
              ) : type === 'dropdown' ? (
                <FormControl>
                  <Select
                    value={value}
                    onChange={handleChange}
                    name={title.toLowerCase().replace(/\s+/g, '')}
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </Select>
                </FormControl>
              ) : type === 'email' ? (
                <FormControl>
                  <Input
                    type="email"
                    value={value}
                    onChange={handleChange}
                    name={title.toLowerCase().replace(/\s+/g, '')}
                  />
                </FormControl>
              ) : null
            ) : (
              <Text color="gray.500">{description}</Text>
            )}
          </VStack>
        </HStack>
        <Button size="sm" colorScheme="blue" onClick={isEditing ? onSave : onEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </HStack>
    );
  };
  
  export default Account;
  
