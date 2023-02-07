import { useTheme } from "next-themes";

// Do NOT use this! It will throw a hydration mismatch error.
//Fix hydration error?
//Jan 4 2023 - make sure to look into possible hydration error.
//Feb 7 2023 - still have not looked into hydration error. Nor encountered it.

const ThemeManager = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="rounded-md bg-[hsl(0,0%,88%)] py-1 px-2 font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-100"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    </button>
  );
};

export default ThemeManager;
