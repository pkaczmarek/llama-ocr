<div align="center">
  <div>
    <h1 align="center">Llama OCR</h1>
  </div>
	<p>An npm library to run OCR for free with Llama 3.2 Vision.</p>

<a href="https://www.npmjs.com/package/llama-ocr"><img src="https://img.shields.io/npm/v/llama-ocr" alt="Current version"></a>

</div>

---

## Installation

`npm i llama-ocr`

_This library depends on `graphicsmagick` and you may need to install it for it to work for PDFs. On macOS, you can install it with `brew update && brew install gs graphicsmagickbrew`._

## Usage

```js
import { ocr } from "llama-ocr";

const markdown = await ocr({
  filePath: "./nvidia-investor-report.pdf", // path to your PDF or image
  model: "Llama-3.2-90B-Vision", // optional, defaults to "free"
  apiKey: process.env.TOGETHER_API_KEY,
});
```

## How it works

This library uses the free Llama 3.2 endpoint from [Together AI](https://dub.sh/together-ai). Paid endpoints for Llama 3.2 11B and Llama 3.2 90B are also available for faster performance and higher rate limits.

## Credit

This project was inspired by [Zerox](https://github.com/getomni-ai/zerox). Go check them out!
