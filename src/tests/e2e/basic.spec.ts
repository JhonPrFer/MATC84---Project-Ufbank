import { test, expect } from '@playwright/test'

test.describe('UFBANK E2E Tests', () => {
  test('should load homepage with UFBANK branding', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'UFBANK' })).toBeVisible()
    await expect(page.getByText('Banco Digital Universitário da UFBA')).toBeVisible()
  })

  test('should have navigation links on homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Cadastrar Usuário' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Cadastrar Máquina' })).toBeVisible()
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

  test('should navigate from homepage to cadastro-usuario', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Cadastrar Usuário' }).click()
    await expect(page).toHaveURL('/cadastro-usuario')
    await expect(page.getByRole('heading', { name: 'Cadastrar Usuário' })).toBeVisible()
  })
})
