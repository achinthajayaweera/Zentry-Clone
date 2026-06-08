import { readFileSync, writeFileSync } from "fs";

const BASE = "${import.meta.env.BASE_URL}";

const files = [
  "src/components/AboutUs.tsx",
  "src/components/ContactUs.tsx",
  "src/components/NavBar.tsx",
  "src/components/Story.tsx",
  "src/components/Features.tsx",
  "src/components/Pinned.tsx",
  "src/components/Hero.tsx",
];

for (const file of files) {
  let c = readFileSync(file, "utf8");
  const orig = c;

  // Fix broken half-replaced patterns first (from previous bad run)
  // Pattern: src={`${import.meta.env.BASE_URL}img/something"  <- broken
  c = c.replace(/src=\{`\$\{import\.meta\.env\.BASE_URL\}(img|videos|audio)\/([^"]+)"\s*}/g, 
    'src={`' + BASE + '$1/$2`}');
  c = c.replace(/src=\{`\$\{import\.meta\.env\.BASE_URL\}(img|videos|audio)\/([^"]+)"/g, 
    'src={`' + BASE + '$1/$2`}');

  // Fix setAttribute broken patterns  
  c = c.replace(/setAttribute\("src",\s*`\$\{import\.meta\.env\.BASE_URL\}videos\/([^"]+)"\)/g,
    'setAttribute("src", `' + BASE + 'videos/$1`)');

  // Fix any remaining plain string paths (not yet converted)
  c = c.replace(/src="\/img\//g, 'src={`' + BASE + 'img/');
  c = c.replace(/src="\/videos\//g, 'src={`' + BASE + 'videos/');
  c = c.replace(/src="\/audio\//g, 'src={`' + BASE + 'audio/');

  // Now fix the closing quotes - any remaining unclosed template literals
  // src={`${...}img/file.ext"  ->  src={`${...}img/file.ext`}
  c = c.replace(/src=\{`\$\{import\.meta\.env\.BASE_URL\}(img|videos|audio)\/([a-zA-Z0-9._-]+)"/g,
    'src={`' + BASE + '$1/$2`}');

  // Fix backtick video paths in JS (not JSX attributes)
  c = c.replace(/`\/videos\//g, '`' + BASE + 'videos/');

  // Fix setAttribute remaining
  c = c.replace(/setAttribute\("src",\s*"\/videos\//g, 'setAttribute("src", `' + BASE + 'videos/');
  c = c.replace(/setAttribute\("src",\s*`\/videos\//g, 'setAttribute("src", `' + BASE + 'videos/');

  if (c !== orig) {
    writeFileSync(file, c, "utf8");
    console.log("Fixed:", file);
  } else {
    console.log("No changes:", file);
  }
}
console.log("Done!");
