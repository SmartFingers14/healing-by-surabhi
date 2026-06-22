from PIL import Image

img = Image.open(r"C:\Users\anupa\Desktop\healing-by-surabhi\public\logo-full.png")
w, h = img.size
print(f"Full image: {w}x{h}")

# Dark version is the left half (top portion)
# The image layout: left=dark version, right=light version, bottom center=icon only
dark = img.crop((0, 0, w // 2, int(h * 0.75)))
dark.save(r"C:\Users\anupa\Desktop\healing-by-surabhi\public\logo-dark.png")
print(f"Dark logo saved: {dark.size}")

# Icon only is bottom center area
icon_left = int(w * 0.3)
icon_right = int(w * 0.7)
icon_top = int(h * 0.7)
icon = img.crop((icon_left, icon_top, icon_right, h))
icon.save(r"C:\Users\anupa\Desktop\healing-by-surabhi\public\logo-icon.png")
print(f"Icon logo saved: {icon.size}")

# Create favicon from icon (square, 512x512)
icon_sq = icon.copy()
# Make it square
max_dim = max(icon_sq.size)
square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
offset = ((max_dim - icon_sq.width) // 2, (max_dim - icon_sq.height) // 2)
square.paste(icon_sq, offset)
favicon = square.resize((512, 512), Image.LANCZOS)
favicon.save(r"C:\Users\anupa\Desktop\healing-by-surabhi\public\favicon.png")
print(f"Favicon saved: 512x512")

# Also create a 32x32 ico
favicon_32 = square.resize((32, 32), Image.LANCZOS)
favicon_32.save(r"C:\Users\anupa\Desktop\healing-by-surabhi\public\favicon.ico", format="ICO")
print("favicon.ico saved: 32x32")

print("Done!")
