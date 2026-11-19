# FEROFIRE — структура сайта

```
/                      витрина (index.html + style.css)
/shared/               общее для всех магазинов
    categories.json    список категорій для меню (колонка зліва / бургер на телефоні)
    nav.js, nav.css    код і стилі меню
/tandyr/               магазин «Аксесуари для тандиру» (реальні товари)
/skovorody/ /shampury/ /avtoklavy/ /kazany/ /mangaly/
                       тестові магазини: ті самі шаблони з умовними товарами й цінами
                       (замініть data/products.json на свої та покладіть фото в img/)
/favicon/, favicon.ico іконки сайту
robots.txt, sitemap.xml
```

## Додати новий магазин (наприклад, шампури)
1. Скопіюйте папку будь-якого магазину (наприклад `shampury/`) під новою назвою.
2. У `data/config.json` змініть `shopId`, `shopTitle` і `icon` (значок, поки немає фото: pan, skewer, cauldron, brazier, jar).
3. У `data/products.json` впишіть свої товари, у `img/` покладіть фото.
4. У `index.html` змініть canonical, title, description, заголовок, питання (FAQ) і SEO-текст внизу.
5. У `shared/categories.json` додайте рядок категорії (для «скоро» додайте `"soon": true`).
6. На витрині `index.html` додайте картку з посиланням на новий магазин.
7. Додайте адресу в `sitemap.xml`.

Корзина спільна для всіх магазинів, якщо вони лежать на одному домені.
Перевірка локально: `python3 -m http.server 8000` у цій папці, далі http://localhost:8000
