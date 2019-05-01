# Deployment

* Ubuntu 18

Prepare user:

  - ssh to-machine
  - `adduser ubuntu`
  - `adduser ubuntu sudo`
  - `usermod -aG sudo ubuntu`
  - `sudo visudo` (edit in nano mode): %sudo   ALL=(ALL:ALL) NOPASSWD: ALL
  - paste the public key into `/home/ubuntu/authorized_keys`

Ansible usage:
```
 ansible-playbook api.yml -i hosts
 ansible-playbook web.yml -i hosts
```
