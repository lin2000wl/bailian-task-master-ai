@echo off
echo ========================================
echo Bailian Task Master AI - GitHub 推送脚本
echo ========================================
echo.

echo 请确保你已经：
echo 1. 在 GitHub 上创建了名为 'bailian-task-master-ai' 的仓库
echo 2. 将下面的命令中的 YOUR_USERNAME 替换为你的 GitHub 用户名
echo.

set /p username=请输入你的 GitHub 用户名: 

echo.
echo 正在设置远程仓库...
"C:\Program Files\Git\bin\git.exe" remote remove origin 2>nul
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/%username%/bailian-task-master-ai.git

echo.
echo 正在推送到 GitHub...
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ========================================
echo 推送完成！
echo 你的仓库地址：https://github.com/%username%/bailian-task-master-ai
echo ========================================
pause 