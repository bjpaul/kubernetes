```
$ curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
$ chmod 700 get_helm.sh
$ ./get_helm.sh

$ kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:tiller

$ helm init --service-account tiller  --wait
$ #helm init --upgrade --service-account tiller --wait
helm create mychart

.
mychart
    ├── Chart.yaml
    ├── templates
    │   ├── NOTES.txt
    │   ├── _helpers.tpl
    │   ├── deployment.yaml
    │   ├── ingress.yaml
    │   ├── service.yaml
    │   ├── serviceaccount.yaml
    │   └── tests
    │       └── test-connection.yaml
    └── values.yaml

$ helm lint ./mychart

$ helm install example ./mychart --set service.type=NodePort

$ helm package ./mychart
Successfully packaged chart and saved it to: /home/ubuntu/mychart-0.1.0.tgz

$ mkdir my-chart

$ mv /home/ubuntu/mychart-0.1.0.tgz my-chart/

$ helm repo index my-chart/ --url https://bjpaul.github.io/chart/

$ helm repo add git-chart-repo https://bjpaul.github.io/chart/

$ helm search repo git-chart-repo
NAME                  	CHART VERSION	APP VERSION	DESCRIPTION
git-chart-repo/mychart	0.1.0        	1.0.0      	A Helm chart for Kubernetes

$ helm install my-app-name git-chart-repo/mychart
NAME: my-app-name
LAST DEPLOYED: Fri Nov 22 18:10:10 2019
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mychart,app.kubernetes.io/instance=my-app-name" -o jsonpath="{.items[0].metadata.name}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:80

