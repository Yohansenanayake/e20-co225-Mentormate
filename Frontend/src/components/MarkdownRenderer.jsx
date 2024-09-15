// src/components/MarkdownRenderer.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, UnorderedList, OrderedList, ListItem, Text } from '@chakra-ui/react';
import remarkGfm from 'remark-gfm'; // For GitHub-flavored Markdown

const MarkdownRenderer = ({ content }) => {
  return (
    <Box>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]} // Optional: for GitHub-flavored Markdown features
        components={{
          h1: ({ node, ...props }) => <Text as="h1" fontSize="2xl" mb="4" {...props} />,
          h2: ({ node, ...props }) => <Text as="h2" fontSize="xl" mb="3" {...props} />,
          h3: ({ node, ...props }) => <Text as="h3" fontSize="lg" mb="2" {...props} />,
          p: ({ node, ...props }) => <Text mb="4" {...props} />,
          ul: ({ node, ...props }) => (
            <UnorderedList spacing="2" pl="4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <OrderedList spacing="2" pl="4" {...props} />
          ),
          li: ({ node, ...props }) => <ListItem {...props} />,
          blockquote: ({ node, ...props }) => (
            <Box as="blockquote" borderLeft="4px solid gray" pl="4" mb="4" fontStyle="italic" {...props} />
          ),
          strong: ({ node, ...props }) => <Text as="strong" fontWeight="bold" {...props} />,
          em: ({ node, ...props }) => <Text as="em" fontStyle="italic" {...props} />,
          a: ({ node, ...props }) => (
            <Text as="a" color="blue.500" textDecoration="underline" {...props} />
          ),
        }}
      />
    </Box>
  );
};

export default MarkdownRenderer;
