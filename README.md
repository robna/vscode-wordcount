# Word Count Enhanced (wordcount-selection)

Practical, lightweight word counting for any (text-based) file in VS Code. Shows both:

* Total document words
* Words in your current selection(s) (shown in parentheses)

If you only want a quick, unobtrusive word count that also helps when editing snippets or measuring selected paragraphs across any language / file type, this extension is for you.

## Features

* Works for any file type (not limited to Markdown)
* Live total word count in the status bar
* Selection word count: shows `(N Selected)` when you select text (multi‑selection supported; counts are summed)
* Graceful fallback: shows `Word Count Unavailable` for extremely large or problematic files (to protect performance)
* All processing local – no telemetry, no network requests
* Simple heuristic whitespace-based counting (fast and predictable)

## How Counting Works

Words are determined by collapsing consecutive whitespace and splitting on a single space. HTML-like angle bracket fragments `(< ([^>]+)<)` are stripped (mirroring original sample logic). Selection counts use the exact same logic on just the selected text.

Edge cases:
* Empty or whitespace-only documents report 0
* Multi-cursor selections accumulate counts
* Very large documents (> ~5MB in current version) skip counting and show a fallback message instead of freezing

## Why Another Word Count Extension?

Most existing extensions either target Markdown only or don’t provide quick selection counts across any file. This fork started from Microsoft’s sample and evolved into a focused utility extension: accurate enough for drafting and editing, minimal overhead, and works everywhere.

## Installation

Install from the VS Code Marketplace: `Word Count Enhanced` (Publisher: robna). After installation, open any file; the status bar (left side) will display the counts automatically.

No configuration is required.

## Performance

Counting runs on basic events (editor activation & selection changes). For huge files a guard prevents excessive memory/CPU usage. If you routinely work with very large generated sources, you can open an issue to discuss smarter streaming strategies.

## Roadmap / Ideas

* Optional configurable large-file threshold
* Exclude patterns (e.g. node_modules) – currently unnecessary because the extension activates post-startup and counts only active editor text
* More robust tokenization mode (opt-in) for languages with special delimiters

## Attribution

Derived from the original MIT-licensed sample at `microsoft/vscode-wordcount`. Reworked for real-world usage: all-file support, selection counting, large-file safeguards, modern TypeScript toolchain, and improved documentation.

## Disclaimer

Provided "AS IS" under the MIT License. Word counts are heuristic; may be inaccurate for minified, generated, binary-like, or extremely large files. No data leaves your machine. Not for safety-critical use.
