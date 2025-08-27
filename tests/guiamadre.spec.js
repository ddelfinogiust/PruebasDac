// tests/guiamadre.spec.js
import { test, expect } from '@playwright/test';

test('Crear guía madre en estado inicial', async ({ page }) => {
  // Abrir URL
  await page.goto('https://www.sge.dac.com.uy/web');

  // Login usando las etiquetas visibles
  await page.getByLabel('Usuario o email').fill('scostas');
  await page.getByLabel('Contraseña').fill('julio2025');
  await page.getByRole('button', { name: /Iniciar sesión/i }).click();

  // Abrir Gestión de encomiendas desde la página de aplicaciones
  await page.click('text=Gestión de encomiendas');

  // Abrir menú Operaciones y seleccionar Guías Madre
  await page.click('text=Operaciones');
  await page.click('text=Guías Madre');

  // Crear nueva guía madre
  await page.click('button:has-text("Crear")');

  // Completar formulario de Guía Madre
  // El campo “Almacén origen” ya viene prellenado con “TRES CRUCES”
  // Seleccionar destino “YOUNG”
  const destino = page.getByLabel('Almacén destino');
  await destino.fill('YOUNG');
  await destino.press('Enter');

  // Seleccionar tipo de contenedor “CAJA ROJA”
  await page.getByLabel('Tipo de contenedor').click();
  await page.getByRole('option', { name: 'CAJA ROJA' }).click();

  // Guardar
  await page.getByRole('button', { name: 'Guardar' }).click();

  // Verificar estado inicial “Borrador”
  await expect(page.locator('text=Borrador')).toBeVisible();
});
