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
        /*
        You should be able to do all of this hovering and display logic using CSS.
        Not only does this give you a lot of what you are doing in this workaround out of the
        box, it also allows you to remove like 10 lines of code above.

        React is centered around state, but you should only use state when you need to as it
        can create compounding complexity.
         */
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
              {/* You shouldn't need to use the <strong> tag since you are doing fontWeight
              right above */}
            {" "}
            {typeName.length > 8
              ? `${typeName.substring(0, 7)}`
              : typeName}{" "}
              {/*
              I think this also might be a something that could instead be done with CSS.
              Truncating at a specific width, rather than just always cutting things off at 8
              characters. This is usually better as individual characters can
              each have different widths.
              */}
          </strong>
        </div>{" "}
      </button>
    </div>
  );
}
