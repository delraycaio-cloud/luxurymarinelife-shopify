#!/usr/bin/env python3
"""
SOVEREIGN IMAGE GENERATOR — Shop Category & Hero Images
Model: imagen-3.0-generate-001 (Nano Banana Pro) -> imagen-3.0-generate-002 (fallback)
Output: public/ directory of luxurymarinelife-shopify
"""
import os, sys, json, base64, time, argparse
from pathlib import Path
import urllib.request, urllib.error
import subprocess

MODELS = [
    "imagen-3.0-generate-001",
    "imagen-3.0-generate-002",
]

PROJECT_ID = os.getenv("GCLOUD_PROJECT") or "ac-godmode-titan"
LOCATION   = os.getenv("VERTEX_AI_LOCATION", "us-central1")

SOVEREIGN_VAULT = os.getenv("SOVEREIGN_VAULT")
if not SOVEREIGN_VAULT:
    raise EnvironmentError("[OMNI-PATH] SOVEREIGN_VAULT env var not set. Halting.")

OUT_DIR = Path(SOVEREIGN_VAULT) / "2-BUSINESS-FOR-PROFIT" / "luxurymarinelife-shop" / "luxurymarinelife-shopify" / "public"
OUT_DIR.mkdir(parents=True, exist_ok=True)

def get_access_token():
    token_file = Path(__file__).parent / ".gcp_token"
    if token_file.exists():
        t = token_file.read_text(encoding="utf-8").strip()
        if t and len(t) > 20: return t
    # Fallback to main scripts dir token
    main_token = Path(SOVEREIGN_VAULT) / "2-BUSINESS-FOR-PROFIT" / "luxury-marine-life" / "luxurymarinelife-main" / "scripts" / ".gcp_token"
    if main_token.exists():
        t = main_token.read_text(encoding="utf-8").strip()
        if t and len(t) > 20: return t
    env_token = os.getenv("IMAGEN_TOKEN")
    if env_token and len(env_token) > 20: return env_token
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
                print(f"  [quota] {model} -> trying fallback...")
                time.sleep(2); continue
            print(f"  [err] {model} HTTP {e.code}: {e.read()[:200]}")
        except Exception as ex:
            print(f"  [err] {model}: {ex}")
    return None

# Sovereign Prompt Formula: [Photo type] + [Subject] + [Camera] + [Lighting] + [Composition] + [Film] + [Mood] + [Quality] + [Negative]
IMAGES = {
    "category_learning": {
        "filename": "category_learning.webp", "aspect_ratio": "1:1",
        "prompt": "An editorial documentary photograph of a bright modern floating classroom on a yacht deck. Five diverse teenagers aged 14-17 wearing orange safety vests study vibrant coral reef specimens on a large interactive touchscreen display showing marine biology data. Crystal turquoise Caribbean ocean stretches behind them under blue sky with white clouds. One student holds a waterproof tablet showing dolphin tracking data. A female marine biologist points at the screen explaining. Warm tropical natural light, golden hour fill. Shot Canon EOS R5 35mm f/2.8 ISO 400. National Geographic meets Forbes education feature. Color: ocean teal, safety orange, white yacht deck, blue sky. 4K HDR tack-sharp. No text, no watermarks, no logos, no distorted faces."
    },
    "category_biohacking": {
        "filename": "category_biohacking.webp", "aspect_ratio": "1:1",
        "prompt": "An ultra-premium product photography still life. A sleek frosted glass dropper bottle of golden nano-emulsified oil supplement with amber liquid, surrounded by fresh turmeric roots, curcumin powder dusting, black seed pods, and premium CoQ10 golden capsules. Arranged on a polished white marble surface. Soft luxurious side lighting creating elegant shadows and golden liquid glow. Background: soft bokeh of a yacht interior with teak wood and ocean view through porthole. Shot Phase One IQ4 150MP 80mm f/2.8 macro. Robb Report wellness feature quality. Color: golden amber oil, warm marble white, deep teak brown, ocean teal hint. 4K HDR. No text, no watermarks, no logos, no people."
    },
    "category_tech": {
        "filename": "category_tech.webp", "aspect_ratio": "1:1",
        "prompt": "An aerial editorial photograph of a sleek modern white 80ft yacht with integrated solar panels on the forward deck, advanced satellite communications dome, and a large exterior weatherproof touchscreen navigation display showing eco-routing data with dolphins detected ahead. The yacht glides through crystal turquoise tropical water. Visible clean energy tech: solar panels gleaming in sun, wind micro-turbine, and water quality sensors trailing behind. No diesel smoke. Shot DJI Zenmuse X9 35mm ISO 200 overhead angle. Sunlit tropical midday. Architectural Digest meets Popular Science cover. Color: pristine white hull, turquoise water, solar panel blue-black, chrome tech accents, sky blue. 4K HDR tack-sharp. No text, no watermarks, no logos."
    },
    "category_apparel": {
        "filename": "category_apparel.webp", "aspect_ratio": "1:1",
        "prompt": "An editorial lifestyle photograph of premium yacht club apparel displayed on a polished teak yacht deck rail with turquoise Caribbean ocean behind. A crisp white linen polo shirt with subtle nautical embroidery, a navy performance cap with gold anchor logo, and premium anti-UV sunglasses arranged artfully. Beside them: a cold condensation glass of sparkling water, a coiled white dock line. Warm golden hour sunlight with champagne rim highlights on fabric textures. Shot Hasselblad X2D 55mm f/2.5 ISO 200. Robb Report fashion feature quality. Color: crisp white linen, navy blue, champagne gold thread, turquoise water bokeh, warm teak. 4K HDR tack-sharp. No text, no watermarks, no logos, no people."
    },
    "hero_product": {
        "filename": "hero_lifestyle.webp", "aspect_ratio": "16:9",
        "prompt": "A stunning wide-angle editorial photograph of the aft deck of a gleaming 100ft white luxury SmartYacht at golden hour. The deck is setup for an exclusive sunset wellness experience: a pristine white lounge area with soft cushions, a small display of premium golden oil supplement bottles, fresh organic fruits, and chilled sparkling water on a teak side table. Beyond the stern rail: calm turquoise Caribbean water stretches to a distant private island with palm trees silhouetted against a spectacular pink-orange-gold sunset sky. The yacht AI navigation screen glows softly in the bridge above. Atmosphere of serene luxury and effortless wellness. Shot Hasselblad H6D-400c 24mm f/4 ISO 200. Golden hour directional warm light. Robb Report cover quality. Color: champagne gold sunset, deep teal water, white yacht, warm teak, golden supplement amber. 8K HDR tack-sharp. No text, no watermarks, no logos, no people."
    }
}

def main():
    parser = argparse.ArgumentParser(description="Generate shop category images via Imagen 3 Pro")
    parser.add_argument("--image", default="all", choices=["all"] + list(IMAGES.keys()))
    args = parser.parse_args()
    print(f"\nSovereign Shop Image Generator")
    print(f"Project: {PROJECT_ID} | Location: {LOCATION}")
    print(f"Output: {OUT_DIR}\n")
    targets = list(IMAGES.items()) if args.image == "all" else [(args.image, IMAGES[args.image])]
    results = []
    for name, cfg in targets:
        print(f"\n--- Generating: {name} ---")
        path = generate_image(cfg["prompt"], cfg["aspect_ratio"], cfg["filename"])
        results.append((name, path))
        time.sleep(4)
    print("\n=== RESULTS ===")
    for name, path in results:
        print(f"{'OK' if path else 'FAIL'} {name}: {path or 'FAILED'}")

if __name__ == "__main__":
    main()
