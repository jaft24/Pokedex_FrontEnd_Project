import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useRouter } from "next/router";

const FooterButtons = ({
  onClickAdvancedSearch,
}: {
  onClickAdvancedSearch: () => void;
}) => {
  const router = useRouter();
  return (
    <Box display="flex" alignItems="center" gap={50}>
      <MyButton
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Clear Filters
      </MyButton>
      <MyButton onClick={onClickAdvancedSearch}>Search 🔍</MyButton>
    </Box>
  );
};

export default FooterButtons;
