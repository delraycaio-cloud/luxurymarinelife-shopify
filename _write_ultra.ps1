
$src = "H:\SovereignCloud\Ecosystem_Codebase\luxurymarinelife-shopify\_ultra_shear_v2.html"
$dst1 = "H:\SovereignCloud\Ecosystem_Codebase\luxurymarinelife-shopify\public\ultra-shear.html"
$dst2 = "H:\SovereignCloud\Ecosystem_Codebase\luxurymarinelife-shopify\dist\ultra-shear.html"
Copy-Item $src $dst1 -Force
Copy-Item $src $dst2 -Force
$sz = (Get-Item $dst2).Length
Write-Host "Done. dist/ultra-shear.html = $sz bytes"
