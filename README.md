# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Local Development

```sh
bun run tauri dev
```

## Build App

### MacOS

```sh
bun tauri build --bundles app

# copies the standard-e.app file to /Applications
sudo ./scripts/macos/move-to-applications.sh
```

### Windows Installer

```sh
bun tauri build
```

### Other Platforms

https://v2.tauri.app/distribute/
