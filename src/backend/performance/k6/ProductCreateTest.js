import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
  ],
};

export default function () {
  const url = "http://localhost:8080/api/product/create";

  const payload = JSON.stringify({
    name: "Product_" + Math.random(),
    category: { id: 1 },
    price: 150000,
    description: "Test performance",
    quantity: 50
  });

  const params = { headers: { "Content-Type": "application/json" } };

  http.post(url, payload, params);

  sleep(1);
}
