import { Box, VStack, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, useBreakpointValue } from '@chakra-ui/react';

const Sidebar = ({ threads, onSelectThread, isOpen, onClose }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sidebarContent = (
    <VStack align="start" spacing="4" p="4" bg="gray.900" height="100%" color="white">
      <Text fontSize="xl" mb="4">Chat Threads</Text>
      {threads.map((thread) => (
        <Box
          key={thread.id}
          p="1"
          bg="gray.800"
          width="100%"
          borderRadius="md"
          _hover={{ bg: 'gray.600' }}
          cursor="pointer"
          onClick={() => onSelectThread(thread)}
        >
          {thread.title || `Chat created at ${new Date(thread.created_at).toLocaleString()}`}
        </Box>
      ))}
    </VStack>
  );

  return isMobile ? (
    // Drawer for mobile view
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.900">
          <DrawerCloseButton color="white" />
          <DrawerBody p="0" overflowY="auto"> {/* Enable scroll here */}
            {sidebarContent}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  ) : (
    // Sidebar for larger screens
    <Box width="250px" bg="gray.900" color="white" height="100vh" p="4" overflowY="auto">
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
