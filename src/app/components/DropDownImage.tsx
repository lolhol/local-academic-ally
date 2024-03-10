"use client";

import { useState } from "react";
import css from "./DropDownMenu.module.css";

interface Option {
  onClick: (buttonName: string) => void;
  imagePath: string;
  defaultWidth: number;
  defaultHeight: number;
}

interface OptionsCollection {
  options: Option[];
  defaultImagePath: string;
  defaultWidth: number;
  defaultHeight: number;
}

export default function DropDownImage(options: OptionsCollection) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHoveringOverDiv, setHoveringOverDiv] = useState(false);
  const [imagePath, setImage] = useState(options.defaultImagePath);

  const handleOptionClick = (option: string) => {
    // TODO: this will need to be re-coded
    for (let i = 0; i < option.length; i++) {
      if (options.options[i].imagePath == option) {
        options.options[i].onClick(option);
        break;
      }
    }
  };

  return (
    <div
      className={css["dropdown-main"]}
      onMouseEnter={() => setHoveringOverDiv(true)}
      onMouseLeave={() => {
        if (isDropdownOpen) {
          setDropdownOpen(false);
        }

        setHoveringOverDiv(false);
      }}
    >
      <img
        src={options.defaultImagePath}
        width={options.defaultWidth}
        height={options.defaultHeight}
        className={css["dropdown-main-button"]}
        onMouseEnter={() => setDropdownOpen(true)}
      />

      {isDropdownOpen && (
        <div
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
          className={css["dropdown-options-div"]}
        >
          {options.options.map((option) => (
            <>
              {option.imagePath != imagePath && (
                <div className={css["inner-div"]}>
                  <img
                    src={option.imagePath}
                    height={option.defaultHeight}
                    width={option.defaultWidth}
                    className={css["dropdown-option-button"]}
                    onClick={() => {
                      handleOptionClick(option.imagePath);
                      setImage(option.imagePath);
                      setDropdownOpen(false);
                    }}
                  />
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
}
