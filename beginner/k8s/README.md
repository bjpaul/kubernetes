kubectl label nodes <node-name> node-type=storage
kubectl label nodes <node-name> node-type=app

kubectl apply -f namespace.yml
kubectl create -f storage.yml --namespace=dev

