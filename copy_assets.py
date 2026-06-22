import shutil, os

src = r"C:\Users\anupa\Desktop\healing-surabhi-old"
dst = r"C:\Users\anupa\Desktop\healing-by-surabhi\public"

# Photos of Surabhi
for f in ["surabhi-about.jpg", "surabhi-photo.jpg", "sample-report.png"]:
    shutil.copy2(os.path.join(src, f), os.path.join(dst, f))
    print(f"Copied {f}")

# Logo files from old repo (properly separated)
for f in ["logo-dark.png", "logo-icon.png", "logo-transparent-c.png"]:
    shutil.copy2(os.path.join(src, f), os.path.join(dst, f))
    print(f"Copied {f}")

# Reviews 1-12
for i in range(1, 13):
    fname = f"review-{i}.jpeg"
    shutil.copy2(os.path.join(src, fname), os.path.join(dst, fname))
    print(f"Copied {fname}")

print("\nAll assets copied!")
