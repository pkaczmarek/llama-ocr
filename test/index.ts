import { ocr } from "../src/index";

async function main() {
  let markdown = await ocr({
    filePath:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/1920px-ReceiptSwiss.jpg",
    // filePath: "./test/trader-joes-receipt.jpg",
    apiKey: process.env.TOGETHER_API_KEY,
    model: "Llama-3.2-90B-Vision",
  });

  console.log(markdown);
}

main();
