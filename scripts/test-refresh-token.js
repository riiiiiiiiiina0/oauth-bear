#!/usr/bin/env node

/**
 * Script to test OAuth refresh token endpoint
 *
 * Usage:
 *   node scripts/test-refresh-token.js <provider> <refresh_token> [base_url]
 *
 * Example:
 *   node scripts/test-refresh-token.js raindrop your_refresh_token_here
 *   node scripts/test-refresh-token.js raindrop your_refresh_token_here http://localhost:3000
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Error: Missing required arguments\n');
  console.log('Usage:');
  console.log(
    '  node scripts/test-refresh-token.js <provider> <refresh_token> [base_url]\n',
  );
  console.log('Example:');
  console.log(
    '  node scripts/test-refresh-token.js raindrop your_refresh_token_here',
  );
  console.log(
    '  node scripts/test-refresh-token.js raindrop your_refresh_token_here http://localhost:3000',
  );
  process.exit(1);
}

const [provider, refreshToken, baseUrl = 'http://localhost:3000'] = args;

const url = `${baseUrl}/oauth/${provider}/callback`;

console.log('🔄 Testing refresh token endpoint...');
console.log('📍 URL:', url);
console.log('🔑 Provider:', provider);
console.log('🎫 Refresh Token:', refreshToken.substring(0, 20) + '...\n');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    refresh_token: refreshToken,
  }),
})
  .then(async (response) => {
    const data = await response.json();

    console.log('📊 Response Status:', response.status, response.statusText);
    console.log('📦 Response Body:');
    console.log(JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Success! New tokens received.');
    } else {
      console.log('\n❌ Failed to refresh token.');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n❌ Error making request:');
    console.error(error.message);
    process.exit(1);
  });
