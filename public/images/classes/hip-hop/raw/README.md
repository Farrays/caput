# Imágenes de Hip Hop

## Instrucciones

1. **Sube aquí tus imágenes originales** (alta resolución, sin optimizar):
   - `hip-hop-hero.jpg` → Imagen principal (portada)
   - `hip-hop-clase-1.jpg` → Foto de la clase en acción
   - `hip-hop-profesor.jpg` → Foto del instructor

2. **Actualiza el script de optimización:**
   ```javascript
   // scripts/build-images.mjs
   const classes = ["dancehall", "afrobeats", "hip-hop"];
   ```

3. **Ejecuta la optimización:**
   ```bash
   npm run build:images
   ```

4. **Las imágenes optimizadas** (WebP + JPG, múltiples tamaños) se generarán en `/img`

---

📐 **Recomendaciones de tamaño:**
- Hero: 1920x1080 o mayor (16:9)
- Clase: 1200x1500 (4:5, vertical)
- Profesor: 800x800 (1:1, cuadrado)

🎨 **Formato:** JPG o PNG (el script generará WebP automáticamente)
