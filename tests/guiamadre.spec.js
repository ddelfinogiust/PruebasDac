// tests/guiamadre.spec.js
import { test, expect } from '@playwright/test';

test('Crear guía madre en estado inicial', async ({ page }) => {
  // Abrir URL
  await page.goto('https://www.sge.dac.com.uy/web');

  // Login
  await page.fill('#login', 'scostas');   // Ajustar selectores reales
  await page.fill('#password', 'julio2025');
  await page.click('button[type="submit"]');

  // Navegar al menú de guías madre
  await page.click('text=Operaciones');
  await page.click('text=Logística');
  await page.click('text=Guías madre');
  await page.click('text=Crear');

  // Completar formulario
  await page.selectOption('#origen', { label: 'Tres Cruces' });
  await page.selectOption('#destino', { label: 'Young' });
  await page.selectOption('#tipoContenedor', { label: 'Caja roja' });
  await page.fill('#numeroSerie', 'DAC00000000');
  await page.click('text=Guardar');

  // Verificar estado inicial
  await expect(page.locator('text=Borrador')).toBeVisible();
});
