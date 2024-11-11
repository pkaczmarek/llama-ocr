<div align="center">
  <div>
    <h1 align="center">Llama OCR</h1>
  </div>
	<p>An npm library to run OCR with Llama 3.2 Vision.</p>

<a href="https://www.npmjs.com/package/together-ai"><img src="https://img.shields.io/npm/v/together-ai" alt="Current version"></a>

</div>

---

## Installation

`npm i llama-ocr`

## Usage

```js
import { ocr } from "llama-ocr";

const markdown = await ocr({
  filePath: "yourfile.pdf",
  apiKey: process.env.TOGETHER_API_KEY,
});
```

## How it works

This library uses Llama 3.2 through [Together AI](https://www.together.ai/blog/llama-3-2-vision).
