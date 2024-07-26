import express from "express";

const app = express();

app.get("/login", (req, res) => {
  const loginParams = new URLSearchParams({
    client_id: "node-client",
    redirect_uri: "http://localhost:3001/auth-callback",
    response_type: "code",
    scope: "openid",
  });

  const url = `http://localhost:8080/realms/poc-demo/protocol/openid-connect/auth?${loginParams.toString()}`;
  res.redirect(url);
});

app.get("/auth-callback", (req, res) => {
  const url = `http://172.17.0.1:8080/realms/poc-demo/protocol/openid-connect/auth`;
  res.send("callback auth");
});

app.listen(3001, () => {
  console.log("Demo Poc API Is Running on Port 3001");
});
