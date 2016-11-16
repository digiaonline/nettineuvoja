# takuuapuri

## Installation

* Add the following line to your hosts file:

```
192.168.172.43 takuuapuri.dev api.takuuapuri.dev admin.takuuapuri.dev www.takuuapuri.dev
```

* Run `vagrant up`
* Run `vagrant ssh`
* Follow the instructions in the following READMEs too:
  * [app/README.md](app/README.md)
  * [admin-ui/README.md](admin-ui/README.md)
  * [consumer-ui/README.md](consumer-ui/README.md)

## Deploying

Run `/vagrant/ops/scripts/deploy.sh`. For more advanced usage, please see 
https://github.com/nordsoftware/ops/blob/master/capistrano/README.md
