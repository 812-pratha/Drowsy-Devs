import qrcode
data = "https://your-website.com"

# Generate QR
qr = qrcode.make(data)

# Save as image
qr.save("my_qr.png")
