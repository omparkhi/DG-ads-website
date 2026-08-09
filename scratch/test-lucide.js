import * as lucide from "lucide-react";
console.log("Total keys count:", Object.keys(lucide).length);
console.log("Sample keys (first 100):", Object.keys(lucide).slice(0, 100));
console.log("Github key:", Object.keys(lucide).filter(k => k.toLowerCase().includes("git")));
console.log("Youtube key:", Object.keys(lucide).filter(k => k.toLowerCase().includes("you")));
