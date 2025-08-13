## Security Policy

This project is a community fork of the original `microsoft/vscode-wordcount` sample. It has a narrow scope and processes text locally inside the VS Code extension host. The extension does not perform any network requests or collect telemetry.

### Reporting a Vulnerability

If you believe you have found a security vulnerability (e.g., denial of service via pathological input, unexpected resource consumption, or data leakage):

1. Do not publicly disclose immediately.
2. Open a new issue at: https://github.com/robna/vscode-wordcount/issues with a short non-sensitive description OR, if sensitive, redact details and offer to provide them privately.
3. Provide steps to reproduce, including sample text or file characteristics (avoid sharing proprietary content).

### Scope

In-scope: Logic errors leading to crashes, unbounded resource consumption, or exposure of file contents to other workspaces.

Out-of-scope: Inaccurate word counts for obfuscated, binary, minified, or extremely large files; downstream issues caused by user-installed third-party extensions; deliberate user modification of the extension.

### Responsible Disclosure

We aim to respond within 7 days. If no acknowledgment in that time, you may escalate by tagging the repository owner in the original issue.

### Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. See LICENSE.txt and README disclaimer for details.
