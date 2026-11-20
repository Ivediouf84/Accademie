# =========================================================================
#  EFA - Petit serveur local pour previsualiser le site (dossier dist/)
#  Utilisation :  .\serve.ps1            puis ouvrir http://localhost:8080
#                 .\serve.ps1 -Port 9000
#  Arreter : Ctrl + C
# =========================================================================
param([int]$Port = 8080, [string]$Root = (Join-Path $PSScriptRoot "dist"))

$types = @{
  ".html" = "text/html; charset=utf-8"; ".css" = "text/css; charset=utf-8"; ".js" = "application/javascript; charset=utf-8"
  ".json" = "application/json"; ".svg" = "image/svg+xml"; ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"; ".pdf" = "application/pdf"; ".mp4" = "video/mp4"; ".webmanifest" = "application/manifest+json"
  ".txt" = "text/plain; charset=utf-8"; ".xml" = "application/xml"; ".ico" = "image/x-icon"
}
$rootFull = [System.IO.Path]::GetFullPath($Root)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Site EFA disponible sur http://localhost:$Port/  (Ctrl+C pour arreter)" -ForegroundColor Green
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
    if ($path -eq "" -or $path.EndsWith("/")) { $path += "index.html" }
    $file = [System.IO.Path]::GetFullPath((Join-Path $rootFull $path))
    $res = $ctx.Response
    if (-not $file.StartsWith($rootFull) -or -not (Test-Path $file -PathType Leaf)) {
      $res.StatusCode = 404
      $file = Join-Path $rootFull "404.html"
    }
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
    $res.Headers.Add("Cache-Control", "no-cache")
    try {
      # Lecture sans verrouiller le fichier (permet de reconstruire le site serveur allume)
      $fs = New-Object System.IO.FileStream($file, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, ([System.IO.FileShare]::ReadWrite -bor [System.IO.FileShare]::Delete))
      $bytes = New-Object byte[] $fs.Length
      [void]$fs.Read($bytes, 0, $bytes.Length)
      $fs.Dispose()
      $res.ContentLength64 = $bytes.Length
      if ($ctx.Request.HttpMethod -ne "HEAD") { $res.OutputStream.Write($bytes, 0, $bytes.Length) }
    } catch { Write-Host ("Erreur : " + $_.Exception.Message) }
    finally { try { $res.OutputStream.Close() } catch {} }
  }
} finally { $listener.Stop() }
