import express from "express";

const app = express();

app.get("/login", (req, res) => {
  const loginParams = new URLSearchParams({
    client_id: "node-client",
    redirect_uri: "http://localhost:3001/auth-callback",
    response_type: "code",
    scope: "openid",
  });

  const url = `http://keycloak:8080/realms/poc-demo/protocol/openid-connect/auth?${loginParams.toString()}`;
  res.redirect(url);
});

app.get("/auth-callback", async (req, res) => {
  const bodyParams = new URLSearchParams({
    client_id: "node-client",
    grant_type: "authorization_code",
    code: req.query.code as string,
    redirect_uri: "http://localhost:3001/auth-callback",
  });

  const url = `http://host.docker.internal:8080/realms/poc-demo/protocol/openid-connect/auth`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams.toString()
  });

  const result =await response.json();
  console.log(result);
  
  res.send(result);
});

app.listen(3001, () => {
  console.log("Demo Poc API Is Running on Port 3001");
});
