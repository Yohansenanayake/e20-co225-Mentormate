// src/components/MarkdownRenderer.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  Box,
  Text,
  Heading,
  Code,
  Link,
  List,
  ListItem,
  Divider
} from '@chakra-ui/react';


const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // Custom rendering for Markdown elements using Chakra UI
        p: ({ node, ...props }) => (
          <Text mb="4" {...props} />
        ),
        h1: ({ node, ...props }) => (
          <Heading as="h1" size="xl" mb="4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <Heading as="h2" size="lg" mb="4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <Heading as="h3" size="md" mb="4" {...props} />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          return !inline ? (
            <Box
              p="3"
              borderRadius="md"
              bg="gray.700"
              overflowX="auto"
            >
              <Code {...props} children={String(children).replace(/\n$/, '')} />
            </Box>
          ) : (
            <Code {...props} children={String(children).replace(/\n$/, '')} />
          );
        },
        a: ({ node, ...props }) => (
          <Link color="teal.500" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <List spacing="2" pl="4" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <List spacing="2" styleType="decimal" pl="4" {...props} />
        ),
        li: ({ node, ...props }) => (
          <ListItem {...props} />
        ),
        hr: () => (
          <Divider my="4" />
        ),
        blockquote: ({ node, ...props }) => (
          <Box
            borderLeft="4px solid"
            borderColor="gray.600"
            pl="4"
            mb="4"
            color="gray.400"
            {...props}
          />
        ),
        img: ({ node, ...props }) => (
          <Box textAlign="center">
            <img {...props} style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
