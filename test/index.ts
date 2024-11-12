import { ocr } from "../src/index";

async function main() {
  let markdown = await ocr({
    filePath: "./test/trader-joes-receipt.jpg",
    apiKey: process.env.TOGETHER_API_KEY,
    model: "Llama-3.2-90B-Vision",
  });

  console.log(markdown);
}

main();
