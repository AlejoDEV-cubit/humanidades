import qrcode
from PIL import Image

# Configuración del código QR
def generar_qr(url, nombre_archivo="qr_humanidades.png"):
    # Configurar el QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    
    # Añadir datos (tu URL)
    qr.add_data(url)
    qr.make(fit=True)
    
    # Crear imagen del QR
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Guardar imagen
    img.save(nombre_archivo)
    print(f"Código QR generado y guardado como {nombre_archivo}")

# URL de tu página web
url_humanidades = "https://alejodev-cubit.github.io/humanidades/"

# Generar el código QR
generar_qr(url_humanidades)