export const apps = [
  {
    nme: "untappedeapi",
    script: "build/index.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    watch: ".",
  },
];
