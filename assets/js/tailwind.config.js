tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#E11D2E", // Ruby Red
                "secondary": "#A8B2C1", // Cold Silver
                "tertiary": "#F5C542", // Amber Gold
                "background": "#080808", // Carbon Black
                "surface": "#141414", // Obsidian Gray
                "on-surface": "#A8B2C1",
                "on-background": "#FFFFFF",
                "outline-variant": "rgba(168, 178, 193, 0.1)"
            },
            spacing: {
                "section_padding": "120px",
                "gutter": "24px",
                "stack_md": "16px",
                "stack_lg": "32px",
            },
            fontFamily: {
                "headline": ["Oswald", "sans-serif"],
                "body": ["Inter", "sans-serif"],
                "quote": ["Playfair Display", "serif"]
            }
        }
    }
}
