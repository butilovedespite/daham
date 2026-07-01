"use client";

type NavButtonsProps = {
  activeNav: "WORKS" | "ABOUT";
  onNavChange: (nav: "WORKS" | "ABOUT") => void;
};

export default function NavButtons({ activeNav, onNavChange }: NavButtonsProps) {
  return (
    <div className="nav-btn-stack">
      <button
        type="button"
        onClick={() => onNavChange("WORKS")}
        className="nav-btn"
        aria-pressed={activeNav === "WORKS"}
      >
        WORKS
      </button>
      <button
        type="button"
        onClick={() => onNavChange("ABOUT")}
        className="nav-btn"
        aria-pressed={activeNav === "ABOUT"}
      >
        ABOUT
      </button>
    </div>
  );
}
