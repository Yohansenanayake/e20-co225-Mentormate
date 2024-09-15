import React from 'react';
import { Box } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <Box color="red.500">Something went wrong while rendering Markdown.</Box>;
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
