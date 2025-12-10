#!/bin/bash

# Configurações
REPO_URL="https://coaudweb:${GITHUB_TOKEN}@github.com/coaudweb/Painel-teste.git"
BRANCH="main"

# Configurar git
git config --global user.email "manus-bot@manus.im"
git config --global user.name "Manus Bot"

# Inicializar repositório se não existir
if [ ! -d ".git" ]; then
  git init
  git branch -M $BRANCH
fi

# Adicionar arquivos
git add .

# Commit
git commit -m "Deploy automático via Manus"

# Adicionar remote (ou atualizar se já existir)
if git remote | grep -q "origin"; then
  git remote set-url origin $REPO_URL
else
  git remote add origin $REPO_URL
fi

# Push
echo "Enviando para o GitHub..."
git push -u origin $BRANCH --force

echo "Deploy concluído com sucesso!"
