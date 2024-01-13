import { Box, Portal } from "@chakra-ui/react";

const BlurOverlay = ({ children }: { children: JSX.Element }) => {
  return (
    <Portal>
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={9999}
        backdropFilter="blur(10px)"
      >
        {children}
      </Box>
    </Portal>
  );
};

export default BlurOverlay;
