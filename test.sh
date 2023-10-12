# Test script for zkGraph

# Update `config.js` with your own parameters first!
# Then run `sh test.sh`

npm run compile-local &&
npm run exec-local -- 2279547 &&
npm run prove-local -- --inputgen 18327423 00000000 &&
npm run prove-local -- --test 18327423 00000000
