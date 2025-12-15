import { test, expect } from '@playwright/test';

test.describe('Cadastro de Usuário', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cadastro-usuario');
  });

  test('deve exibir formulário de cadastro', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Cadastrar Usuário' })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();
  });

  test('deve ter botão desabilitado inicialmente', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Cadastrar' });
    await expect(submitButton).toBeDisabled();
  });

  test('deve habilitar botão quando campos preenchidos', async ({ page }) => {
    await page.locator('#email').fill('teste@exemplo.com');
    await page.locator('#password').fill('senha123');
    await page.locator('#confirmPassword').fill('senha123');

    const submitButton = page.getByRole('button', { name: 'Cadastrar' });
    await expect(submitButton).toBeEnabled();
  });

  test('deve mostrar erro quando senhas não coincidem', async ({ page }) => {
    await page.locator('#email').fill('teste@exemplo.com');
    await page.locator('#password').fill('senha123');
    await page.locator('#confirmPassword').fill('outrasenha');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.getByText('As senhas não coincidem')).toBeVisible();
  });

  test('deve alternar visibilidade da senha', async ({ page }) => {
    const passwordInput = page.locator('#password');
    await passwordInput.fill('senha123');

    await expect(passwordInput).toHaveAttribute('type', 'password');

    await page.locator('button[aria-label="Mostrar senha"]').first().click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('deve limpar formulário ao clicar apagar', async ({ page }) => {
    await page.locator('#email').fill('teste@exemplo.com');
    await page.locator('#password').fill('senha123');

    await page.getByRole('button', { name: 'Apagar' }).click();

    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#password')).toHaveValue('');
  });

  test('deve submeter formulário com sucesso', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('teste@exemplo.com');
      await dialog.accept();
    });

    await page.locator('#email').fill('teste@exemplo.com');
    await page.locator('#password').fill('senha123');
    await page.locator('#confirmPassword').fill('senha123');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page.getByRole('button', { name: 'Cadastrando...' })).toBeVisible();
  });
});
