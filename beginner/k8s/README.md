kubectl label nodes <node-name> node-role.kubernetes.io/node=storage
kubectl label nodes <node-name> node-role.kubernetes.io/node=app


kubectl apply -f namespace.yaml
kubectl create -f storage.yaml --namespace=dev

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


