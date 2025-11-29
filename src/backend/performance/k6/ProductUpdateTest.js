import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 2000 },
  ],
};

export default function () {
  const url = "http://localhost:8080/api/product/update";

  const payload = JSON.stringify({
    id: 1,
    name: "Updated Product",
    category: { id: 1 },
    price: 250000,
    description: "Updated description",
    quantity: 20
  });

  const params = { headers: { "Content-Type": "application/json" } };

  http.put(url, payload, params);

  sleep(1);
}
