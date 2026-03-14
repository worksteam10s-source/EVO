# Copy images from old project to new public folder
# Windows PowerShell script

$source = "GradProject-main\Pics\*"
$destination = "public\Pics\"

# Create destination folder if it doesn't exist
if (!(Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination -Force
}

# Copy all image files
Copy-Item -Path $source -Destination $destination -Filter *.png -Recurse -Force
Copy-Item -Path $source -Destination $destination -Filter *.jpg -Recurse -Force
Copy-Item -Path $source -Destination $destination -Filter *.jpeg -Recurse -Force
Copy-Item -Path $source -Destination $destination -Filter *.gif -Recurse -Force
Copy-Item -Path $source -Destination $destination -Filter *.svg -Recurse -Force

Write-Host "Image files copied successfully!"
Get-ChildItem $destination | Select-Object Name
