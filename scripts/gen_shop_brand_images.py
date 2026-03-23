#!/usr/bin/env python3
"""
SOVEREIGN SHOP BRAND IMAGE GENERATOR — Imagen 3 Pro (Nano Banana Pro) via Vertex AI REST API
Generates brand hero images + HYYC product circle images for luxurymarinelife.shop
Model: imagen-3.0-generate-001 -> imagen-3.0-generate-002 fallback
NEVER uses Gemini image generation.
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

# Output directly to the public directory
SCRIPT_DIR = Path(__file__).parent
PUBLIC_DIR = SCRIPT_DIR.parent / "public"
IMAGES_DIR = PUBLIC_DIR / "images"
IMAGES_DIR.mkdir(parents=True, exist_ok=True)

def get_access_token():
    token_file = SCRIPT_DIR / ".gcp_token"
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

def generate_image(prompt, aspect_ratio, out_path):
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
                    Path(out_path).write_bytes(base64.b64decode(b64))
                    print(f"  [OK] {model} -> {out_path}")
                    return str(out_path)
        except urllib.error.HTTPError as e:
            if e.code in (429,503):
                print(f"  [quota] {model} -> trying Nano 2 fallback...")
                time.sleep(2); continue
            print(f"  [err] {model} HTTP {e.code}: {e.read()[:200]}")
        except Exception as ex:
            print(f"  [err] {model}: {ex}")
    return None

# ─────────── SOVEREIGN PROMPT FORMULA ───────────
# [Photo type] + [Precise subject] + [Camera/lens spec] + [Lighting] + [Composition] + [Film style] + [Mood] + [Quality modifiers] + [Negative prompt]

IMAGES = {
    # ──── 3 BRAND CARD IMAGES (used on /apparel-brands page) ────
    "lml-brand": {
        "out": IMAGES_DIR / "lml-brand-image.webp",
        "aspect_ratio": "3:4",
        "prompt": "Commercial product photography. A premium luxury lifestyle flatlay on teak yacht deck showing folded sustainable cotton crew-neck tee shirt in ocean teal, UPF performance polo in navy blue, and a woven rope bracelet — all arranged with a fresh tropical leaf, a small coral fragment, and soft white linen cloth. Crystal clear turquoise Caribbean water visible through the deck railing in background. Shot Canon EOS R5, 35mm f/1.8, ISO 200. Natural golden hour sunlight, warm diffused tones. Clean editorial composition, bird's eye flatlay with negative space. Kinfolk magazine aesthetic. Mood: effortless coastal luxury, sustainable living. 8K ultra sharp, subtle film grain. Colors: ocean teal, navy, white, warm wood tones, turquoise water. No text, no logos, no watermarks, no people."
    },
    "ac-brand": {
        "out": IMAGES_DIR / "ac-brand-image.webp",
        "aspect_ratio": "3:4",
        "prompt": "Commercial product photography. A refined gentleman's yacht club lifestyle arrangement on dark navy velvet surface inside a luxury yacht salon. A perfectly folded Italian merino wool crew sweater in ivory cream sits next to a brushed gold cufflink box, a classic nautical chronograph watch, and a rolled silk pocket square in navy-gold stripe pattern. Background through porthole window: elegant harbor marina at dusk with moored sailboats, warm amber dock lights reflecting on still water. Shot Leica M11, 50mm Summilux f/1.4, ISO 320. Warm tungsten accent lighting with soft directional side glow. Timeless editorial composition, three-quarter angle. GQ meets Boat International magazine. Mood: refined masculinity, quiet luxury, old-money yacht club. 8K ultra sharp. Colors: ivory, navy, burnished gold, warm amber, charcoal. No text, no logos, no watermarks, no people."
    },
    "hyyc-brand": {
        "out": IMAGES_DIR / "hyyc-brand.webp",
        "aspect_ratio": "3:4",
        "prompt": "Commercial product photography. An edgy luxury fashion flatlay on glossy black marble surface aboard a superyacht at night. A crimson red ribbed bikini top and matching bottoms, oversized tortoiseshell sunglasses with gold arms, and strappy gold high-heel sandals — arranged with a champagne coupe glass with condensation, fresh red roses, and scattered gold confetti. Deep red and warm amber LED lights from the yacht party deck glow in the background. Shot Sony A7R V, 40mm f/2.0, ISO 400. Dramatic moody nightlife lighting with red and gold accent tones. Bold editorial composition, overhead flatlay with cinematic depth. Vogue meets yacht party editorial. Mood: after-dark deck energy, bold, unapologetic luxury. 8K ultra sharp. Colors: crimson red, jet black, burnished gold, warm amber. No text, no logos, no watermarks, no people."
    },

    # ──── 3 HYYC HERO CIRCLE IMAGES (product showcase bubbles) ────
    "hyyc-circle-1": {
        "out": PUBLIC_DIR / "circle_1_1.webp",
        "aspect_ratio": "1:1",
        "prompt": "High fashion product photography. A crimson red ribbed bikini set on an invisible mannequin form, displayed against deep black background with dramatic red side lighting. The bikini has delicate gold hardware clasps and adjustable straps. Studio lighting creates sharp highlights on the ribbed texture. Shot Phase One IQ4, 80mm f/2.8, ISO 160. Studio strobe key light with red gel accent from left. Center frame product isolation. Vogue swimwear editorial. Mood: bold, seductive, premium nautical nightlife. 8K ultra sharp, clean edges. Colors: crimson red, jet black, gold hardware glints. No text, no logos, no watermarks, no people, no background elements."
    },
    "hyyc-circle-2": {
        "out": PUBLIC_DIR / "circle_1_2.webp",
        "aspect_ratio": "1:1",
        "prompt": "Luxury accessory photography. A pair of oversized tortoiseshell acetate sunglasses with polished gold bridge and arm details, floating at a slight angle on a reflective black glass surface. Dramatic studio lighting catches the translucent amber-brown tortoiseshell pattern. Subtle lens reflection shows a blurred yacht deck party scene. Shot Hasselblad X2D, 90mm f/3.2, ISO 200. Studio single-source top-down key light with warm fill. Centered product hero shot. Tom Ford eyewear campaign aesthetic. Mood: effortless glamour, statement accessory. 8K ultra sharp. Colors: warm amber tortoiseshell, polished gold, jet black, subtle warm reflection. No text, no logos, no watermarks, no people."
    },
    "hyyc-circle-3": {
        "out": PUBLIC_DIR / "circle_1_3.webp",
        "aspect_ratio": "1:1",
        "prompt": "Luxury accessory photography. A wide-brim structured straw sun hat with a silk crimson red ribbon band and small gold anchor pin detail, placed on a white yacht deck rail. Blue sky and sparkling turquoise ocean visible in soft bokeh behind. Bright natural midday sun creates clean sharp shadows. Shot Nikon Z9, 85mm f/1.8, ISO 100. Natural bright sunlight, clean open shade fill. Rule-of-thirds composition with hat slightly off-center. Hermès accessories campaign aesthetic. Mood: effortless yacht glamour, sun-drenched luxury. 8K ultra sharp. Colors: natural straw, crimson ribbon, gold pin, turquoise water bokeh, bright white deck. No text, no logos, no watermarks, no people."
    },
}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate shop brand images via Imagen 3 Pro")
    parser.add_argument("--image", default="all", help="Image key to generate (or 'all')")
    args = parser.parse_args()

    targets = IMAGES if args.image == "all" else {args.image: IMAGES[args.image]}
    
    print(f"\n{'='*60}")
    print(f"  SOVEREIGN SHOP BRAND IMAGE GENERATOR")
    print(f"  Model: imagen-3.0-generate-001 (Imagen 3 Pro)")
    print(f"  Targets: {', '.join(targets.keys())}")
    print(f"{'='*60}\n")

    for key, cfg in targets.items():
        print(f"[{key}] Generating...")
        result = generate_image(cfg["prompt"], cfg["aspect_ratio"], cfg["out"])
        if result:
            print(f"  [OK] Saved: {result}")
        else:
            print(f"  [FAIL]: {key}")
        time.sleep(1)  # Rate limit courtesy

    print(f"\n{'='*60}")
    print("  DONE")
    print(f"{'='*60}")
