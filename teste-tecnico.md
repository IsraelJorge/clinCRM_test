# Teste Técnico ClinCRM - Júnior

## Introdução

Bem-vindo ao teste técnico para a posição de Desenvolvedor Júnior na ClinCRM. Neste teste, você demonstrará suas habilidades em React com TypeScript, utilizando as bibliotecas React Hook Form, Zod, Shadcn e Tailwind CSS. O objetivo é desenvolver uma aplicação simples que permita o gerenciamento de contas a receber e visualize as receitas através de um gráfico.

## Descrição do Projeto

Você deverá desenvolver uma aplicação que realiza o CRUD (Create, Read, Update, Delete) da entidade "Conta a Receber" e uma tela para visualização de receitas através de gráficos.

### Entidade: Conta a Receber

A entidade "Conta a Receber" deve conter os seguintes campos:

- **id**: Identificador único da conta (string)
- **nome do paciente**: Nome do paciente (string)
- **operação feita**: Descrição da operação realizada (string)
- **valor**: Valor da conta (number)
- **forma de pagamento**: Forma de pagamento utilizada (string)
- **data de emissão**: Data de emissão da conta (date)

## Requisitos

### Tecnologias Utilizadas

- **React** com **TypeScript**
- **React Hook Form** para manipulação de formulários
- **Zod** para validação de dados
- **Shadcn** para extensão de componentes pré prontos
- **Tailwind CSS** para estilização

### Funcionalidades

1. **Tela de CRUD**

   - **Adicionar Conta**: Formulário para adicionar uma nova conta a receber.
   - **Listar Contas**: Exibição de uma lista com todas as contas a receber.
   - **Editar Conta**: Funcionalidade para editar uma conta existente.
   - **Deletar Conta**: Funcionalidade para deletar uma conta existente.

2. **Tela de Gráficos**
   - **Visualização de Receitas**: Gráfico que mostra as receitas das contas a receber.
   - **Filtragem por Data**: Funcionalidade para filtrar as receitas por intervalo de datas.

## Instruções de Desenvolvimento

1. **Configuração do Projeto**

   - Inicialize um novo projeto React com TypeScript.
   - Configure o Tailwind CSS para estilização.
   - Instale e configure o React Hook Form e o Zod para validação de formulários.
   - Utilize Shadcn para componentes adicionais conforme necessário.

2. **Implementação do CRUD**

   - Crie componentes de formulário utilizando React Hook Form e Zod para adicionar e editar contas.
   - Implemente a listagem de contas com opções para editar e deletar.
   - Utilize Tailwind CSS para estilização dos componentes.

3. **Implementação do Gráfico**

   - Escolha uma biblioteca de gráficos de sua preferência (por exemplo, Chart.js, Recharts) para visualização das receitas.
   - Crie a funcionalidade para filtrar as receitas por intervalo de datas.

4. **Validação e Testes**

   - Garanta que todos os campos do formulário estejam devidamente validados utilizando Zod.
   - Teste todas as funcionalidades para garantir que o CRUD e a filtragem dos gráficos estejam funcionando corretamente.

5. **Deploy**
   - Faça o deploy do projeto no Firebase Hosting.
   - Inclua no README.md as instruções sobre como configurar e rodar o projeto localmente, além do link para acessar o projeto deployado no Firebase.

## Entrega

Ao finalizar o teste, envie o código-fonte do projeto em um repositório público no GitHub. Inclua um arquivo README.md com instruções claras sobre como configurar e rodar o projeto localmente. Além disso, forneça o link para o projeto deployado no Firebase Hosting.

## Critérios de Avaliação

- **Funcionalidade**: Todas as funcionalidades descritas devem estar implementadas corretamente.
- **Código Limpo**: Código bem organizado e seguindo boas práticas de desenvolvimento.
- **Estilização**: Uso adequado do Tailwind CSS e shadcn para criar uma interface agradável e responsiva.
- **Validação**: Implementação correta da validação de formulários com Zod.
- **Documentação**: Instruções claras e detalhadas no arquivo README.md.
- **Deploy**: Projeto devidamente deployado no Firebase Hosting e acessível via link fornecido.

Boa sorte!
