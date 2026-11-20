# =========================================================================
#  EFA - Script de construction du site
#  Assemble les pages de src/pages avec les gabarits de src/partials
#  et produit le site pret a publier dans le dossier dist/.
#
#  Utilisation (PowerShell, depuis ce dossier) :
#     .\build.ps1
#     .\build.ps1 -SiteUrl "https://www.mon-domaine.sn"   (une fois le domaine connu :
#                                                         ajoute les URL canoniques et sitemap.xml)
# =========================================================================
param([string]$SiteUrl = "")

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$src = Join-Path $root "src"
$dist = Join-Path $root "dist"
$utf8 = New-Object System.Text.UTF8Encoding $false
$version = Get-Date -Format "yyyyMMddHHmm"
$SiteUrl = $SiteUrl.TrimEnd("/")

function Read-Utf8([string]$path) { return [System.IO.File]::ReadAllText($path, $utf8) }
function Write-Utf8([string]$path, [string]$text) { [System.IO.File]::WriteAllText($path, $text, $utf8) }
function Format-Attr([string]$s) { return $s.Replace("&", "&amp;").Replace('"', "&quot;").Replace("<", "&lt;") }

Write-Host "Construction du site EFA..." -ForegroundColor Cyan

# 1. Dossier de sortie propre
if (Test-Path $dist) {
  # Un fichier ouvert (ex. par le serveur local) peut resister : on continue en l'ecrasant.
  Get-ChildItem $dist -Recurse -Force -File | ForEach-Object { try { Remove-Item $_.FullName -Force -ErrorAction Stop } catch {} }
}
foreach ($d in @($dist, (Join-Path $dist "assets"), (Join-Path $dist "data"))) {
  if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d | Out-Null }
}

# 2. Copie des ressources
Copy-Item (Join-Path $src "assets\*") (Join-Path $dist "assets") -Recurse -Force
Copy-Item (Join-Path $src "data\*") (Join-Path $dist "data") -Recurse -Force
Get-ChildItem (Join-Path $src "static") -Force | ForEach-Object { Copy-Item $_.FullName $dist -Force }

# 3. Gabarits
$head = Read-Utf8 (Join-Path $src "partials\head.html")
$header = Read-Utf8 (Join-Path $src "partials\header.html")
$footer = Read-Utf8 (Join-Path $src "partials\footer.html")

# 4. Pages
$pages = Get-ChildItem (Join-Path $src "pages") -Filter "*.html"
$urls = @()
foreach ($p in $pages) {
  $raw = Read-Utf8 $p.FullName
  $m = [regex]::Match($raw, "^\s*<!--(.*?)-->", [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $m.Success) { throw "En-tete de page manquant dans $($p.Name)" }
  $meta = @{}
  foreach ($line in ($m.Groups[1].Value -split "`r?`n")) {
    $kv = [regex]::Match($line, "^\s*([a-z]+)\s*:\s*(.+?)\s*$")
    if ($kv.Success) { $meta[$kv.Groups[1].Value] = $kv.Groups[2].Value }
  }
  $body = $raw.Substring($m.Index + $m.Length).Trim()

  $robots = if ($meta.ContainsKey("robots")) { $meta["robots"] } else { "index, follow" }
  $pagePath = if ($p.Name -eq "index.html") { "" } else { $p.Name }
  $canonical = ""
  $ogImage = "assets/img/galerie/academie-facade-entree-joueurs.webp"
  if ($SiteUrl) {
    $canonical = '<link rel="canonical" href="' + $SiteUrl + "/" + $pagePath + '">'
    $ogImage = $SiteUrl + "/" + $ogImage
    if ($robots -notmatch "noindex" -and $p.Name -ne "article.html") { $urls += ($SiteUrl + "/" + $pagePath) }
  }

  $h = $head.Replace("{{TITLE}}", (Format-Attr $meta["title"])).
             Replace("{{DESCRIPTION}}", (Format-Attr $meta["description"])).
             Replace("{{PAGE}}", $meta["page"]).
             Replace("{{ROBOTS}}", $robots).
             Replace("{{CANONICAL}}", $canonical).
             Replace("{{OGIMAGE}}", $ogImage).
             Replace("{{VERSION}}", $version)
  $f = $footer.Replace("{{VERSION}}", $version)
  $html = $h + $header + $body + "`n" + $f
  Write-Utf8 (Join-Path $dist $p.Name) $html
  Write-Host ("  - " + $p.Name)
}

# 5. Sitemap (seulement si le domaine est connu)
if ($SiteUrl) {
  $today = Get-Date -Format "yyyy-MM-dd"
  $xml = '<?xml version="1.0" encoding="UTF-8"?>' + "`n" + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "`n"
  foreach ($u in $urls) { $xml += "  <url><loc>$u</loc><lastmod>$today</lastmod></url>`n" }
  $xml += "</urlset>`n"
  Write-Utf8 (Join-Path $dist "sitemap.xml") $xml
  Write-Utf8 (Join-Path $dist "robots.txt") ("User-agent: *`nAllow: /`nSitemap: $SiteUrl/sitemap.xml`n")
  Write-Host "  - sitemap.xml"
} else {
  Write-Host "  (sitemap.xml non genere : relancer avec -SiteUrl une fois le domaine connu)" -ForegroundColor Yellow
}

Write-Host ("Termine : " + $pages.Count + " pages dans " + $dist) -ForegroundColor Green
