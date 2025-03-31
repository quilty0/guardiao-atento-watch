# Guardião Atento Watch 🏥⌚

Aplicativo de monitoramento para smartwatch focado no acompanhamento de idosos e pacientes que necessitam de cuidados especiais.

## 🌟 Funcionalidades

### Monitoramento de Sinais Vitais
- Batimentos cardíacos com animação de pulso
- Pressão arterial com efeito de gota
- Temperatura com efeito suave
- Oxigenação com ícone de monitor cardíaco animado

### Sistema de Emergência
- Botão SOS com confirmação
- Lista de contatos de emergência
- Modal de confirmação para evitar acionamentos acidentais
- Sistema automático de chamadas de emergência

### Detector de Quedas
- Monitoramento automático a cada 40 segundos
- Sistema de vibração inteligente para diferentes situações:
  - Vibração curta para ativação do sensor
  - Vibração tripla para alerta de queda
  - Vibração longa para início da chamada
  - Vibração dupla para finalização
- Contagem regressiva de 20 segundos para resposta
- Chamada automática de emergência se não houver resposta
- Status visual do sensor com indicador de monitoramento
- Interface com animações e feedback visual aprimorado
- Envio automático de localização durante emergências

### Monitoramento do Sono
- Registro de início e fim do sono
- Cálculo automático da duração
- Avaliação da qualidade do sono
- Contagem de movimentos durante o sono

### Lembretes de Medicação
- Lista de medicamentos
- Confirmação de medicamentos tomados
- Interface intuitiva e fácil de usar
- Modal de confirmação para cada medicamento

## 🛠️ Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vercel (Deploy)

## 🚀 Como Executar

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/quilty0/guardiao-atento-watch.git
\`\`\`

2. Instale as dependências:
\`\`\`bash
yarn install
\`\`\`

3. Execute o projeto:
\`\`\`bash
yarn dev
\`\`\`

4. Acesse http://localhost:3000

## 🌐 Deploy

O projeto está disponível em: [guardiao-atento-watch-bkz1.vercel.app](https://guardiao-atento-watch-bkz1.vercel.app)

## 🎨 Interface

A interface foi desenvolvida pensando em:
- Alta legibilidade
- Botões grandes e fáceis de tocar
- Cores intuitivas para cada tipo de informação
- Feedback visual claro para todas as ações
- Animações suaves para melhor experiência
- Ícones e emojis para melhor compreensão
- Indicadores de status animados

## 🔒 Segurança

- Confirmação dupla para ações críticas
- Sistema de fallback para alertas de emergência
- Monitoramento constante de quedas
- Backup de contatos de emergência
- Sistema automático de chamadas de emergência
- Envio de localização em situações críticas

## 📱 Responsividade

O aplicativo foi otimizado para telas de smartwatch, mas também funciona em:
- Smartphones
- Tablets
- Navegadores desktop 