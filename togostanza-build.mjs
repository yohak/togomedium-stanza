import dotenv from "rollup-plugin-dotenv";

export default function config(environment) {
  return {
    rollup: {
      plugins: [dotenv()],
    },
  };
}
