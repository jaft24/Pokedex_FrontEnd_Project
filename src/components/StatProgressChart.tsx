import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VisibilitySensor from "react-visibility-sensor";

export default function StatProgressChart({
  statValue,
  maxstatValue,
  label,
  color,
}: {
  statValue: number;
  maxstatValue: number;
  label: string;
  color: string;
}) {
  return (
    <div style={{ width: "100px" }}>
      <VisibilitySensor>
        {({ isVisible }: { isVisible: any }) => {
          //ANother instances of an "any" type, this looks like a boolean.
          const percentage = isVisible
            ? parseInt(((statValue * 100) / maxstatValue).toFixed(0))
            : 0;
          return (
            <CircularProgressbar
              styles={{
                path: {
                  stroke: color,
                  transformOrigin: "center center",
                  transition: "stroke-dashoffset 2s ease 0s",
                },
                text: {
                  fontSize: "12px",
                  fill: "black",
                },
              }}
              value={percentage}
              text={`${label}:${statValue}`}
              //Nice use of template literals :)
            />
          );
        }}
      </VisibilitySensor>
    </div>
  );
}
