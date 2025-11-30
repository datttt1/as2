import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 11000 },
   // { duration: "10s", target: 2000 },
    //{ duration: "10s", target: 3000 },
    //{ duration: "10s", target: 5000 },
   // { duration: "10s", target: 11000 },
  ],
};

export default function () {
    const url = 'http://localhost:8080/api/auth/login';
    const payLoad = JSON.stringify({
        username: "admin12",
        password: "admin123"
    });

    const params = { headers : {'Content-Type' : 'application/json'}};
    http.post(url,payLoad,params);
    sleep(1);
}

