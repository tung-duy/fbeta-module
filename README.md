# Fbeta Helper Management

<p align="center">
  <img width="460" height="300" src="https://dev.fpt.work/images/FTI/15c12a77-2b45-4057-bb0a-aa07fb1d8a29.svg">
</p>

---

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

---

## callAPI

```bash
    BASE_URL: "http://localhost:3000",
```

---

## Installation

```bash
  # Install package
  npm install @fbeta/helper

```

---

## Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

- https://jwt.io/introduction/
- https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html

---

## Cross-Origin Resource Sharing (CORS)

This applications has CORS enabled by default on all API endpoints. The default configuration only allows requests origin from

1. `http://localhost:8008`

The CORS allowed origins can be changed by setting in the config file.

---

## Authors and acknowledgment

- Project manager: `tungdd5@fpt.com.vn`

---

## Support

Reach out to me at one of the following places!

- Website at https://fbeta.tech
- Email: support@fbeta.tech
- Phone: 0358001357

---

## License

© 2020 FPT VPN. Crafted with :heart: by [Fbeta.tech](https://fbeta.tech) - tungdd5@fpt.com.vn
