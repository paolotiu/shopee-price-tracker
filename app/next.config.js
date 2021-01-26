module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
    });

    return config;
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: "https://price-tracker-pt.herokuapp.com",
    NEXT_PUBLIC_CLIENT_URL: "https://spt-bypt.vercel.app",
  },
};
