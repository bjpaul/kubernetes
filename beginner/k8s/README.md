kubectl label nodes <node-name> node-role.kubernetes.io/node=storage
kubectl label nodes <node-name> node-role.kubernetes.io/node=app


kubectl apply -f namespace.yaml
kubectl apply -f -R storage/ --namespace=dev
kubectl apply -f network/ --namespace=dev

#kubectl delete secret my-app-certs -n dev
kubectl create secret generic my-app-certs -n dev --from-file=config/ssl

#update the resolver ip in the conf and create config map
#kubectl delete configmap nginx-resolver-conf -n dev
kubectl create configmap nginx-resolver-conf -n dev --from-file=config/nginx/resolver.conf

## equicalent to kubectl expose deployment/db-deployment

kubectl apply -f deployment/ --namespace=dev
kubectl apply -f service/nodeport/ --namespace=dev

Get Node IP: kubectl get pods -n dev -o wide | grep writer
NAME                        READY   STATUS    RESTARTS   AGE   IP                NODE               NOMINATED NODE   READINESS GATES
writer-598ddb4c94-s6f42     1/1     Running   0          4m44s   192.168.17.79     ip-172-31-2-106    <none>           <none>

Get Node Dynamic port: kubectl describe svc writer -n dev | grep NodePort #(default: 30000-32767)
Type:                     NodePort
NodePort:                 http  31150/TCP
NOTE: 
1. default port range can be modified with --service-node-port-range option in service creation
2. but the allocated port for the service will be same accross all server

Test app output: curl http://<node-public-ip>:<node-dynamic-port> ==>> Hello World with Express


## Rollback strategy

- ### get revision hostory
```
~$ kubectl rollout history deployment.v1.apps/web -n dev

deployment.apps/web
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         <none>
4         <none>
5         <none>
6         <none>
7         <none>
```

- ### see details of a specific revision
```
~$ kubectl rollout history deployment.v1.apps/web -n dev --revision=5

deployment.apps/web with revision #5
Pod Template:
  Labels:	app=web
	pod-template-hash=6f4545f884
	version=1.0.0
  Containers:
   web:
    Image:	bijoydocker/kubernetes-beginner-web:advance
    Ports:	443/TCP, 80/TCP
    Host Ports:	0/TCP, 0/TCP
    Liveness:	http-get http://:80/server_status delay=30s timeout=5s period=30s #success=1 #failure=3
    Readiness:	http-get http://:80/server_status delay=10s timeout=5s period=5s #success=3 #failure=5
    Environment:	<none>
    Mounts:
      /etc/nginx/conf.d from resolver-conf (ro)
      /etc/nginx/ssl from tls-certs (ro)
  Volumes:
   tls-certs:
    Type:	Secret (a volume populated by a Secret)
    SecretName:	my-app-certs
    Optional:	false
   resolver-conf:
    Type:	ConfigMap (a volume populated by a ConfigMap)
    Name:	nginx-resolver-conf
    Optional:	false

```

- ### rolling back to previous version
```
~$ kubectl rollout undo deployment.v1.apps/web -n dev

deployment.apps/web rolled back
```

- ### rolling back to specifc version
```
~$ kubectl rollout undo deployment.v1.apps/web -n dev --to-revision=7

deployment.apps/web rolled back
```