```

~$ helm package ingress
~$ git clone git@github.com:bjpaul/chart.git
~$ mv ingress-*.tgz chart/
~$ git commit
~$ helm repo index chart/ --url https://bjpaul.github.io/chart/
```