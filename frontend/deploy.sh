#!/bin/bash

echo -e "Script para deploy automatizado do Next Business feito em React\n"

echo -e "Deletando build anterior\n"
rm -r ./build

echo "Realizando build da aplicação"
yarn build
echo -e "\nBuild completo!\n"

echo "Iniciando deploy"
aws s3 sync ./build s3://tp1-les1 --delete --profile tp1-les1
if [ $? -eq 0 ]; then
  echo -e "\nDeploy concluído com sucesso!"
else
  echo -e "\nHouve um erro no deploy, revise o log!"
fi