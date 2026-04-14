/**
 * Seed script for production Strapi instance.
 * Run after deploy: node seed-production.js <STRAPI_URL> <ADMIN_EMAIL> <ADMIN_PASSWORD>
 * 
 * This script:
 * 1. Creates/updates System Settings data (sidebar items + background options)
 * 2. Publishes it
 * 3. Enables public read access for system-settings
 */
const https = require('https');
const http = require('http');

const STRAPI_URL = process.argv[2] || 'https://scalemail-cms.onrender.com';
const EMAIL = process.argv[3] || 'contact@devicefield.com';
const PASSWORD = process.argv[4] || 'Admin1234!';

const isHttps = STRAPI_URL.startsWith('https');
const proto = isHttps ? https : http;
const parsed = new URL(STRAPI_URL);

function api(method, path, token, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: parsed.hostname,
      port: parsed.port || (isHttps ? 443 : 80),
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = proto.request(opts, (res) => {
      let b = '';
      res.on('data', (c) => (b += c));
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch { resolve(b); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log(`Seeding ${STRAPI_URL}...`);
  
  // 1. Login
  const loginRes = await api('POST', '/admin/login', null, { email: EMAIL, password: PASSWORD });
  if (!loginRes?.data?.token) {
    console.error('Login failed:', JSON.stringify(loginRes));
    process.exit(1);
  }
  const token = loginRes.data.token;
  console.log('✓ Logged in');

  // 2. Create/update System Settings
  const settingsData = {
    profileName: 'Adam Judkiewicz',
    profileSubtitle: 'AAADM Account',
    about: '**AAADM** is a fashion and armor design brand creating custom scale armor garments and accessories.',
    sidebarItems: [
      { label: 'Appearance', reactIcon: 'FaPaintBrush', slug: 'appearance' },
      { label: 'Desktop & Dock', reactIcon: 'FaDesktop', slug: 'desktop-dock' },
      { label: 'General', reactIcon: 'FaCog', slug: 'general' },
      { label: 'Accessibility', reactIcon: 'FaUniversalAccess', slug: 'accessibility' },
      { label: 'Displays', reactIcon: 'FaTv', slug: 'displays' },
    ],
    backgroundOptions: [
      { label: 'Dark Blue', themeKey: 'dark-blue', tipColor: '#355566', baseColor: '#102630', strokeColor: '#2a0e0e', previewColor: '#1e3a4a' },
      { label: 'Light Red', themeKey: 'light-red', tipColor: '#c45555', baseColor: '#5a1a1a', strokeColor: '#3a0e0e', previewColor: '#8e3232' },
      { label: 'White', themeKey: 'white', tipColor: '#e8e8e8', baseColor: '#b0b0b0', strokeColor: '#999999', previewColor: '#d0d0d0' },
      { label: 'Black', themeKey: 'black', tipColor: '#2a2a2a', baseColor: '#0a0a0a', strokeColor: '#050505', previewColor: '#151515' },
    ],
  };

  const settingsRes = await api('PUT', '/content-manager/single-types/api::system-settings.system-settings', token, settingsData);
  if (settingsRes?.data?.documentId) {
    console.log('✓ System Settings created/updated');
    // Publish
    const pub = await api('POST', '/content-manager/single-types/api::system-settings.system-settings/actions/publish', token, {});
    console.log('✓ System Settings published:', pub?.data?.publishedAt ? 'yes' : 'check manually');
  } else {
    console.log('⚠ System Settings result:', JSON.stringify(settingsRes).substring(0, 200));
  }

  // 3. Add System Settings dock item (if not already there)
  const dockRes = await api('GET', '/content-manager/single-types/api::dock.dock', token);
  const dockItems = dockRes?.data?.dockItem || [];
  const hasSettings = dockItems.some((i) => i.modalSlug === 'systemSettingsModal');
  if (!hasSettings) {
    dockItems.push({ title: 'System Settings', reactIcon: 'FaCog', reactIconColor: '#9CA3AF', modalSlug: 'systemSettingsModal' });
    await api('PUT', '/content-manager/single-types/api::dock.dock', token, { dockItem: dockItems });
    await api('POST', '/content-manager/single-types/api::dock.dock/actions/publish', token, {});
    console.log('✓ System Settings added to dock');
  } else {
    console.log('✓ Dock already has System Settings');
  }

  // 4. Enable public read permissions for system-settings
  const roleRes = await api('GET', '/users-permissions/roles/4', token);
  const perms = roleRes?.role?.permissions || {};
  if (perms['api::system-settings']?.controllers?.['system-settings']?.find) {
    perms['api::system-settings'].controllers['system-settings'].find.enabled = true;
    await api('PUT', '/users-permissions/roles/4', token, { permissions: perms });
    console.log('✓ Public read permissions enabled for system-settings');
  } else {
    console.log('⚠ Could not find system-settings permissions (the public role ID might differ)');
  }

  console.log('\nDone! You may need to upload the darkLogo manually in the Strapi admin.');
}

main().catch(console.error);
