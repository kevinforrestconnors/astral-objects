import { file, serve } from "bun";
import { join } from "path";

import html from "bun-plugin-html";

await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./dist", // Specify the output directory
  plugins: [html()],
});

const DIST_DIR = join(import.meta.dir, "dist");

const proxyTarget = "https://challenge.crossmint.io";

serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api")) {
      const apiUrl = `${proxyTarget}${url.pathname.slice(url.pathname.indexOf("/api"))}`;
      console.log(`${req.mode} ${apiUrl}`);

      if (req.body) {
        try {
          // Convert ReadableStream to JSON
          const text = await req.text();
          var body = text ? JSON.parse(text) : null; // Parse if it's valid JSON
        } catch (err) {
          console.error("Error reading body:", err);
          return new Response("Invalid JSON body", { status: 400 });
        }
      }

      try {
        const response = await fetch(
          new Request(apiUrl, {
            method: req.method,
            headers: {
              ...req.headers,
              "Content-Type": "application/json", // Explicitly set Content-Type
            },
            body: body ? JSON.stringify(body) : undefined,
          })
        );

        return Response.json(await response.json());
      } catch (error) {
        console.log(error);
        return new Response("Error fetching API", { status: 500 });
      }
    }

    // Serve static files from the dist directory
    try {
      const filePath = join(DIST_DIR, url.pathname === "/" ? "index.html" : url.pathname);
      return new Response(file(filePath));
    } catch (e) {
      return new Response("Not Found", { status: 404 });
    }
  },
});

console.log(`Server running at http://localhost:8080`);
