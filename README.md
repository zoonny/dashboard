# dashboard

### branch 전략

브랜치 타입 prefix

|prefix|설명|예시|
|--|--|--|
|feat|새로운 기능 개발|feat/login-page|
|fix버그 수정|fix/auth-token-expire|
|hotfix|운영 긴급 버그 수정|hotfix/payment-null-error|
|chore|빌드, 설정, 패키지 등 기능과 무관한 작업|chore/update-dependencies|
|refactor|기능 변경 없이 코드 구조 개선|refactor/user-service|
|docs|문서 작성/수정|docs/api-readme|
|style|코드 포맷팅, 세미콜론 등 스타일만 변경|style/eslint-fix|
|test|테스트 코드 추가/수정|test/order-service-unit|
|perf|성능 개선|perf/image-lazy-loading|
|ci|CI/CD 파이프라인 설정|ci/github-actions-deploy|
|release|배포 준비 브랜치|release/v1.2.0|


### postgresql 접속

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

### ArgoCD

```shell
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl port-forward svc/argocd-server -n argocd 38080:443

# 초기 비밀번호 확인
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d

# application 등록
# argocd ui --> repository 등록 --> application 등록 --> Sync

argocd repo add https://github.com/zoonny/deploy-repo.git \
  --username zoonny \
  --password <GITHUB_TOKEN>

argocd repo list

kubectl apply -n argocd -f application-dev.yaml
```

### 오류해결 프롬포튼

```text
gitbut action으로 deploy 시에 아래 [오류]가 발생하는데 [deploy-repo 디렉토리 구조]와 [github workflows yaml 파일]을 분석해서 오류를 해결해줘. 차근차근 생각해서 오류를 완벽히 해결해줘.

[오류]
Run sed -i "s|newTag:.*|newTag: ${GITHUB_SHA}|g" dashboard-deploy/overlays/dev/kustomization.yaml
sed: can't read dashboard-deploy/overlays/dev/kustomization.yaml: No such file or directory
Error: Process completed with exit code 2.

[deploy-repo 디렉토리 구조]
deploy-repo/
├── dashboard-deploy/
    ├── argocd
    ├── base
    ├── overlays/dev

[github workflows yaml 파일]
  ...
  update-deploy-repo:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: Checkout deploy repo
        uses: actions/checkout@v4
        with:
          repository: zoonny/deploy-repo
          token: ${{ secrets.DEPLOY_REPO_TOKEN }}
          path: dashboard-deploy

      - name: Update dev image tag
        shell: bash
        run: |
          ls -alt
          sed -i "s|newTag:.*|newTag: ${GITHUB_SHA}|g" dashboard-deploy/overlays/dev/kustomization.yaml
          git config user.name "zoonny"
          git config user.email "hyungii@naver.com"
          git add dashboard-deploy/overlays/dev/kustomization.yaml
          git commit -m "Update dev image to ${GITHUB_SHA}" || echo "No changes to commit"
          git push
```