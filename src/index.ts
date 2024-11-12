import Together from "together-ai";
import fs from "fs";
// import { fromPath } from "pdf2pic";

export async function ocr({
  filePath,
  apiKey = process.env.TOGETHER_API_KEY,
  model = "free",
}: {
  filePath: string;
  apiKey?: string;
  model?: "Llama-3.2-90B-Vision" | "Llama-3.2-11B-Vision" | "free";
}) {
  const visionLLM =
    model === "free"
      ? "meta-llama/Llama-Vision-Free"
      : `meta-llama/${model}-Instruct-Turbo`;

  const together = new Together({
    apiKey,
  });

  let finalMarkdown = await getMarkDown({ together, visionLLM, filePath });

  return finalMarkdown;

  // if (filePath.endsWith(".pdf")) {
  //   const options = {
  //     density: 100, // Image density
  //     saveFilename: "output", // Output filename
  //     savePath: "./images", // Output directory
  //     format: "png", // Image format: png, jpeg, etc.
  //     width: 2550, // Desired width of the image
  //     height: 3300, // Desired height of the image
  //   };

  //   // Create a converter instance
  //   const converter = fromPath(filePath, options);

  //   // Convert all pages to images
  //   await converter
  //     .bulk(-1)
  //     .then((resolve) => {
  //       console.log("Images converted:", resolve);
  //     })
  //     .catch((error) => {
  //       console.error("Error converting PDF:", error);
  //     });

  // continue here by calling the getMarkDown function for each image
  // }
}

async function getMarkDown({
  together,
  visionLLM,
  filePath,
}: {
  together: Together;
  visionLLM: string;
  filePath: string;
}) {
  const systemPrompt = `Convert the provided image into Markdown format. Ensure that all content from the page is included, such as headers, footers, subtexts, images (with alt text if possible), tables, and any other elements.

  Requirements:

  - Output Only Markdown: Return solely the Markdown content without any additional explanations or comments.
  - No Delimiters: Do not use code fences or delimiters like \`\`\`markdown.
  - Complete Content: Do not omit any part of the page, including headers, footers, and subtext.
  `;

  const finalImageUrl = isRemoteFile(filePath)
    ? filePath
    : `data:image/jpeg;base64,${encodeImage(filePath)}`;

  const output = await together.chat.completions.create({
    model: visionLLM,
    messages: [
      {
        role: "user",
        // @ts-expect-error
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: finalImageUrl,
            },
          },
        ],
      },
    ],
  });

  return output.choices[0].message.content;
}

function encodeImage(imagePath: string) {
  const imageFile = fs.readFileSync(imagePath);
  return Buffer.from(imageFile).toString("base64");
}

function isRemoteFile(filePath: string): boolean {
  return filePath.startsWith("http://") || filePath.startsWith("https://");
}
