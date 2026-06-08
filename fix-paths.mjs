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
  c = c.replace(/src="\/img\//g, `src={\`${BASE}img/`);
  c = c.replace(/src="\/videos\//g, `src={\`${BASE}videos/`);
  c = c.replace(/src="\/audio\//g, `src={\`${BASE}audio/`);
  c = c.replace(/`\/videos\//g, `\`${BASE}videos/`);
  c = c.replace(/setAttribute\("src", "\/videos\//g, `setAttribute("src", \`${BASE}videos/`);
  if (c !== orig) {
    writeFileSync(file, c, "utf8");
    console.log("Fixed:", file);
  }
}
console.log("Done!");