#!/usr/bin/env python3
"""
SOVEREIGN SHOP PRODUCT IMAGE GENERATOR — Imagen 3 Pro (Nano Banana Pro)
Model chain: imagen-3.0-generate-001 (Nano Pro) -> imagen-3.0-generate-002 (Nano 2 fallback)
NEVER uses Gemini image generation.

Generates high-quality product images for all 3 apparel brands:
  - AC Yacht Club (13 products)
  - Luxury Marine Life (6 products)
  - Hottie Yachtie (17 products)

Usage:
  python scripts/gen_shop_products.py --brand all
  python scripts/gen_shop_products.py --brand ac
  python scripts/gen_shop_products.py --brand lml
  python scripts/gen_shop_products.py --brand hy
"""
import os, sys, json, base64, time, argparse
from pathlib import Path
import urllib.request, urllib.error
import subprocess

MODELS = [
    "imagen-3.0-generate-001",  # Imagen 3 Pro / Nano Banana Pro - ALWAYS first
    "imagen-3.0-generate-002",  # Imagen 3 Fast / Nano Banana 2  - quota fallback
]

PROJECT_ID = os.getenv("GCLOUD_PROJECT") or "ac-godmode-titan"
LOCATION   = os.getenv("VERTEX_AI_LOCATION", "us-central1")

# Output directly into the shop's public/images/products/ directory
SHOP_ROOT = Path(os.environ.get("SOVEREIGN_VAULT", r"H:\SovereignCloud")) / "2-BUSINESS-FOR-PROFIT" / "luxurymarinelife-shop" / "luxurymarinelife-shopify"
OUT_DIR = SHOP_ROOT / "public" / "images" / "products"
OUT_DIR.mkdir(parents=True, exist_ok=True)

def get_access_token():
    token_file = Path(__file__).parent / ".gcp_token"
    if token_file.exists():
        t = token_file.read_text(encoding="utf-8").strip()
        if t and len(t) > 20:
            return t
    env_token = os.getenv("IMAGEN_TOKEN")
    if env_token and len(env_token) > 20:
        return env_token
    for cmd in [["gcloud","auth","print-access-token"],
                ["gcloud","auth","application-default","print-access-token"]]:
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, check=True, shell=True)
            t = r.stdout.strip()
            if t and len(t) > 20: return t
        except: pass
    print("ERROR: Run in PowerShell:")
    print("  gcloud auth print-access-token | Out-File -FilePath scripts\\.gcp_token -Encoding ascii -NoNewline")
    sys.exit(1)

