Here is the rewritten README for **Presentation Go**. All images and assets have been removed, and the application name has been updated throughout.

-----

# Presentation Go

**Open-Source AI Presentation Generator and API** *(Alternative to Gamma, Beautiful AI, and Decktopus)*

**Presentation Go** is an open-source application for generating presentations with AI — all running locally on your device. Stay in control of your data and privacy while using models like OpenAI and Gemini, or use your own hosted models through Ollama.

Generate presentations from simple text prompts or upload existing files to create on-brand designs.

> **Note for Enterprise:** For enterprise use, custom deployments, or partnership opportunities, please contact the maintainers.

-----

## ✨ Key Features

**Presentation Go** gives you complete control over your AI presentation workflow. Choose your models, customize your experience, and keep your data private.

  * **Custom Templates & Themes:** Create unlimited presentation designs with HTML and Tailwind CSS.
  * **AI Template Generation:** Create presentation templates directly from existing PowerPoint documents.
  * **Flexible Generation:** Build presentations from prompts or uploaded documents.
  * **Export Ready:** Save as PowerPoint (PPTX) and PDF with professional formatting.
  * **Built-In MCP Server:** Generate presentations over Model Context Protocol.
  * **Bring Your Own Key:** Use your own API keys for OpenAI, Google Gemini, Anthropic Claude, or any compatible provider. Pay only for what you use.
  * **Ollama Integration:** Run open-source models locally with full privacy.
  * **Multi-Provider Support:** Mix and match text and image generation providers.
  * **Versatile Image Generation:** Choose from DALL-E 3, Gemini Flash, Pexels, or Pixabay.
  * **Rich Media Support:** Icons, charts, and custom graphics for professional presentations.
  * **Runs Locally:** All processing happens on your device; no cloud dependencies required.
  * **Docker Ready:** One-command deployment with GPU support for local models.

-----

## 🚀 Quick Start with Docker

### 1\. Start presentation-go

**Linux/MacOS (Bash/Zsh):**

```bash
docker run -it --name presentation-go -p 5000:80 -v "./app_data:/app_data" ghcr.io/presenton/presenton:latest
```

**Windows (PowerShell):**

```bash
docker run -it --name presentation-go -p 5000:80 -v "${PWD}\app_data:/app_data" ghcr.io/presenton/presenton:latest
```

### 2\. Open the Application

Open `http://localhost:5000` in your browser to start using **Presentation Go**.

> **Note:** You can replace `5000` with any port number of your choice.

-----

## ⚙️ Deployment Configurations

You can provide API keys and settings via environment variables to keep them hidden or configure the specific LLM backend.

### Core Variables

  * **CAN\_CHANGE\_KEYS=[true/false]**: Set to `false` to lock API keys and hide them from the UI.
  * **LLM=[openai/google/anthropic/ollama/custom]**: Select your text generation model.
  * **DISABLE\_ANONYMOUS\_TELEMETRY=[true/false]**: Set to `true` to disable telemetry.

### Provider Specific Variables

**OpenAI**

  * `OPENAI_API_KEY`: Your OpenAI API Key.
  * `OPENAI_MODEL`: Model ID (default: "gpt-4.1").

**Google (Gemini)**

  * `GOOGLE_API_KEY`: Your Google API Key.
  * `GOOGLE_MODEL`: Model ID (default: "models/gemini-2.0-flash").

**Anthropic**

  * `ANTHROPIC_API_KEY`: Your Anthropic API Key.
  * `ANTHROPIC_MODEL`: Model ID (default: "claude-3-5-sonnet-20241022").

**Ollama**

  * `OLLAMA_URL`: Custom Ollama URL (if not running on localhost).
  * `OLLAMA_MODEL`: The Ollama model tag to use.

**Custom OpenAI-Compatible API**

  * `CUSTOM_LLM_URL`: Your custom endpoint URL.
  * `CUSTOM_LLM_API_KEY`: Your custom API Key.
  * `CUSTOM_MODEL`: The Model ID.
  * `TOOL_CALLS=[true/false]`: Enable tool calls (vs JSON schema).
  * `DISABLE_THINKING=[true/false]`: Disable "thinking" output if applicable.

### Image Generation Configuration

You can independently choose your image provider (supported: `pexels`, `pixabay`, `gemini_flash`, `dall-e-3`).

  * **IMAGE\_PROVIDER**: Select provider (defaults to `dall-e-3` for OpenAI or `gemini_flash` for Google).
  * **PEXELS\_API\_KEY**: Required if using Pexels.
  * **PIXABAY\_API\_KEY**: Required if using Pixabay.

-----

## 📦 Run Examples

### Using OpenAI

```bash
docker run -it --name presentation-go -p 5000:80 \
  -e LLM="openai" \
  -e OPENAI_API_KEY="your-key-here" \
  -e IMAGE_PROVIDER="dall-e-3" \
  -e CAN_CHANGE_KEYS="false" \
  -v "./app_data:/app_data" \
  ghcr.io/presenton/presenton:latest
```

### Using Google

```bash
docker run -it --name presentation-go -p 5000:80 \
  -e LLM="google" \
  -e GOOGLE_API_KEY="your-key-here" \
  -e IMAGE_PROVIDER="gemini_flash" \
  -e CAN_CHANGE_KEYS="false" \
  -v "./app_data:/app_data" \
  ghcr.io/presenton/presenton:latest
```

### Using Ollama (Local)

```bash
docker run -it --name presentation-go -p 5000:80 \
  -e LLM="ollama" \
  -e OLLAMA_MODEL="llama3.2:3b" \
  -e IMAGE_PROVIDER="pexels" \
  -e PEXELS_API_KEY="your-key-here" \
  -e CAN_CHANGE_KEYS="false" \
  -v "./app_data:/app_data" \
  ghcr.io/presenton/presenton:latest
```

### GPU Support (NVIDIA)

To enable GPU acceleration for local models (Ollama), ensure the NVIDIA Container Toolkit is installed and add the `--gpus=all` flag:

```bash
docker run -it --name presentation-go --gpus=all -p 5000:80 \
  -e LLM="ollama" \
  -e OLLAMA_MODEL="llama3.2:3b" \
  -v "./app_data:/app_data" \
  ghcr.io/presenton/presenton:latest
```

-----

## 🔌 API Reference

**Presentation Go** can be used as a backend API to generate presentations programmatically.

**Endpoint:** `/api/v1/ppt/presentation/generate`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content` | string | **Yes** | The prompt/topic for the presentation. |
| `n_slides` | integer | No | Number of slides (default: 8). |
| `language` | string | No | Language (default: "English"). |
| `template` | string | No | Template ID (default: "general"). |
| `export_as` | string | No | "pptx" or "pdf" (default: "pptx"). |
| `tone` | string | No | "default", "casual", "professional", "funny", etc. |
| `verbosity` | string | No | "concise", "standard", or "text-heavy". |
| `web_search` | boolean | No | Enable web search (default: false). |
| `include_table_of_contents` | boolean | No | Include ToC slide (default: false). |

### Example Request

```bash
curl -X POST http://localhost:5000/api/v1/ppt/presentation/generate \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Introduction to Machine Learning",
    "n_slides": 5,
    "language": "English",
    "template": "general",
    "export_as": "pptx"
  }'
```

### Example Response

```json
{
  "presentation_id": "d3000f96-096c-4768-b67b-e99aed029b57",
  "path": "/app_data/d3000f96-096c-4768-b67b-e99aed029b57/Introduction_to_Machine_Learning.pptx",
  "edit_path": "/presentation?id=d3000f96-096c-4768-b67b-e99aed029b57"
}
```