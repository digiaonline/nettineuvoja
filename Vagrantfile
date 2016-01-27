# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

ENV['VAGRANT_DEFAULT_PROVIDER'] = 'virtualbox'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "nordsoftware/nginx-php-mariadb-nodejs"

  config.vm.network "private_network", ip: "192.168.10.10"

  config.vm.synced_folder "./admin-ui", "/app/admin-ui"
  config.vm.synced_folder "./consumer-ui", "/app/consumer-ui"
  config.vm.synced_folder "./api", "/app/api"
  config.vm.synced_folder "./ops/nginx-sites", "/etc/nginx/sites-enabled"
  config.vm.synced_folder "./storage", "/app/storage", {
    :mount_options => ['dmode=777','fmode=777'],
    :owner => "www-data", :group => "www-data"
  }

  config.vm.provision "shell", inline: "sudo service nginx restart", run: "always"

  config.vm.provider "virtualbox" do |vb|
      vb.name = "nettineuvoja"
  end
end
