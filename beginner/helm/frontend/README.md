```

~$ helm dep update frontend
~$ helm package frontend
~$ git clone git@github.com:bjpaul/chart.git
~$ mv frontend-*.tgz chart/
~$ helm repo index chart/ --url https://bjpaul.github.io/chart/
~$ git commit
~$ helm repo add git-chart-repo https://bjpaul.github.io/chart/
"git-chart-repo" has been added to your repositories

~$ helm repo list
NAME          	URL
stable        	https://kubernetes-charts.storage.googleapis.com
local         	http://127.0.0.1:8879/charts
git-chart-repo	https://bjpaul.github.io/chart/

~$ helm search frontend
WARNING: Repo "local" is corrupt or missing. Try 'helm repo update'.
NAME                   	CHART VERSION	APP VERSION	DESCRIPTION
git-chart-repo/frontend	0.1.0        	advance    	The Helm chart for frontend deployment and service
stable/phpmyadmin      	4.2.3        	4.9.1      	phpMyAdmin is an mysql administration frontend

~$ helm repo update
Hang tight while we grab the latest from your chart repositories...
...Skip local chart repository
...Successfully got an update from the "git-chart-repo" chart repository
...Successfully got an update from the "stable" chart repository
Update Complete.



```