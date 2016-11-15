VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    config.vm.box = "kkv/takuuapuri-vagrant"
    config.vm.box_url = "https://s3-eu-west-1.amazonaws.com/nordsoftware/vagrant/json/kkv/takuuapuri-vagrant.json"
    config.vm.network "private_network", ip: "192.168.172.43"

    config.ssh.forward_agent = true
  
    config.vm.provision "shell",
      name: "Running local Ansible provisioning",
      inline: "/vagrant/ops/scripts/provision.sh development"
end    
