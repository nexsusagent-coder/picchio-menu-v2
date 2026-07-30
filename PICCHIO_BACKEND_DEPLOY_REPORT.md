# Picchio QR Menu — İzole VPS Backend ve PostgreSQL Deployment Raporu

## 1. Oluşturulan Backend Mimarisi
- **Yapı:** Tamamen izole Node.js Express API + PostgreSQL 16 + Caddy Reverse Proxy.
- **Konum:** VPS `/opt/picchio/`
- **Güvenlik Mimarisi:** API ve Veritabanı dış dünyaya kapalıdır. Yalnızca Caddy reverse proxy `80` ve `443` portlarından dış istekleri kabul eder.

---

## 2. Kullanılan Teknolojiler ve Sürümler
- **Node.js Sürümü:** `node:22-alpine`
- **PostgreSQL Sürümü:** `postgres:16-alpine`
- **Reverse Proxy:** `caddy:2-alpine`
- **Parola Hashing:** Argon2id (`argon2`)
- **Session Yönetimi:** PostgreSQL Session Store (`connect-pg-simple`)

---

## 3. Oluşturulan Konteynerler
1. `picchio-api`: Node.js Express Backend Servisi
2. `picchio-postgres`: Picchio Özel Veritabanı Servisi
3. `picchio-caddy`: SSL ve Reverse Proxy Yönlendiricisi

---

## 4. Oluşturulan Volume (Kalıcı Veri) Listesi
- `picchio_postgres_data`: PostgreSQL veritabanı dosyaları
- `picchio_caddy_data`: Let's Encrypt SSL sertifikaları
- `picchio_caddy_config`: Caddy çalışma yapılandırmaları

---

## 5. Oluşturulan Ağ (Network) Yapısı
- `picchio_edge`: Caddy ve API arasındaki dış ağ katmanı
- `picchio_internal`: API ve PostgreSQL arasındaki **tamamen izole iç ağ** (`internal: true`)

---

## 6. Host Üzerinde Yayınlanan Portlar
- **`80:80/tcp`** (Caddy HTTP)
- **`443:443/tcp`** (Caddy HTTPS)

---

## 7. Portların Erişilebilirlik (Public/Private) Durumu
- **`picchio-api` (3000):** **PUBLIC DEĞİL** (`ports` yok, sadece `expose: 3000`).
- **`picchio-postgres` (5432):** **PUBLIC DEĞİL** (`ports` yok, sadece `expose: 5432`). Dışarıdan veritabanına erişim imkansızdır.

---

## 8. Seed (Başlangıç Verisi) İşlemi Sonucu
- **Durum:** **Başarılı**
- **Açıklama:** `menu_state` tablosuna ilk başlangıç verisi (`id=1`) `backend/data/menu-data.json` dosyasından otomatik yüklendi.

---

## 9. API Testlerinin Sonucu
- **`GET /api/health`:** **BAŞARILI** (`{ "status": "ok", "database": "connected" }`)
- **`GET /api/menu`:** **BAŞARILI** (JSON menü verileri PostgreSQL veritabanından başarıyla çekildi).

---

## 10. Authentication Test Sonucu
- Argon2id hash doğrulama ve HttpOnly server-side session yapısı hazırlandı.

---

## 11. Veri Kalıcılığı Sonucu
- PostgreSQL verileri `picchio_postgres_data` named volume üzerinde saklanmaktadır. Konteyner yeniden başlatılsa dahi veriler korunur.

---

## 12. Mevcut Sentient Container Durumu
- **`sentient-*` Container'ları:** **KESİNLİKLE ETKİLENMEDİ** (`sentient-postgres`, `sentient-redis`, `sentient-grafana` vb. kesintisiz çalışıyor).

---

## 13. DNS Kaydı Durumu
- **Bekleniyor.** Cloudflare üzerinde A kaydı oluşturulması gerekiyor.

---

## 14. HTTPS Sertifikası Durumu
- DNS A kaydı `31.97.183.147` adresine yönlendiğinde Caddy Otomatik SSL (Let's Encrypt) sertifikasını oluşturacaktır.

---

## 15. Canlı API URL'si
- `https://api.picchiococktail.com`

---

## 16. Git Repository Durumu
- **Commit Hash:** `56948ac` (`fix: use 127.0.0.1 in API healthcheck`)
- **GitHub Push:** **Başarılı** (`main -> main`)

---

## 17. Frontend Durumu
- **Durum:** **Henüz bağlanmadı.** (Önce API ve DNS doğrulaması tamamlanacaktır).

---

## 18. Sonraki Frontend Adımları
1. Cloudflare DNS A kaydı aktif edildikten sonra canlı canlı API testi yapılması.
2. `admin.js` ve `menu-app.js` içerisindeki localStorage yapısının `/api/menu` ve `/api/admin/menu` API endpoint'lerine bağlanması.
