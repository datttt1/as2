import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "5s", target: 100 },
    { duration: "2s", target: 3000 },
    { duration: "5s", target: 100 },
  ],
};

export default function () {
  const url = "http://localhost:8080/api/product/delete/1";

  http.del(url);

  sleep(1);
}
