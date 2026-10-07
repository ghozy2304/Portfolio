Add-Type -AssemblyName System.Drawing

$src = "C:\Users\novit\.gemini\antigravity-ide\brain\c05e8905-aa23-4a5a-8cac-a4149e4fc869\.user_uploaded\media_1791279313444.png"
$dest = "C:\Users\novit\Documents\portfolio\src\assets\idn-preview.png"

$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height

# Precise crop: 56px from top (clears address bar completely), 14px from right (clears browser scrollbar)
$cropTop = 56
$cropRight = 14
$cropWidth = $w - $cropRight
$cropHeight = $h - $cropTop

$rect = New-Object System.Drawing.Rectangle(0, $cropTop, $cropWidth, $cropHeight)
$bmp = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Successfully perfected crop and saved to $dest"
