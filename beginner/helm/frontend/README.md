```

~$ helm package frontend
~$ git clone git@github.com:bjpaul/chart.git
~$ helm install --name frontend-vanilla frontend
~$ git commit
~$ helm repo index chart/ --url https://bjpaul.github.io/chart/
```