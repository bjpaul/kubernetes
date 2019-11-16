# kubernetes
## **Setup**
### Prerequisite
- #### **Docker Setup on master and worker node**
##### Ref: https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker

```
# Install Docker CE
## Set up the repository:
### Install packages to allow apt to use a repository over HTTPS
sudo apt-get update && sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y

### Add Docker’s official GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

### Add Docker apt repository.
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"

## Install Docker CE.
sudo apt-get update && sudo apt-get install docker-ce=18.06.2~ce~3-0~ubuntu -y

# Setup daemon.

sudo cat > /etc/docker/daemon.json <<EOF
{ 
   "exec-opts":[ 
      "native.cgroupdriver=systemd"
   ],
   "log-driver":"json-file",
   "log-opts":{ 
      "max-size":"100m"
   },
   "storage-driver":"overlay2",
   "storage-opts":[ 
      "overlay2.override_kernel_check=true"
   ]
}
EOF

sudo mkdir -p /etc/systemd/system/docker.service.d

# Restart docker.
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo gpasswd -a $USER docker
```

- ### **Install Kubeadm, Kubelet and kubectl(Optional for worker node)**
#### Ref: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl

```
sudo apt-get update && sudo apt-get install -y apt-transport-https curl

sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF

sudo apt-get update

#(Optional)check available versions
apt-cache policy kubectl

#sudo apt-get install -y kubelet=<version> kubeadm=<version> kubectl=<version>

#E.g: sudo apt-get install -y kubelet=1.16.0-00 kubeadm=1.16.0-00 kubectl=1.16.0-00

sudo apt-mark hold kubelet kubeadm kubectl

#Check network connectivity(Optional)
~$ sudo kubeadm config images pull

[config/images] Pulled k8s.gcr.io/kube-apiserver:v1.16.3
[config/images] Pulled k8s.gcr.io/kube-controller-manager:v1.16.3
[config/images] Pulled k8s.gcr.io/kube-scheduler:v1.16.3
[config/images] Pulled k8s.gcr.io/kube-proxy:v1.16.3
[config/images] Pulled k8s.gcr.io/pause:3.1
[config/images] Pulled k8s.gcr.io/etcd:3.3.15-0
[config/images] Pulled k8s.gcr.io/coredns:1.6.2

#Verfiy version
~$ kubectl version

Client Version: version.Info{Major:"1", Minor:"16", GitVersion:"v1.16.0", GitCommit:"2bd9643cee5b3b3a5ecbd3af49d09018f0773c77", GitTreeState:"clean", BuildDate:"2019-09-18T14:36:53Z", GoVersion:"go1.12.9", Compiler:"gc", Platform:"linux/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?

```

## **Bootstarp cluster**
```
#On master control plane:
#sudo kubeadm init --pod-network-cidr=<your cidr>
#E.g sudo kubeadm init --pod-network-cidr=192.168.0.0/16

Your Kubernetes control-plane has initialized successfully!

```
## **Bootstarp cluster**
```
~$ kubectl cluster-info

Kubernetes master is running at https://172.31.94.95:6443
KubeDNS is running at https://172.31.94.95:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```
## **Bootstarp cluster output**
```
To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join <master_node_ip>:6443 --token <token> \
    --discovery-token-ca-cert-hash sha256:<secret>

E.g: sudo kubeadm join 172.31.94.95:6443 --token 81fm6a.b0eairo05zgg1zf0 \
    --discovery-token-ca-cert-hash sha256:9a6a7088fffb0aa20a2a53a84586a733a3f50622e84fbdf17e902120a308c446
```

## **Add worker node into the cluster**
```
~$ sudo kubeadm join 172.31.94.95:6443 --token 81fm6a.b0eairo05zgg1zf0 \
    --discovery-token-ca-cert-hash sha256:9a6a7088fffb0aa20a2a53a84586a733a3f50622e84fbdf17e902120a308c446

~$ kubectl get nodes

NAME               STATUS     ROLES    AGE   VERSION
ip-172-31-88-220   NotReady   <none>   11m   v1.16.0
ip-172-31-90-71    NotReady   <none>   17s   v1.16.0
ip-172-31-94-95    NotReady   master   38m   v1.16.0
```

## **To tear down a node from cluster**
```
#on master: 
kubectl drain <node name> --delete-local-data --force --ignore-daemonsets
kubectl delete node <node name>

#on the respective node: 
kubeadm reset
```