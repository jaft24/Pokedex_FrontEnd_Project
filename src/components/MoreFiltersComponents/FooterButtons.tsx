import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";

const FooterButtons = ({
  onClickClearFilters,
  onClickAdvancedSearch,
}: {
  onClickClearFilters: () => void;
  onClickAdvancedSearch: () => void;
}) => {
  return (
    <Box display="flex" alignItems="center" gap={50}>
      <MyButton onClick={onClickClearFilters}>Clear Filters</MyButton>
      <MyButton onClick={onClickAdvancedSearch}>Search 🔍</MyButton>
    </Box>
  );
};

export default FooterButtons;
