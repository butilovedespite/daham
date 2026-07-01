"use client";

import { useEffect, useRef, useState } from "react";
import {
  CATEGORY_LABELS,
  FILTER_CATEGORIES,
  type Category,
} from "@/lib/projects";

type CategoryDropdownProps = {
  activeCategory: Category | "ALL";
  onCategoryChange: (category: Category | "ALL") => void;
};

type DropdownItem = Category | "ALL";

export default function CategoryDropdown({
  activeCategory,
  onCategoryChange,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<DropdownItem | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setHoveredItem(null);
    }
  }, [isOpen]);

  const handleSelect = (category: DropdownItem) => {
    onCategoryChange(category);
    setIsOpen(false);
    setHoveredItem(null);
  };

  const isHighlighted = (item: DropdownItem) => {
    if (hoveredItem !== null) {
      return hoveredItem === item;
    }
    return activeCategory === item;
  };

  const itemClassName = (item: DropdownItem) =>
    `category-dropdown__item${
      isHighlighted(item) ? " category-dropdown__item--highlighted" : ""
    }`;

  const triggerLabel =
    activeCategory === "ALL" ? "ALL" : CATEGORY_LABELS[activeCategory];

  return (
    <div ref={rootRef} className="category-dropdown">
      <button
        type="button"
        className="category-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{triggerLabel}</span>
        <span className="category-dropdown__caret" aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          className="category-dropdown__list"
          role="listbox"
          onMouseLeave={() => setHoveredItem(null)}
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={activeCategory === "ALL"}
              className={itemClassName("ALL")}
              onMouseEnter={() => setHoveredItem("ALL")}
              onClick={() => handleSelect("ALL")}
            >
              ALL
            </button>
          </li>
          {FILTER_CATEGORIES.map((category) => (
            <li key={category}>
              <button
                type="button"
                role="option"
                aria-selected={activeCategory === category}
                className={itemClassName(category)}
                onMouseEnter={() => setHoveredItem(category)}
                onClick={() => handleSelect(category)}
              >
                {CATEGORY_LABELS[category]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
