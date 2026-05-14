Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Join-Path (Get-Location) "scripts" }
$root = Split-Path -Parent $scriptRoot
$out = Join-Path $root "public\brand\litho-intelligence-app-share-v1.png"
$logoPath = Join-Path $root "public\brand\litho-intelligence-icon.png"

function New-Brush($r, $g, $b) {
  return [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb($r, $g, $b))
}

function Add-Text($graphics, $text, $fontName, $size, $style, $brush, $x, $y, $w, $h) {
  $font = [System.Drawing.Font]::new($fontName, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
  $format = [System.Drawing.StringFormat]::new()
  $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $graphics.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $format)
  $font.Dispose()
  $format.Dispose()
}

$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$cream = New-Brush 250 246 240
$ink = New-Brush 42 32 35
$green = New-Brush 45 84 76
$rose = New-Brush 174 113 125
$gold = New-Brush 196 143 55
$softRose = New-Brush 242 224 221
$softGreen = New-Brush 229 239 234
$white = New-Brush 255 255 255
$shadow = New-Brush 232 220 214

$graphics.FillRectangle($cream, 0, 0, 1200, 630)
$graphics.FillEllipse($softRose, 875, -90, 300, 300)
$graphics.FillEllipse($softGreen, 880, 420, 380, 260)

$logo = [System.Drawing.Image]::FromFile($logoPath)
$graphics.DrawImage($logo, 74, 75, 94, 94)

Add-Text $graphics "Litho Intelligence" "Georgia" 52 ([System.Drawing.FontStyle]::Bold) $ink 190 80 620 68
Add-Text $graphics "by Quintessence Cristal" "Segoe UI" 29 ([System.Drawing.FontStyle]::Regular) $rose 194 143 500 42
Add-Text $graphics "Trouvez la pierre adaptée à votre énergie du moment." "Georgia" 45 ([System.Drawing.FontStyle]::Bold) $green 75 218 610 145
Add-Text $graphics "Test gratuit • Résultat immédiat`nBracelet recommandé" "Segoe UI" 24 ([System.Drawing.FontStyle]::Regular) $ink 80 386 560 70

$graphics.FillRectangle($gold, 80, 466, 318, 58)
Add-Text $graphics "Faire le test gratuit" "Segoe UI" 26 ([System.Drawing.FontStyle]::Bold) $white 112 477 260 36

$graphics.FillRectangle($shadow, 724, 87, 350, 472)
$graphics.FillRectangle($white, 700, 65, 350, 472)
$graphics.FillRectangle($softRose, 722, 91, 306, 56)
Add-Text $graphics "Votre recommandation" "Segoe UI" 21 ([System.Drawing.FontStyle]::Bold) $ink 744 106 272 30
$graphics.FillRectangle($softGreen, 724, 177, 134, 134)
$graphics.FillEllipse($green, 755, 207, 72, 72)
Add-Text $graphics "Labradorite" "Georgia" 24 ([System.Drawing.FontStyle]::Bold) $green 881 194 165 34
Add-Text $graphics "Protection symbolique" "Segoe UI" 21 ([System.Drawing.FontStyle]::Regular) $rose 884 235 142 56
$graphics.FillRectangle($cream, 724, 343, 305, 72)
Add-Text $graphics "Rituel de 2 minutes" "Segoe UI" 24 ([System.Drawing.FontStyle]::Bold) $ink 748 356 245 30
Add-Text $graphics "Respirez, choisissez votre intention, portez votre bracelet." "Segoe UI" 17 ([System.Drawing.FontStyle]::Regular) $ink 748 388 260 24
$graphics.FillRectangle($gold, 724, 448, 305, 55)
Add-Text $graphics "Voir le bracelet associé" "Segoe UI" 21 ([System.Drawing.FontStyle]::Bold) $white 750 461 265 30

$graphics.FillRectangle($rose, 80, 557, 19, 19)
Add-Text $graphics "Lithothérapie présentée comme une tradition symbolique et culturelle." "Segoe UI" 19 ([System.Drawing.FontStyle]::Regular) $ink 112 552 700 34

$logo.Dispose()
$graphics.Dispose()
$bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bitmap.Dispose()

Write-Host "Generated $out"
