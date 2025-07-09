// Função para calcular a idade atual com base na data de nascimento
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

// Atualiza a idade no elemento com id 'idadeAtual' (deve existir no HTML)
function atualizarIdade() {
  const idadeElemento = document.getElementById("idadeAtual");
  if (idadeElemento) {
    const idade = calcularIdade("1998-04-05"); // Data no formato ISO: YYYY-MM-DD
    idadeElemento.textContent = `${idade} Anos`;
  }
}

// Inicializa scripts após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  atualizarIdade();

  // Navbar toggle smooth scroll fix (para fechar menu ao clicar em link)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        // Fecha o menu colapsado após clicar em link no mobile
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });
});
