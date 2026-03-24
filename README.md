# dashboard

```shell
# psql postgresql://appuser:New1234@10.0.0.4:30418/appdb
psql postgresql://postgres:New1234@10.0.0.4:30418/postgres
```

### Self-hosted Github Actions Runner

GitHub 레포에서 Self-hosted Runner 등록 토큰 발급
레포 → Settings → Actions → Runners → New self-hosted runner
OS/Arch 선택 후 설치 명령 복사

```shell
# Create a folder
mkdir actions-runner && cd actions-runner
# Download the latest runner package
curl -o actions-runner-linux-x64-2.333.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.333.0/actions-runner-linux-x64-2.333.0.tar.gz
# Optional: Validate the hash
echo "7ce6b3fd8f879797fcc252c2918a23e14a233413dc6e6ab8e0ba8768b5d54475  actions-runner-linux-x64-2.333.0.tar.gz" | shasum -a 256 -c
# Extract the installer
tar xzf ./actions-runner-linux-x64-2.333.0.tar.gz

# Create the runner and start the configuration experience
./config.sh --url https://github.com/zoonny/dashboard --token AK********************FYM
# Last step, run it!
$ ./run.sh

# add systemd service
sudo ./svc.sh install
sudo ./svc.sh start
# systemctl status actions.runner.zoonny-dashboard.code-server.service

# Use this YAML in your workflow file for each job
runs-on: self-hosted
```

### CI/CI Error


```shell
kubectl describe pod transition-dashboard-b54dcdf9-v64ts

# Events:
#   Type     Reason         Age                    From               Message
#   ----     ------         ----                   ----               -------
#   Normal   Scheduled      3m46s                  default-scheduler  Successfully assigned default/transition-dashboard-b54dcdf9-v64ts to k8s-worker-01
#   Warning  Failed         103s (x12 over 3m46s)  kubelet            Error: InvalidImageName
#   Warning  InspectFailed  88s (x13 over 3m46s)   kubelet            Failed to apply default image tag "ghcr.io/${{ github.repository }}:latest": couldn't parse image name "ghcr.io/${{ github.repository }}:latest": invalid reference format
```
