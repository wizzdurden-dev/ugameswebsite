# 🖼️ Görsel Ekleme Kılavuzu

## Slider Görselleri Ekleme

### 1. Adım: Görseli Ekleyin
Slider için kullanmak istediğiniz görseli şu klasöre ekleyin:
```
/public/images/banners/
```

**Önerilen Özellikler:**
- Boyut: 1920x800px (en az 1200x600px)
- Format: JPG veya WebP
- Dosya boyutu: Maksimum 300KB
- İsimlendirme: `banner1.jpg`, `banner2.jpg`, vb.

### 2. Adım: Kodu Güncelleyin
`src/components/BannerCarousel.tsx` dosyasında:

```typescript
const banners = [
  {
    id: 1, 
    title: 'VP İndirimleri Başladı!', 
    subtitle: 'Valorant, PUBG ve League of Legends için özel fiyatlar', 
    color: 'from-purple-600 via-indigo-600 to-blue-600',
    icon: 'gamepad',
    image: '/images/banners/banner1.jpg' // ← Kendi görselinizin adını yazın
  }
]
```

### 3. Görsel Olmadan Kullanım
Eğer görsel eklemek istemiyorsanız, `image` satırını silebilirsiniz. Gradient arka plan otomatik gösterilir.

---

## Ürün Görselleri Ekleme

### 1. Adım: Görseli Ekleyin
```
/public/images/products/
```

**Önerilen Özellikler:**
- Boyut: 800x800px (kare)
- Format: JPG veya WebP
- Arka plan: Beyaz veya transparan

### 2. Adım: products.json'u Güncelleyin
`src/data/products.json` dosyasında:

```json
{
  "id": "1",
  "title": "Valorant Hesap",
  "image": "/images/products/valorant-account.jpg",
  "images": [
    "/images/products/valorant-account.jpg",
    "/images/products/valorant-account-2.jpg"
  ]
}
```

---

## Kategori Arka Plan Görselleri

```
/public/images/categories/
```

Ana sayfadaki kategori kutucuklarına arka plan görseli eklemek için:

`src/pages/Home.tsx` dosyasında:

```tsx
<Link 
  to="/ilanlar?category=instagram" 
  className="category-tile h-24"
  style={{ 
    backgroundImage: 'url(/images/categories/instagram-bg.jpg)',
    backgroundSize: 'cover'
  }}
>
  <Icon name="camera" className="w-6 h-6 mr-2" />
  Instagram
</Link>
```

---

## ⚠️ Önemli Notlar

1. **Dosya İsimleri**: Türkçe karakter kullanmayın, boşluk yerine tire (-) kullanın
   - ✅ `banner-gaming.jpg`
   - ❌ `banner gaming.jpg`

2. **Görsel Optimizasyonu**: Görselleri eklemeden önce optimize edin:
   - Online araçlar: TinyPNG, Squoosh
   - Format: WebP kullanımı önerilir (daha küçük boyut)

3. **Yol Kullanımı**: `/public` klasöründeki dosyalara `/` ile erişilir:
   - Dosya yolu: `/public/images/banners/banner1.jpg`
   - Kodda kullanım: `/images/banners/banner1.jpg`

4. **Geliştirme Sunucusu**: Görsel ekledikten sonra tarayıcıyı yenileyin (hard refresh: Cmd+Shift+R veya Ctrl+Shift+R)

---

## 🎨 Örnek Görsel Boyutları

| Kullanım | Önerilen Boyut | Aspect Ratio |
|----------|----------------|--------------|
| Slider | 1920x800px | 21:9 |
| Ürün | 800x800px | 1:1 |
| Kategori | 600x400px | 3:2 |
| Logo | 200x200px | 1:1 |

---

## 💡 İpuçları

1. **Yüksek Kaliteli Görseller**: Unsplash, Pexels gibi ücretsiz stok fotoğraf sitelerinden kullanabilirsiniz
2. **Gradient Üzerine Görsel**: Görseller %30 opacity ile gösterilir, bu sayede üzerindeki yazılar okunabilir kalır
3. **Lazy Loading**: Ürün görselleri otomatik lazy load edilir (performans için)