def generate_image(prompt, aspect_ratio, filename):
    token = get_access_token()
    for model in MODELS:
        url = f"https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/publishers/google/models/{model}:predict"
        body = json.dumps({
            "instances": [{"prompt": prompt}],
            "parameters": {"sampleCount": 1, "aspectRatio": aspect_ratio, "safetyFilterLevel": "block_few", "personGeneration": "allow_adult"}
        }).encode()
        req = urllib.request.Request(url, data=body, headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
                b64 = data.get("predictions",[{}])[0].get("bytesBase64Encoded")
                if b64:
                    out = OUT_DIR / filename
                    out.write_bytes(base64.b64decode(b64))
                    print(f"  [OK] {model} -> {out}")
                    return str(out)
        except urllib.error.HTTPError as e:
            if e.code in (429,503):
                print(f"  [quota] {model} -> cooling down 15s then trying next model...")
                time.sleep(15); continue
            print(f"  [err] {model} HTTP {e.code}: {e.read()[:200]}")
        except Exception as ex:
            print(f"  [err] {model}: {ex}")
    return None

# ─── PROMPT CONSTRUCTION ────────────────────────────────────────────────
# Sovereign Prompt Formula:
# [Photo type] + [Precise subject] + [Camera/lens] + [Lighting] + [Composition] + [Film style] + [Mood] + [Quality] + [Negative]

NEGATIVE = "No text, no watermarks, no logos, no distorted proportions, no mannequin heads, no low resolution."

# ─── AC YACHT CLUB PRODUCTS ────────────────────────────────────────────
AC_PRODUCTS = {
    "ac-harbor-polo": {
        "filename": "ac-harbor-polo.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a luxury men's navy blue polo shirt with subtle gold anchor embroidery on the chest. The polo is neatly folded on a white marble surface with a coiled nautical rope and brass compass beside it. Premium Pima cotton fabric with visible texture and mother-of-pearl buttons. Shot Canon EOS R5 85mm f/4 macro, studio softbox lighting with warm gold fill, clean white background, e-commerce product quality. Mood: refined nautical luxury. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-cashmere-sweater": {
        "filename": "ac-cashmere-sweater.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a luxurious midnight navy cashmere crew-neck sweater, artfully draped over a teak yacht railing. Ultra-soft Mongolian cashmere with visible fine knit texture. A brass nautical cleat and coiled white rope visible in the background. Shot Canon EOS R5 85mm f/4, diffused natural golden hour light, shallow depth of field, clean composition. Mood: winter yachting elegance. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-commodore-blazer": {
        "filename": "ac-commodore-blazer.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of a navy blue double-breasted blazer with gold anchor buttons, displayed on a wooden hanger against a rich mahogany yacht interior. Italian wool blend fabric with visible texture and fine tailoring details. Pocket square visible in breast pocket. Shot Hasselblad H6D 100mm f/2.8, warm amber studio lighting with dramatic side fill, luxury editorial quality. Mood: timeless yacht club sophistication. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-oxford-shirt": {
        "filename": "ac-oxford-shirt.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a crisp white Oxford button-down shirt, neatly folded on slate gray linen. Egyptian cotton with visible weave texture, collar pressed sharp. A leather watch strap and small anchor pin visible as accent props. Shot Canon EOS R5 85mm f/4, clean diffused studio lighting, minimal white-gray gradient background. Mood: effortless nautical prep. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-linen-shirt": {
        "filename": "ac-linen-shirt.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional lifestyle product photograph of a relaxed natural linen button-up shirt, casually laid across a teak yacht deck chair. Italian linen with beautiful natural wrinkle texture. Turquoise ocean water blurred softly in the background. Shot Canon EOS R5 50mm f/2.8, bright natural tropical sunlight, warm tones, lifestyle editorial quality. Mood: Mediterranean summer on deck. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-captains-peacoat": {
        "filename": "ac-captains-peacoat.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of a heavyweight navy Melton wool peacoat with brass anchor buttons, displayed on a dark wooden coat stand against a foggy harbor backdrop. Double-breasted construction with visible lapel stitching detail. Shot Hasselblad H6D 85mm f/2.8, moody overcast diffused light with warm interior fill, dramatic editorial quality. Mood: timeless British naval heritage. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-deck-shoes": {
        "filename": "ac-deck-shoes.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of classic navy leather boat shoes with white rubber soles, positioned on weathered teak yacht decking. Full-grain leather with visible hand-sewn moccasin stitching detail. Coiled white rope accent in background. Shot Canon EOS R5 85mm f/4, bright diffused daylight, warm tones, clean e-commerce composition. Mood: classic Americana nautical. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-harbor-loafers": {
        "filename": "ac-harbor-loafers.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of sophisticated cognac leather tassel loafers on a dark polished mahogany surface. Italian calf leather with visible hand-stitched detail and elegant tassel accents. A brass ship's compass as prop accent. Shot Canon EOS R5 85mm f/4, warm studio lighting with amber fill, luxury editorial quality. Mood: deck-to-dinner sophistication. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-voyager-weekender": {
        "filename": "ac-voyager-weekender.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a handcrafted cognac leather weekender travel bag with embossed anchor detail on the front. Full-grain Italian leather with brass hardware and canvas lining visible. Positioned on a yacht gangway with blue water behind. Shot Canon EOS R5 50mm f/2.8, golden hour natural light, warm amber tones, luxury travel editorial quality. Mood: coastal escape luxury. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-silk-scarf": {
        "filename": "ac-silk-scarf.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a pure silk scarf in navy blue and gold with elegant nautical motifs — anchors, compass roses, and rope patterns. The scarf is artfully arranged in flowing folds on a white marble surface. Visible silk sheen and hand-rolled edges. Shot Canon EOS R5 85mm f/4, soft diffused studio light, luxury fashion editorial quality. Mood: Hermès-level nautical elegance. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-captains-cap": {
        "filename": "ac-captains-cap.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a traditional navy blue captain's cap with gold embroidered anchor emblem on the front and gold braided band. Wool blend construction with visible quality stitching. Positioned on a brass ship's wheel as display. Shot Canon EOS R5 85mm f/4, warm studio lighting, clean navy-to-white gradient background, luxury accessory quality. Mood: maritime heritage prestige. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-anchor-cufflinks": {
        "filename": "ac-anchor-cufflinks.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional macro product photograph of 18k gold-plated anchor cufflinks with rope detail, displayed on a dark navy velvet jewelry pad. Visible fine metalwork, hand-polished finish catching warm light. A crisp white dress shirt cuff visible at edge of frame for scale. Shot Canon EOS R5 100mm macro f/2.8, controlled studio lighting with dramatic spotlight, luxury jewelry editorial quality. Mood: black-tie maritime refinement. 4K tack-sharp. {NEGATIVE}"
    },
    "ac-nautical-belt": {
        "filename": "ac-nautical-belt.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a woven navy cotton canvas belt with leather trim ends and polished brass buckle. The belt is coiled neatly on a teak surface with a small nautical knot as prop accent. Visible weave texture and clean leather finishing. Shot Canon EOS R5 85mm f/4, bright diffused studio light, clean minimalist background, e-commerce quality. Mood: smart-casual nautical essential. 4K tack-sharp. {NEGATIVE}"
    },
}

# ─── LUXURY MARINE LIFE PRODUCTS ───────────────────────────────────────
LML_PRODUCTS = {
    "lml-apex-polo": {
        "filename": "lml-apex-polo.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional lifestyle product photograph of a premium midnight navy performance polo shirt laid flat on a gleaming white yacht deck. The polo features moisture-wicking fabric with visible athletic texture, UPF 50+ construction. Turquoise Caribbean water visible in soft bokeh background. A pair of premium sunglasses resting on folded collar as accent. Shot Canon EOS R5 50mm f/2.8, bright tropical daylight with warm golden fill, lifestyle editorial quality. Mood: luxury marine performance wear. 4K tack-sharp. {NEGATIVE}"
    },
    "lml-offshore-jacket": {
        "filename": "lml-offshore-jacket.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of a sleek carbon black waterproof sailing jacket displayed on a stainless steel yacht railing against an ocean horizon backdrop. Technical fabric with visible welded seams, adjustable hood, and premium zipper pulls. Ocean spray and dramatic clouds in background. Shot Canon EOS R5 85mm f/2.8, overcast dramatic natural light with cool tones, adventure editorial quality. Mood: elite offshore performance. 4K tack-sharp. {NEGATIVE}"
    },
    "lml-ocean-shorts": {
        "filename": "lml-ocean-shorts.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of premium navy blue performance shorts with a subtle teal waistband accent. Quick-dry stretch fabric with visible mesh lining. Laid flat on white sand with a turquoise water edge visible at bottom of frame. Shot Canon EOS R5 85mm f/4, bright natural daylight, warm coastal tones, clean e-commerce composition. Mood: casual luxury on the water. 4K tack-sharp. {NEGATIVE}"
    },
    "lml-navigator-sunglasses": {
        "filename": "lml-navigator-sunglasses.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional macro product photograph of premium polarized aviator sunglasses with a matte titanium frame, resting on a folded navy linen cloth on a teak yacht surface. Visible anti-glare lens coating reflects a tiny yacht silhouette. Shot Canon EOS R5 100mm macro f/2.8, bright studio light with warm reflections, luxury accessory editorial quality. Mood: sophisticated marine eyewear. 4K tack-sharp. {NEGATIVE}"
    },
    "lml-dad-hat": {
        "filename": "lml-dad-hat.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a relaxed-fit navy blue dad hat with a small embroidered teal ocean wave logo on the front. Cotton twill construction with brushed finish and adjustable brass clasp at back. Positioned on a round white pedestal with soft shadow. Shot Canon EOS R5 85mm f/4, clean diffused studio lighting, white seamless background, e-commerce product quality. Mood: effortless coastal style. 4K tack-sharp. {NEGATIVE}"
    },
    "lml-marine-hoodie": {
        "filename": "lml-marine-hoodie.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional lifestyle product photograph of a premium heather navy zip-up hoodie with a subtle embroidered anchor logo on the chest, draped over a yacht bench seat. Premium French terry construction with visible soft texture. Marina boats blurred softly in background. Shot Canon EOS R5 50mm f/2.8, warm golden afternoon light, lifestyle editorial quality. Mood: harbor sunset comfort luxury. 4K tack-sharp. {NEGATIVE}"
    },
}

# ─── HOTTIE YACHTIE PRODUCTS ──────────────────────────────────────────
HY_PRODUCTS = {
    "hy-sunset-bikini": {
        "filename": "hy-sunset-bikini.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a bold red ribbed bikini set with gold hardware clasp accents. Top and bottom arranged symmetrically on a white marble surface with a single red hibiscus flower as accent. Visible ribbed texture and premium stitching. Shot Canon EOS R5 85mm f/4, bright studio lighting with warm rose-gold fill, vibrant fashion e-commerce quality. Mood: bold, confident yacht-deck energy. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-wave-bikini": {
        "filename": "hy-wave-bikini.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a navy blue cutout bikini with geometric patterns and modern angular silhouette. Arranged on crisp white linen with a gold chain bracelet as accent prop. Visible premium fabric and clean construction. Shot Canon EOS R5 85mm f/4, bright studio lighting, clean vibrant fashion quality. Mood: modern resort luxe. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-midnight-bikini": {
        "filename": "hy-midnight-bikini.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a sleek black string bikini with adjustable tie details. Minimal and elegant against a blush pink fabric background. Visible quality tie construction and smooth matte fabric. Shot Canon EOS R5 85mm f/4, soft diffused studio light, fashion editorial quality. Mood: midnight minimalism. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-monaco-onepiece": {
        "filename": "hy-monaco-onepiece.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a sophisticated black one-piece swimsuit with strategic side cutouts, displayed on a rose gold clothes hanger against a soft white backdrop. Visible premium stretch fabric with subtle sheen. Shot Canon EOS R5 85mm f/4, bright studio lighting with warm accents, luxury swimwear editorial quality. Mood: Monaco yacht party elegance. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-riviera-swimsuit": {
        "filename": "hy-riviera-swimsuit.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a deep red cutout one-piece swimsuit with plunging V-neckline, laid across white marble. Gold ring hardware details at the waist cutouts. Visible stretch fabric quality. Shot Canon EOS R5 85mm f/4, bright warm studio lighting, luxury swimwear quality. Mood: Riviera glamour. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-gold-aviators": {
        "filename": "hy-gold-aviators.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional macro product photograph of oversized gold-frame aviator sunglasses with gradient smoke lenses, resting on a pink marble surface. Visible 18k gold-plated frame detail and premium lens coating. A small tropical flower as accent. Shot Canon EOS R5 100mm macro f/2.8, bright studio with warm gold reflections, luxury accessory quality. Mood: yacht-deck glamour. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-oversized-shades": {
        "filename": "hy-oversized-shades.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional product photograph of oversized black cat-eye sunglasses with tortoiseshell temple detail, positioned on a folded white beach towel. Visible premium acetate construction. Shot Canon EOS R5 85mm f/4, bright natural daylight style studio light, clean fashion photography quality. Mood: poolside chic. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-sunset-bucket": {
        "filename": "hy-sunset-bucket.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a trendy straw bucket hat with a thin gold chain band, positioned on a white pedestal. Natural woven straw texture visible. Shot Canon EOS R5 85mm f/4, warm bright studio light, clean minimalist background, fashion accessory quality. Mood: sunset resort vibes. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-party-tee": {
        "filename": "hy-party-tee.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a fitted black crop top graphic tee with bold gold script text layout area on the front. Premium cotton with soft lived-in texture. Arranged on white marble with gold hoop earrings as accent prop. Shot Canon EOS R5 85mm f/4, bright studio lighting, bold fashion e-commerce quality. Mood: yacht party nightlife. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-night-tee": {
        "filename": "hy-night-tee.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce flat-lay product photograph of a relaxed-fit deep red distressed graphic tee with a subtle faded print area. Soft vintage wash cotton fabric with visible worn texture. Arranged on dark slate surface with black leather bracelet as accent. Shot Canon EOS R5 85mm f/4, moody warm studio lighting, edgy fashion quality. Mood: after-dark yacht vibes. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-cocktail-dress": {
        "filename": "hy-cocktail-dress.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of a stunning red bodycon mini cocktail dress with gold zipper detail, displayed on a sleek matte black dress form. Crepe fabric with visible body-hugging construction and clean hemline. Shot Hasselblad H6D 85mm f/2.8, dramatic warm studio lighting with side fill, high-fashion editorial quality. Mood: yacht gala showstopper. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-slip-dress": {
        "filename": "hy-slip-dress.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of an elegant black silk slip dress with delicate spaghetti straps, draped on a gold clothes hanger against a soft blush backdrop. Visible silk sheen and fluid drape. Shot Canon EOS R5 85mm f/2.8, soft diffused studio lighting with warm glow, luxury fashion editorial quality. Mood: midnight elegance on the water. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-yacht-tote": {
        "filename": "hy-yacht-tote.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional e-commerce product photograph of a woven straw beach tote bag with red leather handles and gold clasp. The bag is positioned on white sand with a folded towel peeking out the top. Visible natural straw weave texture and quality leather trim. Shot Canon EOS R5 50mm f/2.8, bright natural daylight, warm beach tones, lifestyle e-commerce quality. Mood: yacht-to-beach luxury. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-gold-bracelet": {
        "filename": "hy-gold-bracelet.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional macro product photograph of a delicate gold chain bracelet with a small anchor charm, displayed on a soft pink velvet jewelry pillow. Visible 18k gold-plated finish catching warm light. Shot Canon EOS R5 100mm macro f/2.8, controlled warm studio spotlight, luxury jewelry editorial quality. Mood: dainty nautical femininity. 4K tack-sharp. {NEGATIVE}"
    },
    "hy-silk-coverup": {
        "filename": "hy-silk-coverup.webp", "aspect_ratio": "1:1",
        "prompt": f"Professional editorial product photograph of a sheer white silk beach cover-up with delicate embroidered edge detail, flowing freely on a gold hanger against a soft ocean-blue gradient backdrop. Visible silk transparency and feminine drape. A small frangipani flower tucked at the neckline. Shot Canon EOS R5 85mm f/2.8, bright airy studio light, luxury resort fashion quality. Mood: breezy yacht-deck elegance. 4K tack-sharp. {NEGATIVE}"
    },
}

ALL_BRANDS = {
    "ac": ("AC Yacht Club", AC_PRODUCTS),
    "lml": ("Luxury Marine Life", LML_PRODUCTS),
    "hy": ("Hottie Yachtie", HY_PRODUCTS),
}

def main():
    parser = argparse.ArgumentParser(description="Generate shop product images via Imagen 3 Pro")
    parser.add_argument("--brand", default="all", choices=["all", "ac", "lml", "hy"],
                        help="Brand to generate images for")
    parser.add_argument("--product", default=None,
                        help="Single product key to generate (e.g. ac-harbor-polo)")
    args = parser.parse_args()

    print(f"\n{'='*60}")
    print(f"SOVEREIGN SHOP PRODUCT IMAGE GENERATOR")
    print(f"Model: Imagen 3 Pro -> Imagen 3 Fast (fallback)")
    print(f"Project: {PROJECT_ID} | Location: {LOCATION}")
    print(f"Output: {OUT_DIR}")
    print(f"{'='*60}\n")

    if args.product:
        # Generate a single product
        for brand_key, (brand_name, products) in ALL_BRANDS.items():
            if args.product in products:
                cfg = products[args.product]
                print(f"--- Generating: {args.product} ({brand_name}) ---")
                path = generate_image(cfg["prompt"], cfg["aspect_ratio"], cfg["filename"])
                print(f"\n{'OK' if path else 'FAIL'} {args.product}: {path or 'FAILED'}")
                return
        print(f"ERROR: Product key '{args.product}' not found.")
        sys.exit(1)

    # Generate by brand
    brands_to_gen = list(ALL_BRANDS.items()) if args.brand == "all" else [(args.brand, ALL_BRANDS[args.brand])]
    results = []

    for brand_key, (brand_name, products) in brands_to_gen:
        print(f"\n{'─'*60}")
        print(f"  BRAND: {brand_name} ({len(products)} products)")
        print(f"{'─'*60}")

        for prod_key, cfg in products.items():
            # Skip if image already exists
            out_path = OUT_DIR / cfg["filename"]
            if out_path.exists() and out_path.stat().st_size > 5000:
                print(f"  [SKIP] {prod_key} — already exists ({out_path.stat().st_size:,} bytes)")
                results.append((prod_key, str(out_path)))
                continue

            print(f"\n  --- Generating: {prod_key} ---")
            path = generate_image(cfg["prompt"], cfg["aspect_ratio"], cfg["filename"])
            results.append((prod_key, path))
            time.sleep(7)  # Rate limit: Tier 1 = 10 IPM, 7s gap = ~8.5 IPM safe

    print(f"\n\n{'='*60}")
    print(f"  RESULTS SUMMARY")
    print(f"{'='*60}")
    ok = sum(1 for _, p in results if p)
    fail = sum(1 for _, p in results if not p)
    for name, path in results:
        status = "OK" if path else "FAIL"
        print(f"  [{status}] {name}: {path or 'FAILED'}")
    print(f"\n  Total: {ok} OK / {fail} FAILED out of {len(results)} products")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
