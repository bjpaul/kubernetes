###Ref: https://www.cncf.io/blog/2018/08/01/demystifying-rbac-in-kubernetes/
https://docs.bitnami.com/kubernetes/how-to/configure-rbac-in-your-kubernetes-cluster/
https://kubernetes.io/docs/reference/access-authn-authz/rbac/

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
### CN=user and O=group

## Encode CSR and use the encoded format in the signing-request.yaml file
```
~$ cat developer.csr | base64 | tr -d '\n' > encoded_developer.csr
```
## Create the certificate signing request object
```
~$ kubectl apply -f signing-request.yaml

certificatesigningrequest.certificates.k8s.io/developer-csr created

~ $ kubectl get csr

NAME            AGE     REQUESTOR          CONDITION
developer-csr   2m10s   kubernetes-admin   Pending
```
## Approve the certificate signing request object
```
~ $ kubectl certificate approve developer-csr

certificatesigningrequest.certificates.k8s.io/developer-csr approved

~ $ kubectl get csr

NAME            AGE     REQUESTOR          CONDITION
developer-csr   3m36s   kubernetes-admin   Approved,Issued
```
## Now extract certificate and then decode it
```
~ $ kubectl get csr developer-csr -o jsonpath='{.status.certificate}' | base64 --decode > developer.crt
```
## Now configure the developer user's credentials by assigning the key and certificate: 
```
~ $ kubectl config set-credentials developer --client-certificate=developer.crt --client-key=developer.key

User "developer" set.
```
## Now check kube config
```
~ $ kubectl config view

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://172.31.94.95:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: developer
  user:
    client-certificate: /home/ubuntu/kubernetes/beginner/k8s/rbac/developer.crt
    client-key: /home/ubuntu/kubernetes/beginner/k8s/rbac/developer.key
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

```

## Now set new developer user context for specific cluster, namespace
```
~ $ kubectl config set-context developer --cluster=kubernetes --namespace=dev --user=developer

Context "developer" created.

~ $ kubectl config view

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://172.31.94.95:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    namespace: dev
    user: developer
  name: developer
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: developer
  user:
    client-certificate: /home/ubuntu/kubernetes/beginner/k8s/rbac/developer.crt
    client-key: /home/ubuntu/kubernetes/beginner/k8s/rbac/developer.key
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

```

## Now try to access all pods of dev namespace as the new developer user
```
~ $ kubectl --context=developer get pods

Error from server (Forbidden): pods is forbidden: User "developer" cannot list resource "pods" in API group "" in the namespace "dev"
```

## Give permission to developer user
```
~ $ kubectl apply -f role.yaml -n dev

role.rbac.authorization.k8s.io/pod-reader created

~ $ kubectl apply -f rolebinding.yaml -n dev

rolebinding.rbac.authorization.k8s.io/pod-read-access created

~ $ kubectl --context=developer get pods

NAME                        READY   STATUS    RESTARTS   AGE
consumer-5c8477dcfd-57c6v   1/1     Running   0          127m
frontend-86984f8c5-lkn6g    1/1     Running   0          127m
mongo-64f5dfd77d-mrgjk      1/1     Running   0          128m
queue-6949774487-b2j4j      1/1     Running   0          128m
reader-db68d84ff-gs2hj      1/1     Running   0          127m
web-6d65df89c4-j9lxs        1/1     Running   3          127m
writer-85d9c87bdd-vgs9m     1/1     Running   0          127m
```