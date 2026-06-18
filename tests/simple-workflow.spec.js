const { test, expect } = require('@playwright/test');

// -- Page imports
const LoginPage = require('../pages/LoginPage');
const CreateProjectPage = require('../pages/createprojectPage');

// -- Data imports
const { projectData } = require('../testdata/projectData');
const { getBaseUrl } = require('../env/baseenv');

// 5 minute timeout for end-to-end flows
test.setTimeout(300000);

/**
 * ============================================================
 * SIMPLE WORKFLOW TEST
 * ============================================================
 * Navigate -> Login -> Scan DOM -> Create Project & Save
 */
test.describe('Simple Workflow: Login & Create Project', () => {
  
  test('E2E: Navigate, Login with Elijah Paul, Scan DOM, Create Project', async ({ page }) => {
    console.log('\n========================================');
    console.log('📍 Step 1: Navigate to URL');
    console.log('========================================');
    await page.goto(getBaseUrl());
    await page.waitForLoadState('networkidle');

    // SCAN DOM - Check page structure
    console.log('\n📍 Step 2: Scan DOM at login page');
    const loginPageDOM = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      return {
        totalElements: elements.length,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim()).filter(h => h),
        buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(b => b),
        links: Array.from(document.querySelectorAll('a')).map(a => a.textContent?.trim()).filter(a => a),
        inputs: Array.from(document.querySelectorAll('input, select')).map(i => ({
          type: i.type,
          placeholder: i.placeholder,
          name: i.name
        })).filter(i => i.name || i.placeholder),
      };
    });
    console.log('✅ Login Page DOM Snapshot:');
    console.log(JSON.stringify(loginPageDOM, null, 2));

    // SIGN IN - Click Sign in button
    console.log('\n📍 Step 3: Click "Sign in with Microsoft" button');
    const signInBtn = page.getByRole('button', { name: 'Sign in with Microsoft' });
    await expect(signInBtn).toBeVisible();
    
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      signInBtn.click()
    ]);

    console.log('\n📍 Step 4: Select "Elijah Paul" in SSO popup');
    await popup.waitForLoadState('domcontentloaded');
    const elijahNameElement = await popup.getByText('Elijah Paul').first();
    await elijahNameElement.click();
    console.log('✅ Elijah Paul selected');

    // Wait for redirect back to main page
    console.log('\n⏳ Waiting for login to complete...');
    await page.waitForURL(/dashboard|projects/, { timeout: 60000 });
    console.log('✅ Logged in successfully, navigated to dashboard');

    // SCAN DOM - After successful login
    console.log('\n📍 Step 5: Scan DOM after login');
    await page.waitForLoadState('networkidle');
    const dashboardDOM = await page.evaluate(() => {
      return {
        totalElements: document.querySelectorAll('*').length,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim()).filter(h => h),
        buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(b => b),
        links: Array.from(document.querySelectorAll('a')).map(a => a.textContent?.trim()).filter(a => a),
      };
    });
    console.log('✅ Dashboard DOM Snapshot:');
    console.log(JSON.stringify(dashboardDOM, null, 2));

    // FIND & CLICK CREATE BUTTON
    console.log('\n📍 Step 6: Click "Create Project" button');
    const createBtn = page.getByRole('button', { name: 'Create Project' });
    await expect(createBtn).toBeVisible({ timeout: 10000 });
    await createBtn.click({ force: true });
    console.log('✅ Create Project button clicked');

    // SCAN DOM - After opening create form
    console.log('\n📍 Step 7: Scan DOM of the Create Project form');
    await page.waitForTimeout(1000);
    const formDOM = await page.evaluate(() => {
      return {
        formFields: Array.from(document.querySelectorAll('input, select, textarea, [role="combobox"]')).map(field => ({
          type: field.tagName,
          inputType: field.type,
          name: field.name || field.getAttribute('aria-label') || field.placeholder || 'unnamed',
          role: field.getAttribute('role'),
          visible: field.offsetHeight > 0
        })),
        submitButtons: Array.from(document.querySelectorAll('button')).map(b => ({
          text: b.textContent?.trim(),
          disabled: b.disabled
        })),
      };
    });
    console.log('✅ Form DOM Snapshot:');
    console.log(JSON.stringify(formDOM, null, 2));

    // FILL FORM FIELDS
    console.log('\n📍 Step 8: Fill in project form fields');
    console.log('📊 Using project data:', projectData);
    const createProject = new CreateProjectPage(page);
    
    // Fill in the project data
    await createProject.createProject(projectData);
    console.log('✅ Form fields filled with project data');

    // VERIFY NAVIGATION TO PROJECT PAGE
    console.log('\n📍 Step 9: Verify project was created and saved');
    await expect(page).toHaveURL(/\/projects\//, { timeout: 15000 });
    console.log('✅ Project created successfully - navigated to project details page');

    // FINAL DOM SCAN
    console.log('\n📍 Step 10: Scan final DOM after project creation');
    const finalDOM = await page.evaluate(() => {
      return {
        currentURL: window.location.href,
        pageTitle: document.title,
        mainHeadings: Array.from(document.querySelectorAll('h1, h2')).map(h => h.textContent?.trim()).filter(h => h),
        visibleButtons: Array.from(document.querySelectorAll('button')).filter(b => b.offsetHeight > 0).map(b => b.textContent?.trim()),
      };
    });
    console.log('✅ Final DOM Snapshot:');
    console.log(JSON.stringify(finalDOM, null, 2));
    
    console.log('\n========================================');
    console.log('✅ ✅ ✅ WORKFLOW COMPLETE! ✅ ✅ ✅');
    console.log('========================================\n');
  });
});
