# Görseller Klasörü

Bu klasörde sitenin görsellerini saklayabilirsiniz.

## Klasör Yapısı

- **banners/** - Ana sayfa slider görselleri (önerilen boyut: 1920x800px)
- **products/** - Ürün görselleri (önerilen boyut: 800x800px)
- **categories/** - Kategori arka plan görselleri (önerilen boyut: 600x400px)

## Kullanım

Görselleri ilgili klasöre ekledikten sonra şu şekilde kullanabilirsiniz:

### Slider'da kullanım:
```typescript
// src/components/BannerCarousel.tsx
const banners = [
  {
    id: 1,
    title: 'VP İndirimleri',
    subtitle: 'Özel fiyatlar',
    image: '/images/banners/banner1.jpg', // Görseli bu şekilde ekleyin
    color: 'from-purple-600 via-indigo-600 to-blue-600'
  }
]
```

### Ürünlerde kullanım:
```json
// src/data/products.json
{
  "id": "1",
  "title": "Ürün Adı",
  "image": "/images/products/product1.jpg",
  ...
}
```

## Not
- Vite otomatik olarak `public/` klasöründeki dosyaları `/` yolu altında servis eder
- Görselleri optimize etmeyi unutmayın (WebP formatı önerilir)
- Dosya isimlerinde Türkçe karakter kullanmayın
