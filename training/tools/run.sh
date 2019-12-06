set -x && while true
do
  node generate-runner.js
  . tmp.sh
done