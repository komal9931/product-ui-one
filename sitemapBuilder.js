// const fs = require("fs");
import fs from "fs";

// Replace with your actual website URL
const BASE_URL = "https://prodpankaj.netlify.app/";

// Static routes
const routes = ["/", "/catlog"];

// If you want products pages, list all product IDs manually or dynamically
const productIds = ["1", "2", "3"]; // replace with your actual product IDs
productIds.forEach((id) => routes.push(`/products/${id}`));

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach((path) => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${path}</loc>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("✅ sitemap.xml generated in public folder");
}

generateSitemap();
