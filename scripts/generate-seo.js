import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config();

// We need the Supabase URL and Anon Key. In the app, it's hardcoded in src/lib/supabase.ts
// We'll use the hardcoded ones here for the build script to ensure it works without ENV vars
const supabaseUrl = 'https://tynegdbfvuermlnyignc.supabase.co';
const supabaseAnonKey = 'sb_publishable_g_FdZEevOaDNtk1Jw8YRxA_YS2jl1HA';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Site URL - replace with the actual production domain or use an environment variable
const SITE_URL = process.env.APP_URL || 'https://echokart.in';

async function generateSeo() {
  console.log('Fetching products from Supabase for SEO generation...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name')
    .eq('status', 'In Stock'); // Optional: only index in-stock products

  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  if (!products || products.length === 0) {
    console.log('No products found for SEO generation.');
    return;
  }

  console.log(`Found ${products.length} products. Generating sitemap...`);

  // 1. Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${products.map(product => `  <url>
    <loc>${SITE_URL}/product?id=${product.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  const distDir = path.resolve(__dirname, '../dist');
  const publicDir = path.resolve(__dirname, '../public');

  // We write to public so it's always there, but if we're running post-build we write to dist too
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  }
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
  }

  console.log('sitemap.xml generated successfully.');

  // 2. Inject links into index.html
  // We'll inject it into dist/index.html since we want to do this post-build
  const indexPath = path.join(distDir, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('Injecting SEO links into dist/index.html...');
    let htmlContent = fs.readFileSync(indexPath, 'utf-8');

    // Create a hidden div with all the product links
    const seoLinksHtml = `<div style="display: none;" id="seo-links">\n${products.map(p => `  <a href="/product?id=${p.id}">${escapeHtml(p.name)}</a>`).join('\n')}\n</div>`;

    // Inject before </body>
    if (htmlContent.includes('</body>')) {
      htmlContent = htmlContent.replace('</body>', `${seoLinksHtml}\n</body>`);
      fs.writeFileSync(indexPath, htmlContent);
      console.log('Successfully injected SEO links into index.html');
    } else {
      console.warn('Could not find </body> tag in index.html to inject links.');
    }
  } else {
    console.warn('dist/index.html not found. Ensure you run this script AFTER the build step.');
  }
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

generateSeo().catch(console.error);
