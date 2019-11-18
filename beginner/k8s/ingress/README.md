```
#cat ../config/ssl/nginx-selfsigned.key | base64 | tr -d '\n' > cert.demo-kube.com.key
#cat ../config/ssl/nginx-selfsigned.crt | base64 | tr -d '\n' > cert.demo-kube.com.crt

kubectl apply -f secret.yaml -n dev
kubectl apply -f ingress.yaml -n dev

```