"use client";

type NavButtonsProps = {
  activeNav: "WORKS" | "ABOUT";
  onNavChange: (nav: "WORKS" | "ABOUT") => void;
  className?: string;
  /** Mobile: ABOUT above WORKS */
  aboutFirst?: boolean;
};

export default function NavButtons({
  activeNav,
  onNavChange,
  className,
  aboutFirst = false,
}: NavButtonsProps) {
  const worksButton = (
    <button
      type="button"
      onClick={() => onNavChange("WORKS")}
      className="nav-btn"
      aria-pressed={activeNav === "WORKS"}
    >
      WORKS
    </button>
  );

  const aboutButton = (
    <button
      type="button"
      onClick={() => onNavChange("ABOUT")}
      className="nav-btn"
      aria-pressed={activeNav === "ABOUT"}
    >
      ABOUT
    </button>
  );

  return (
    <div className={["nav-btn-stack", className].filter(Boolean).join(" ")}>
      {aboutFirst ? (
        <>
          {aboutButton}
          {worksButton}
        </>
      ) : (
        <>
          {worksButton}
          {aboutButton}
        </>
      )}
    </div>
  );
}
