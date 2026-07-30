# Picchio VPS — Salt Okunur Güvenlik & Denetim Raporu

## 1. SSH Bağlantısı
- **Durum:** Başarılı (`root@31.97.183.147`)
- **Hostname:** `srv1462760`

---

## 2. İşletim Sistemi ve Sürümü
- **OS:** Ubuntu 24.04.4 LTS (Noble Numbat)
- **Çekirdek (Kernel):** `Linux 6.8.0-110-generic #110-Ubuntu SMP x86_64`
- **Çalışma Süresi (Uptime):** 93 Gün

---

## 3. Donanım ve Kaynak Durumu (CPU, RAM, Disk)
- **CPU:** 4 Çekirdek (Load Average: 0.25, 0.20, 0.19)
- **RAM:** Toplam `15 GiB` | Kullanılan: `1.2 GiB` (%8) | Serbest/Kullanılabilir: `14 GiB`
- **Disk:** Toplam `193 GiB` | Kullanılan: `61 GiB` (%32) | Boş: `133 GiB`

---

## 4. Docker ve Docker Compose Sürümü
- **Docker Version:** `Docker 29.1.3`
- **Docker Compose:** `docker compose` plugin kurulabilir (Docker CLI aktif).

---

## 5. Coolify Kurulum Durumu
- **Durum:** **Kurulu değil** (`/data/coolify` dizini bulunmuyor).

---

## 6. Reverse Proxy Türü
- Halihazırda 80/443 portlarında çalışan aktif bir Traefik, Nginx, Caddy veya Coolify proxy container'ı tespit edilmemiştir (UFW üzerinde 80 ve 443 portları açık olarak tanımlıdır).

---

## 7. Çalışan Docker Container Listesi & Portlar

| Container İsmi | İmaj (Image) | Durum | Dinlenen Public Portlar |
| :--- | :--- | :--- | :--- |
| `sentient-postgres` | `postgres:16-alpine` | Up 3 months (healthy) | `0.0.0.0:5432->5432/tcp` |
| `sentient-redis` | `redis:7-alpine` | Up 3 months (healthy) | `0.0.0.0:6379->6379/tcp` |
| `sentient-grafana` | `grafana/grafana:10.2.2` | Up 3 months (healthy) | `0.0.0.0:3001->3000/tcp` |
| `sentient-prometheus` | `prom/prometheus:v2.48.0` | Up 3 months (healthy) | `0.0.0.0:9090->9090/tcp` |
| `sentient-qdrant` | `qdrant/qdrant:v1.8.0` | Up 3 months (unhealthy) | `0.0.0.0:6333-6334->6333-6334/tcp` |
| `sentient-minio` | `minio/minio:latest` | Up 3 months (healthy) | `0.0.0.0:9000-9001->9000-9001/tcp` |

---

## 8. PostgreSQL ve Redis Durumu
- **PostgreSQL:** `sentient-postgres` (`postgres:16-alpine`) container'ı aktif ve sağlıklı durumda.
- **Redis:** `sentient-redis` (`redis:7-alpine`) container'ı aktif ve sağlıklı durumda.

---

## 9. 5432 ve 6379 Portlarının Güvenlik Durumu
- **Dinleme Adresi:** Docker proxy 5432 ve 6379 portlarını `0.0.0.0` (tüm ağ arayüzleri) üzerinden dinlemektedir.
- **UFW Güvenlik Duvarı:** UFW aktif kural listesinde 5432 ve 6379 için doğrudan `ALLOW IN` kuralı olmasa da, Docker'ın varsayılan iptables yönlendirmeleri nedeniyle veritabanı portlarının yalnızca `127.0.0.1` (localhost) arayüzüne bağlanması önerilir.

---

## 10. Picchio API İçin Önerilen Deployment Yöntemi
- Sunucuda bol miktarda RAM (`14 GiB` kullanılabilir) ve CPU kaynağı bulunduğundan, Picchio Backend API için **Docker Compose** + **Nginx / Caddy Reverse Proxy** veya **Coolify** mimarisi kullanılması önerilir.

---

## 11. Picchio PostgreSQL İçin Önerilen Yöntem
- Sunucudaki mevcut `sentient-postgres` üzerinde yeni bir `picchio_db` veritabanı ve güvenli bir kullanıcı açılabilir ya da izolasyon için ayrı bir `picchio-postgres` Docker container'ı kurulabilir.

---

## 12. `api.picchiococktail.com` Bağlantısı İçin Sonraki Aşamalar
1. Cloudflare DNS üzerinde `api.picchiococktail.com` A kaydını `31.97.183.147` IP adresine yönlendirmek.
2. VPS üzerinde 80/443 portlarında Nginx/Caddy veya Traefik reverse proxy kurarak SSL sertifikası (Let's Encrypt / Cloudflare SSL) tanımlamak.
3. Picchio Node.js / Go / Python Backend API container'ını yayına almak.

---

## 13. Sunucuda Yapılan Değişiklikler
- **Hiçbir değişiklik yapılmamıştır.** Denetim tamamen %100 salt okunur (read-only) komutlarla gerçekleştirilmiştir.
