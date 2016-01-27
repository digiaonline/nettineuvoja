# Nettineuvoja

# Installation

Do the following to set up your environment:

- Install [Virtualbox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](http://www.vagrantup.com/downloads.html)
- Run `vagrant up && vagrant ssh` to create and connect to the virtual machine
- Add an entry for `192.168.10.10` to `nettineuvoja.dev`, `admin.nettineuvoja.dev` and `api.nettineuvoja.dev` in your hosts file
- Server application responds to `api.nettineuvoja.dev`, consumer application to `nettineuvoja.dev` and admin application to `admin.nettineuvoja.dev` 
- Follow [api/README.md](api/README.md), [consumer-ui/README.md](consumer-ui/README.md) and [admin-ui/README.md](admin-ui/README.md) to complete the installation

# Troubleshooting

- If you get an error related to mismatching vbhost versions install the [vbguest plugin](https://github.com/dotless-de/vagrant-vbguest) by running `vagrant plugin install vagrant-vbguest` and try again
