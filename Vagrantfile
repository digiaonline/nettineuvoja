# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "kkv/nettineuvoja-vagrant"
  config.vm.box_url = "https://s3-eu-west-1.amazonaws.com/nordsoftware/vagrant/json/kkv/nettineuvoja-vagrant.json"

  config.vm.network "private_network", ip: "192.168.10.10"

  config.vm.synced_folder "./admin-ui", "/app/admin-ui"
  config.vm.synced_folder "./consumer-ui", "/app/consumer-ui"
  config.vm.synced_folder "./api", "/app/api"
  config.vm.synced_folder "./ops", "/ops"
  
  config.ssh.forward_agent = true
  
  config.vm.provision "shell",
    name: "Running local Ansible provisioning",
    inline: "/vagrant/ops/scripts/provision.sh development"
  
end
