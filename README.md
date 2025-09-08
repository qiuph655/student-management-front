
# 学生管理システム / Student Management System

本プロジェクトは前後端分離構成です。以下の2つのリポジトリがあります：

- フロントエンド:(https://github.com/qiuph655/student-management-front.git)
- バックエンド:(https://github.com/qiuph655/student-management-backend.git)

## 📌 セットアップ手順 / Setup Instructions

1. **バックエンド**  
   - リポジトリをクローン
   - MySQL 設定を `application.properties` に記載
   - Spring Boot アプリを起動

2. **フロントエンド**  
   - リポジトリをクローン
   - HTML ファイルをブラウザで開く
## プロジェクト概要
本システムは、学生とコースを管理するための Web アプリケーションです。  
ログイン認証、学生情報管理、コース登録、権限管理（管理者／学生）などの機能を実装しました。

## 使用技術
- フロントエンド: HTML / CSS / JavaScript / jQuery / Bootstrap  
- バックエンド: Java (Spring Boot) / MyBatis / MySQL  

## 主な機能
- ユーザー登録・ログイン  
- 学生情報の追加／編集／削除  
- コース管理、選択科目管理  
- 管理者・学生による画面切り替え  

## 動作方法
1. MySQL に必要なテーブルを作成  
2. Spring Boot アプリケーションを起動  
3. ブラウザから `index.html` にアクセス  

## 今後の改善
- テストコード（JUnit）の追加  
- UI/UX の向上  
- クラウド環境へのデプロイ
