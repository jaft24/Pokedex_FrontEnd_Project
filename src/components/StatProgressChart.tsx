import VisibilitySensor from "react-visibility-sensor";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const StatProgressChart = ({
  statValue,
  maxstatValue,
  label,
  color,
}: {
  statValue: number;
  maxstatValue: number;
  label: string;
  color: string;
}) => {
  return (
    <Box w="100px" _hover={{ transform: "scale(1.2)" }}>
      <VisibilitySensor>
        {({ isVisible }: { isVisible: boolean }) => {
          const percentage = isVisible
            ? parseInt(((statValue * 100) / maxstatValue).toFixed(0))
            : 0;
          return (
            <CircularProgress
              value={percentage}
              color={color}
              thickness={7}
              size="110px"
              capIsRound
            >
              <CircularProgressLabel fontSize="12px" color="black">
                {`${label}:${statValue}`}
              </CircularProgressLabel>
            </CircularProgress>
          );
        }}
      </VisibilitySensor>
    </Box>
  );
};

export default StatProgressChart;
