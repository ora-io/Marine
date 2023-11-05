# Test script for Marine

# Update `config.js` with your own parameters first!
# Then run `sh test.sh`

npm run marine -- 0x39a5d1a636bade0ce8db69fa5aebfbe203c3ead2 &&
npm run prices && 
npm run compile-local && npm run exec-local -- 18370576
