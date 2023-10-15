# Test script for zkGraph

# Update `config.js` with your own parameters first!
# Then run `sh test.sh`

npm run compile-local &&
npm run exec-local -- 15928051 &&
npm run prove-local -- --inputgen 15928051 00000000 &&
npm run prove-local -- --test 15928051 00000000
