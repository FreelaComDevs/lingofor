> Just build the React app, create a new Docker image and push it to the ECS repository

## configure awscli

```
pip install awscli
mkdir ~/.aws
cat > ~/.aws/config <<EOF
[profile blendmobi]
region = us-east-1
aws_access_key_id = XXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
EOF
```

## building react app

```
lingo_dir=$HOME/lingo_react/lingoforme
cd $lingo_dir
yarn build
cd docker
mv ../build .  # move the build dir to inside docker dir
```

## creating image

```
# enter in lingo_react/lingoforme/docker, build a new image and push it to ECS

lingo_dir=$HOME/lingo_react/lingoforme
cd $lingo_dir/docker
docker build -t lingo-react-dev .
$(aws --profile blendmobi ecr get-login --no-include-email --region us-east-1)  # docker login
docker tag lingo-react-dev:latest 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-react-dev:latest
docker push 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-react-dev:latest
```

