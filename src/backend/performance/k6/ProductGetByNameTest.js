import http from "k6/http";
import { sleep } from "k6";

export let options = {
    stages: [
        {duration: "10s", target: 100},
    ],
};

export default function () {
    const url = "http://localhost:8080/api/product/getbyname/iPhone 15";
    http.get(url);
    sleep(1);
}