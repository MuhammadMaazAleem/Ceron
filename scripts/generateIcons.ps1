Add-Type -AssemblyName System.Drawing

function Generate-Icon($size, $outputPath) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    
    # Background circular gradient
    $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $c1 = [System.Drawing.Color]::FromArgb(255, 15, 23, 42)
    $c2 = [System.Drawing.Color]::FromArgb(255, 30, 41, 59)
    $brushBg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 45.0
    $g.FillEllipse($brushBg, 2, 2, ($size - 4), ($size - 4))
    
    # Gold border
    $gold = [System.Drawing.Color]::FromArgb(255, 245, 158, 11)
    $pen = New-Object System.Drawing.Pen $gold, ($size * 0.04)
    $g.DrawEllipse($pen, [float]($size * 0.04), [float]($size * 0.04), [float]($size * 0.92), [float]($size * 0.92))
    
    # Pearl glow in center
    $pX = [int]($size * 0.22)
    $pW = [int]($size * 0.56)
    $pRect = New-Object System.Drawing.Rectangle $pX, $pX, $pW, $pW
    $w1 = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
    $w2 = [System.Drawing.Color]::FromArgb(255, 224, 231, 255)
    $brushP = New-Object System.Drawing.Drawing2D.LinearGradientBrush $pRect, $w1, $w2, 45.0
    $g.FillEllipse($brushP, $pRect)
    
    # Text 'C' in purple/gold
    $fontSize = [float]($size * 0.34)
    $style = [System.Drawing.FontStyle]::Bold
    $font = New-Object System.Drawing.Font("Georgia", $fontSize, $style)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 79, 70, 229))
    $rectF = New-Object System.Drawing.RectangleF 0, 0, $size, $size
    $g.DrawString("C", $font, $textBrush, $rectF, $format)
    
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Generate-Icon 192 "d:\OneDrive\Desktop\64 Learning\public\icon-192.png"
Generate-Icon 512 "d:\OneDrive\Desktop\64 Learning\public\icon-512.png"
Write-Host "Icons generated successfully"
