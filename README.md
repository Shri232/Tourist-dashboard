# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tourist-dashboard

# Why `npx run dev` Fails

You ran:

```
npx run dev
```

This fails because there is **no file or script named `dev`** in your project root.  
`npx` is used to run executables from `node_modules/.bin` or npm packages, not npm scripts.

## How to Start Your Project

If you are using Vite (which you are), use **npm** or **yarn**:

```
npm run dev
```

or

```
yarn dev
```

**Do not use `npx run dev`.**  
`npm run dev` will look up the `"dev"` script in your `package.json` and run it (usually Vite).

## Summary

- Use `npm run dev` (not `npx run dev`) for Vite projects.
- Use `npm start` for Create React App.
- Make sure your `package.json` has a `"dev"` or `"start"` script.

**Check your `package.json` for available scripts:**

```json
"scripts": {
  "dev": "vite",
  "start": "react-scripts start"
}
```

Then use the appropriate command.
