// const fs = require("fs");
import fs from "fs";

const BASE_URL = "https://jaskas-you.netlify.app"; // NO ending slash

const routes = ["/", "/catlog"];

const productIds = ["1", "2", "3"];

productIds.forEach((id) => routes.push(`/products/${id}`));

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach((path) => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${path}</loc>\n`; // now correct
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("✅ sitemap.xml generated correctly");
}

generateSitemap();
