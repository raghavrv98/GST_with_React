#!/bin/bash
echo "=================== updation started ================"
cd gst
cd Gst-Service
git pull
cd public
ls
rm -r *.*
cd ..
cd ..
cd GST_with_React
git pull
cp -r build/* ../Gst-Service/public
echo "=================== move into tmux session ================"
tmux attach-session -t 0