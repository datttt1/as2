// Polyfill TextEncoder/TextDecoder cho các package như react-widgets
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Optional: mock fetch nếu dùng fetch
global.fetch = global.fetch || jest.fn();
// setupJestEnv.js
process.env.VITE_API_URL = "http://localhost:8080";
