// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E Tests - Simulate real user flow
 * Tests the complete user journey through the application
 */

test.describe('Task Manager E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('DevOps Task Manager');
  });

  test('header is visible', async ({ page }) => {
    const header = page.locator('.header-title');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Task Manager');
  });

  test('can add a new task', async ({ page }) => {
    // Fill in the task input
    await page.fill('#task-input', 'E2E Test Task');

    // Click the add button
    await page.click('#add-task-btn');

    // Verify the task appears in the list
    await expect(page.locator('.task-item')).toContainText('E2E Test Task');

    // Verify input is cleared
    await expect(page.locator('#task-input')).toHaveValue('');
  });

  test('can toggle task completion', async ({ page }) => {
    // Add a task
    await page.fill('#task-input', 'Toggle E2E Task');
    await page.click('#add-task-btn');

    // Toggle the checkbox
    const checkbox = page.locator('.task-checkbox').first();
    await checkbox.click();

    // Verify the task item has completed class
    const taskItem = page.locator('.task-item').first();
    await expect(taskItem).toHaveClass(/completed/);
  });

  test('can delete a task', async ({ page }) => {
    // Add a task
    await page.fill('#task-input', 'Delete E2E Task');
    await page.click('#add-task-btn');

    // Verify task exists
    await expect(page.locator('.task-item')).toContainText('Delete E2E Task');

    // Click delete button
    await page.click('.delete-btn');

    // Verify task is removed (either empty state or no matching task)
    await expect(page.locator('.task-item')).toHaveCount(0);
  });

  test('filter buttons work', async ({ page }) => {
    // Add two tasks
    await page.fill('#task-input', 'Active Task');
    await page.click('#add-task-btn');
    await page.fill('#task-input', 'Complete Task');
    await page.click('#add-task-btn');

    // Complete the second task
    const secondCheckbox = page.locator('.task-checkbox').first();
    await secondCheckbox.click();

    // Click Active filter
    await page.click('.filter-btn:has-text("Active")');
    const visibleTasks = page.locator('.task-item');
    await expect(visibleTasks).toHaveCount(1);

    // Click All filter
    await page.click('.filter-btn:has-text("All")');
    await expect(page.locator('.task-item')).toHaveCount(2);
  });

  test('full user flow: add, complete, filter, delete', async ({ page }) => {
    // Step 1: Add tasks
    await page.fill('#task-input', 'Buy groceries');
    await page.click('#add-task-btn');
    await page.fill('#task-input', 'Write report');
    await page.click('#add-task-btn');
    await page.fill('#task-input', 'Review PR');
    await page.click('#add-task-btn');

    // Step 2: Verify all tasks added
    await expect(page.locator('.task-item')).toHaveCount(3);

    // Step 3: Complete one task
    const firstCheckbox = page.locator('.task-checkbox').first();
    await firstCheckbox.click();

    // Step 4: Filter to see only completed
    await page.click('.filter-btn:has-text("Completed")');
    await expect(page.locator('.task-item')).toHaveCount(1);

    // Step 5: Back to all
    await page.click('.filter-btn:has-text("All")');
    await expect(page.locator('.task-item')).toHaveCount(3);

    // Step 6: Delete a task
    const deleteButtons = page.locator('.delete-btn');
    await deleteButtons.first().click();
    await expect(page.locator('.task-item')).toHaveCount(2);
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('.footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Rhythm Jain');
  });
});
