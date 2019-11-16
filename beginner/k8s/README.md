kubectl label nodes <node-name> node-role.kubernetes.io/node=storage
kubectl label nodes <node-name> node-role.kubernetes.io/node=app


kubectl apply -f namespace.yaml
kubectl create -f storage.yml --namespace=dev
## equicalent to kubectl expose deployment/db-deployment

kubectl apply -f deployment/ --namespace=dev

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

Test same after adding new node in the same cluster with label node-type=app
After testing drain the node by runing following command
on Master:- 
kubectl drain ip-172-31-0-171 --delete-local-data --force --ignore-daemonsets
kubectl delete node ip-172-31-0-171

on the specific node:-
sudo kubeadm reset

and check cluster status:-
kubectl get nodes

Now Deploy reader 
kubectl apply -f writer.yml --namespace=dev
and test same as writer