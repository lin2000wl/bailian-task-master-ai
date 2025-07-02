Write-Host "========================================" -ForegroundColor Green
Write-Host "Bailian Task Master AI - GitHub 推送脚本" -ForegroundColor Green  
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "请确保你已经：" -ForegroundColor Yellow
Write-Host "1. 在 GitHub 上创建了名为 'bailian-task-master-ai' 的仓库" -ForegroundColor Yellow
Write-Host "2. 准备好你的 GitHub 用户名" -ForegroundColor Yellow
Write-Host ""

$username = Read-Host "请输入你的 GitHub 用户名"

Write-Host ""
Write-Host "正在设置远程仓库..." -ForegroundColor Cyan
& "C:\Program Files\Git\bin\git.exe" remote remove origin 2>$null
& "C:\Program Files\Git\bin\git.exe" remote add origin "https://github.com/$username/bailian-task-master-ai.git"

Write-Host ""
Write-Host "正在推送到 GitHub..." -ForegroundColor Cyan
& "C:\Program Files\Git\bin\git.exe" branch -M main
& "C:\Program Files\Git\bin\git.exe" push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "推送完成！" -ForegroundColor Green
Write-Host "你的仓库地址：https://github.com/$username/bailian-task-master-ai" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Read-Host "按 Enter 键退出" 