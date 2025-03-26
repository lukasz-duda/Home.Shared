import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: true,
  },
  plugins: [typescript()],
  external: ["react", "react/jsx-runtime", "antd"],
});
