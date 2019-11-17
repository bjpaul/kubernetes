## Genrate Private Key
```
~$ openssl genrsa -out developer.key 2048

Generating RSA private key, 2048 bit long modulus
...................................+++
.....................................................................................................+++
e is 65537 (0x10001)
```
## Generate CSR
```
~$ openssl req -new -key developer.key -out developer.csr  -subj "/CN=developer/O=xyz"
```

## Encode CSR and use the encoded format in the signing-request.yaml file
```
cat developer.csr | base64 | tr -d '\n' > encoded_developer.csr
```
