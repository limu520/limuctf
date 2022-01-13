#!/bin/bash

docker run -p 6379:6379 --name limuctf-redis -d redis redis-server --appendonly yes
