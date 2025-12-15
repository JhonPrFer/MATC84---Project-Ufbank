import { test, expect } from '@playwright/test';

test.describe('Cadastro de Máquinas de Pagamento', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro-maquinas');
  });

  test('deve exibir formulário de cadastro', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cadastrar Máquina de Pagamento' })).toBeVisible();
    await expect(page.locator('#serialNumber')).toBeVisible();
    await expect(page.locator('#model')).toBeVisible();
    await expect(page.locator('#manufacturer')).toBeVisible();
    await expect(page.locator('#status')).toBeVisible();
    await expect(page.locator('#transactionFeePercentage')).toBeVisible();
  });

  test('deve ter botão desabilitado inicialmente', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Cadastrar Máquina' });
    await expect(submitButton).toBeDisabled();
  });

  test('deve habilitar botão quando campos obrigatórios preenchidos', async ({ page }) => {
    await page.locator('#serialNumber').fill('SN-2024-001234');
    await page.locator('#model').fill('Ingenico Move 5000');
    await page.locator('#manufacturer').fill('Ingenico');
    await page.locator('#transactionFeePercentage').fill('2.5');

    const submitButton = page.getByRole('button', { name: 'Cadastrar Máquina' });
    await expect(submitButton).toBeEnabled();
  });

  test('deve submeter formulário com sucesso', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('SN-2024-001234');
      await dialog.accept();
    });

    await page.locator('#serialNumber').fill('SN-2024-001234');
    await page.locator('#model').fill('Ingenico Move 5000');
    await page.locator('#manufacturer').fill('Ingenico');
    await page.locator('#transactionFeePercentage').fill('2.5');

    await page.getByRole('button', { name: 'Cadastrar Máquina' }).click();

    await expect(page.getByRole('button', { name: 'Cadastrando...' })).toBeVisible();
  });
});
