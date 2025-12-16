import { test, expect } from '@playwright/test'

test.describe('Basic E2E Tests', () => {
  test('should load homepage with registration form', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible()
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
  })

  test('should navigate to cadastro-usuario page', async ({ page }) => {
    await page.goto('/cadastro-usuario')
    await expect(page).toHaveURL('/cadastro-usuario')
    await expect(page.getByRole('heading', { name: 'Cadastrar Usuário' })).toBeVisible()
  })

  test('should navigate to cadastro-maquinas page', async ({ page }) => {
    await page.goto('/cadastro-maquinas')
    await expect(page).toHaveURL('/cadastro-maquinas')
    await expect(page.getByRole('heading', { name: 'Cadastrar Máquina de Pagamento' })).toBeVisible()
  })

  test('should show homepage registration form fields', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#cpf')).toBeVisible()
    await expect(page.locator('#cellphoneNumber')).toBeVisible()
    await expect(page.locator('#birthday')).toBeVisible()
    await expect(page.locator('#password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()
  })

  test('should have disabled register button when form is empty', async ({ page }) => {
    await page.goto('/')
    const submitButton = page.getByRole('button', { name: 'Register' })
    await expect(submitButton).toBeDisabled()
  })
})
