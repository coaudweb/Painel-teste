import os
import requests
import json
import sys

# Configurações
REPO_OWNER = "coaudweb"
REPO_NAME = "Painel-teste"
TOKEN = os.environ.get("GITHUB_TOKEN")

if not TOKEN:
    print("Erro: GITHUB_TOKEN não encontrado no ambiente.")
    sys.exit(1)

HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def check_runs():
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/actions/runs"
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        data = response.json()
        
        if not data.get("workflow_runs"):
            print("Nenhuma execução de workflow encontrada.")
            return

        # Pegar a execução mais recente
        latest_run = data["workflow_runs"][0]
        
        print(f"--- Última Execução de Deploy ---")
        print(f"ID: {latest_run['id']}")
        print(f"Nome: {latest_run['name']}")
        print(f"Status: {latest_run['status']}")
        print(f"Conclusão: {latest_run['conclusion']}")
        print(f"Branch: {latest_run['head_branch']}")
        print(f"Commit: {latest_run['head_commit']['message']}")
        print(f"Criado em: {latest_run['created_at']}")
        print(f"Atualizado em: {latest_run['updated_at']}")
        print(f"URL do Log: {latest_run['html_url']}")
        
        if latest_run['status'] == 'completed' and latest_run['conclusion'] == 'success':
            print("\n✅ SUCESSO: O deploy foi concluído com êxito!")
        elif latest_run['status'] == 'completed' and latest_run['conclusion'] == 'failure':
            print("\n❌ FALHA: O deploy falhou. Verifique os logs no GitHub.")
        elif latest_run['status'] in ['queued', 'in_progress']:
            print("\n⏳ EM ANDAMENTO: O deploy ainda está sendo processado.")
        else:
            print(f"\n⚠️ STATUS: {latest_run['status']} - {latest_run['conclusion']}")

    except requests.exceptions.RequestException as e:
        print(f"Erro ao conectar com a API do GitHub: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Detalhes: {e.response.text}")

if __name__ == "__main__":
    check_runs()
