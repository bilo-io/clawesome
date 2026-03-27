This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Compiling the Desktop App (macOS)

Instead of running as a standard Next.js web application, this dashboard can be securely bundled into a native desktop application using Tauri. Doing so pulls in binaries built by our CLI and Gateway.

To build the standalone `.dmg` bundle for macOS:

1. Traverse to the monorepo root.
2. Execute the forge script:

```bash
cd ../../
./scripts/forge-bundle.sh
```

**Note**: You must compile from the workspace root because the build depends on syncing fresh sidecar CLI binaries prior to invoking the `bunx @tauri-apps/cli build` command.

This script will seamlessly execute the entire updated Moonrepo graph, stringing together:

- `moon run gateway:build` (compiles the standalone Node.js API binaries)
- `moon run cli:build` (compiles the standalone CLI binaries)
- `moon run dashboard:build` (runs the clean Next.js static export we fixed)
- `moon run dashboard:tauri-build` (finally uses the correct Rust/Tauri wrapper)

Copies all artifacts into your macOS .dmg file and routes it correctly to your Next.js Website public folder (apps/website/public/downloads/Clawesome-Mac.dmg).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
