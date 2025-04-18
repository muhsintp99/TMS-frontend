console.log(import.meta.env.VITE_API_URL); // ✅ Works

const config = {
  ip: import.meta.env.VITE_API_URL,
};

export default config;
