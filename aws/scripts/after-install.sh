#!/bin/bash
set -xe

# Copy file from S3 bucket to required destination folder
aws s3 cp s3://hodei-nodedemodeploy/*.js /usr/local/tomcat9/webapps/SpringBootHelloWorldExampleApplication.war

