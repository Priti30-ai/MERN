// Automated Test Suite for Task 36 Express Backend
// Usage: node test-auth.js (run while backend server is running)

const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000';
const JWT_SECRET = process.env.JWT_SECRET || 'priti_task36_secure_jwt_dev_key_2026_dyp_dpu';

async function runTests() {
  console.log(`\n========================================`);
  console.log(` Starting Task 36 Backend Verification`);
  console.log(` Target: ${BASE_URL}`);
  console.log(`========================================\n`);

  let passed = 0;
  let failed = 0;
  let authToken = null;
  const testUser = {
    username: `student_${Date.now()}`,
    password: 'SecurePassword123!'
  };

  async function assertCase(name, fn) {
    try {
      const result = await fn();
      if (result.success) {
        console.log(` [PASS] ${name}`);
        if (result.details) console.log(`        Result: ${result.details}`);
        passed++;
      } else {
        console.log(` [FAIL] ${name}`);
        console.log(`        Expected: ${result.expected}`);
        console.log(`        Actual:   ${result.actual}`);
        failed++;
      }
    } catch (err) {
      console.log(` [ERROR] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Health check
  await assertCase('1. Health check (GET /)', async () => {
    const res = await fetch(`${BASE_URL}/`);
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 200,
      expected: 'HTTP 200',
      actual: `HTTP ${res.status} (${JSON.stringify(data)})`,
      details: JSON.stringify(data)
    };
  });

  // 2. Register with missing fields
  await assertCase('2. Register missing fields (POST /register)', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 400,
      expected: 'HTTP 400 Bad Request',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 3. Register with whitespace-only fields
  await assertCase('3. Register whitespace fields (POST /register)', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: '   ', password: '   ' })
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 400,
      expected: 'HTTP 400 Bad Request',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 4. Register valid new user
  await assertCase('4. Register new user (POST /register)', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const data = await res.json().catch(() => ({}));
    const noPasswordLeaked = !data.password && !data.hashedPassword;
    return {
      success: res.status === 201 && noPasswordLeaked,
      expected: 'HTTP 201 Created without password leak',
      actual: `HTTP ${res.status} (Password leaked: ${!noPasswordLeaked})`,
      details: data.message
    };
  });

  // 5. Register duplicate user (case-insensitive check)
  await assertCase('5. Reject duplicate user (POST /register)', async () => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: testUser.username.toUpperCase(), password: testUser.password })
    });
    const data = await res.json().catch(() => ({}));
    const isRejected = res.status === 400 || res.status === 409;
    return {
      success: isRejected,
      expected: 'HTTP 400 or 409',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 6. Login with missing fields
  await assertCase('6. Login missing fields (POST /login)', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 400,
      expected: 'HTTP 400 Bad Request',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 7. Login with non-existent username
  await assertCase('7. Login non-existent user (POST /login)', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'nonexistent_user_9999', password: 'SomePassword' })
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 401,
      expected: 'HTTP 401 Unauthorized',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 8. Login with wrong password
  await assertCase('8. Login incorrect password (POST /login)', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: testUser.username, password: 'WrongPassword999' })
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 401,
      expected: 'HTTP 401 Unauthorized',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 9. Login with valid credentials
  await assertCase('9. Login valid credentials & return JWT (POST /login)', async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 200 && data.token) {
      authToken = data.token;
    }
    return {
      success: res.status === 200 && !!data.token,
      expected: 'HTTP 200 with JWT token string',
      actual: `HTTP ${res.status} (token present: ${!!data.token})`,
      details: `Token acquired (length: ${data.token ? data.token.length : 0})`
    };
  });

  // 10. Protected route without token
  await assertCase('10. Protected route without token (GET /protected)', async () => {
    const res = await fetch(`${BASE_URL}/protected`);
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 401,
      expected: 'HTTP 401 Unauthorized',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 11. Protected route with invalid/malformed token
  await assertCase('11. Protected route with invalid token (GET /protected)', async () => {
    const res = await fetch(`${BASE_URL}/protected`, {
      headers: { 'Authorization': 'Bearer fake.invalid.jwt.token' }
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 403,
      expected: 'HTTP 403 Forbidden',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 12. Protected route with expired token
  await assertCase('12. Protected route with expired token (GET /protected)', async () => {
    // Generate an intentionally expired token (expired 10 seconds ago)
    const expiredToken = jwt.sign(
      { id: 'expired_user', username: 'expired' },
      JWT_SECRET,
      { expiresIn: '-10s' }
    );
    const res = await fetch(`${BASE_URL}/protected`, {
      headers: { 'Authorization': `Bearer ${expiredToken}` }
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 403,
      expected: 'HTTP 403 Forbidden',
      actual: `HTTP ${res.status}`,
      details: data.message
    };
  });

  // 13. Protected route with valid token
  await assertCase('13. Protected route with valid token (GET /protected)', async () => {
    if (!authToken) {
      return { success: false, expected: 'Valid token from step 9', actual: 'No token available' };
    }
    const res = await fetch(`${BASE_URL}/protected`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json().catch(() => ({}));
    return {
      success: res.status === 200 && data.user && data.user.username.toLowerCase() === testUser.username.toLowerCase(),
      expected: 'HTTP 200 with decoded user payload',
      actual: `HTTP ${res.status} (User: ${data.user ? data.user.username : 'undefined'})`,
      details: data.message
    };
  });

  console.log(`\n----------------------------------------`);
  console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`----------------------------------------\n`);

  process.exit(failed === 0 ? 0 : 1);
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
