Docs should somewhat mimic normal developer docs.

Core:
- theme switching just like in the other apps/sites
- copy the app icon and logo from the website over to this repo.

Layout:
- Left sidebar with search input at the top
- Top bar with links to other pages relevant to the docs



- Landing page (command to quickly install, showing a terminal command)
- All the docs pages that can be viewed with the searchable sidebar.
- On the right a fixed/ floating section indicating at which heading you are as you scroll through the given document
- Resources (including MCPs?)
- Release Notes

Components:
- we will need 2 types of components for code/command preview.
  - The one will be languages, where you pass can see the same logic for different language snippets.
  -The other will be commands, where a different package manager command might get used.
  - Under the hood both of these would be more or less the same, and should use highlight.js to render the code with syntax highlighting correctly.