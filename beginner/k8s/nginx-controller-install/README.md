https://github.com/nginxinc/kubernetes-ingress/blob/master/docs/installation.md
https://github.com/nginxinc/kubernetes-ingress/


```
kubectl apply -f common/
kubectl apply -f rbac/
kubectl apply -f deployment/
kubectl apply -f daemon-set/
kubectl apply -f service/
kubectl get pods,deploy,daemonset,svc --namespace=nginx-ingress -o wide

NAME                                 READY   STATUS    RESTARTS   AGE     IP                NODE               NOMINATED NODE   READINESS GATES
pod/nginx-ingress-7f4b784f79-b74pn   1/1     Running   0          8m49s   192.168.147.221   ip-172-31-88-220   <none>           <none>
pod/nginx-ingress-nvjbd              1/1     Running   0          8m36s   192.168.147.222   ip-172-31-88-220   <none>           <none>
pod/nginx-ingress-xsspd              1/1     Running   0          8m36s   192.168.215.10    ip-172-31-90-71    <none>           <none>

NAME                            READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS      IMAGES                     SELECTOR
deployment.apps/nginx-ingress   1/1     1            1           8m49s   nginx-ingress   nginx/nginx-ingress:edge   app=nginx-ingress

NAME                           DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE     CONTAINERS      IMAGES                     SELECTOR
daemonset.apps/nginx-ingress   2         2         2       2            2           <none>          8m36s   nginx-ingress   nginx/nginx-ingress:edge   app=nginx-ingress

NAME                    TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE     SELECTOR
service/nginx-ingress   NodePort   10.98.189.127   <none>        80:32058/TCP,443:30744/TCP   5m53s   app=nginx-ingress

#kubectl get clusterrole,clusterrolebinding,pods,deploy,daemonset,svc --namespace=nginx-ingress -o wide
```
