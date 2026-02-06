
# 8X VIP Diagnostika | Transformacijos Portalas

Šis projektas yra paruoštas talpinimui **Vercel** platformoje su prijungimu prie **Wix** subdomeno.

## Kaip paskelbti projektą (GitHub dalis):

1. **Susikurkite GitHub Repozitoriją**:
   - Eikite į [github.com/new](https://github.com/new)
   - Pavadinkite ją, pvz., `8x-vip-diagnostika`.
   - Nesirinkite "Add a README" (mes jį jau turime).

2. **Įkelkite failus**:
   Jei naudojate kompiuterį, terminale įvykdykite:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/JUSU_VARDAS/8x-vip-diagnostika.git
   git push -u origin main
   ```

## Kaip prijungti prie Vercel:

1. Eikite į **Vercel.com** ir spauskite **"Add New Project"**.
2. Pasirinkite savo ką tik sukurtą GitHub repozitoriją.
3. Sekcijoje **"Environment Variables"** pridėkite:
   - **Key**: `API_KEY`
   - **Value**: (Jūsų Google Gemini API raktas)
4. Spauskite **"Deploy"**.

## Kaip prijungti prie Wix Subdomeno (vip.tavodomenas.lt):

1. **Wix DNS nustatymuose** pridėkite **CNAME** įrašą:
   - **Host**: `vip`
   - **Points to**: `cname.vercel-dns.com`
2. **Vercel nustatymuose** (Settings -> Domains) pridėkite: `vip.tavodomenas.lt`.
