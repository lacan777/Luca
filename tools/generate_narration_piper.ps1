$ErrorActionPreference = "Stop"

$PiperExe = if ($env:PIPER_EXE) { $env:PIPER_EXE } else { "piper.exe" }
$Model = if ($env:PIPER_MODEL) { $env:PIPER_MODEL } else { "voices\es_MX-ald-medium.onnx" }
$OutDir = "public\narration"

if (-not (Test-Path -LiteralPath $OutDir)) {
  New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

$pagesJson = node -e "import('./src/data/pages.js').then(({pages})=>console.log(JSON.stringify(pages.map(({id,narration,title})=>({id,text:narration||title})))))"
$pages = $pagesJson | ConvertFrom-Json

foreach ($page in $pages) {
  $textPath = Join-Path $OutDir "$($page.id).txt"
  $wavPath = Join-Path $OutDir "$($page.id).wav"
  $mp3Path = Join-Path $OutDir "$($page.id).mp3"

  Set-Content -LiteralPath $textPath -Value $page.text -Encoding UTF8
  Get-Content -LiteralPath $textPath -Encoding UTF8 | & $PiperExe --model $Model --output_file $wavPath

  if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    & ffmpeg -y -i $wavPath -codec:a libmp3lame -qscale:a 3 $mp3Path
  }
}
