<#
.SYNOPSIS
  Zero-dependency lightweight HTTP Web Server for Smart Canteen Management System.
  Uses Windows .NET HttpListener (no node/npm installation required).
#>

$port = 3000
$prefix = "http://localhost:$port/"
$publicDir = Join-Path $PSScriptRoot "public"

if (-not (Test-Path $publicDir)) {
    Write-Error "Public directory not found at $publicDir"
    exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Failed to start listener on $prefix : $_" -ForegroundColor Red
    Write-Host "Trying fallback port 3001..."
    $port = 3001
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

Write-Host "============================================================" -ForegroundColor Green
Write-Host "  SMART CANTEEN MANAGEMENT SYSTEM - LOCAL WEB SERVER" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  URL: $prefix" -ForegroundColor Yellow
Write-Host "  Serving from: $publicDir"
Write-Host "  Press Ctrl+C to stop the server at any time."
Write-Host "============================================================" -ForegroundColor Green

# Optional: Open default browser automatically
Start-Process $prefix

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
            $urlPath = "/index.html"
        }

        # Normalize path
        $filePath = Join-Path $publicDir ($urlPath.TrimStart('/').Replace('/', '\'))

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # 404 fallback or SPA fallback to index.html
            $indexPath = Join-Path $publicDir "index.html"
            if (Test-Path $indexPath) {
                $bytes = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $err = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
                $response.OutputStream.Write($err, 0, $err.Length)
            }
        }
        $response.OutputStream.Close()
    } catch {
        # Catch and continue on transient errors
    }
}
