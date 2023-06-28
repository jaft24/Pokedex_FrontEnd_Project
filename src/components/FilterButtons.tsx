import { useState } from "react";

export function TypeButton({
  typeName,
  typeColor,
  isSelected,
  onClick,
}: {
  typeName: string;
  typeColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverExit = () => {
    setIsHovered(false);
  };

  const buttonBackground = isSelected
    ? typeColor + "9d"
    : isHovered
    ? typeColor + "9d"
    : typeColor + "0d";

  return (
    <div>
      <button
        style={{
          width: 59,
          height: 24,
          background: buttonBackground,
          borderRadius: 4,
          border: `1.5px ${typeColor} solid`,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 8,
          display: "inline-flex",
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverExit}
        onClick={onClick}
      >
        {" "}
        <div
          style={{
            color: typeColor,
            fontSize: 12,
            margin: "auto",
            fontFamily: "Roboto",
            fontWeight: "500",
            letterSpacing: 0.5,
            wordWrap: "break-word",
          }}
        >
          <strong>
            {" "}
            {typeName.length > 8
              ? `${typeName.substring(0, 7)}`
              : typeName}{" "}
          </strong>
        </div>{" "}
      </button>
    </div>
  );
}
