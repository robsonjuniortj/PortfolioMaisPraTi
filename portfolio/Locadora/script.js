function validationForm() {
  // Exemplo simples de validação
  const codFilm = document.getElementById("codFilm");
  const titleFilm = document.getElementById("titleFilm");
  if (!codFilm.value || !titleFilm.value) {
    alert("Por favor, preencha os campos Código e Título.");
    return false;
  }
  return true;
}

function insert() {
  if (!validationForm()) return;

  const tbody = document.querySelector("tbody#insertRow").parentElement;
  const cod = document.getElementById("codFilm").value;
  const title = document.getElementById("titleFilm").value;
  const director = document.getElementById("directorFilm").value;
  const date = document.getElementById("yearFilm").value;
  const actors = document.getElementById("atoresPrincipal").value;
  const imdb = document.getElementById("notaImdb").value;
  const genre = document.querySelector('input[name="genre"]:checked')?.value || '';

  // Traduzindo valor do gênero para exibir na tabela
  const genresMap = {
    'acao': 'Ação',
    'animacao': 'Animação',
    'romance': 'Romance',
    'suspense': 'Suspense'
  };

  const tr = document.createElement("tr");

  tr.innerHTML = `
    <th scope="row">${cod}</th>
    <td>${title}</td>
    <td>${director}</td>
    <td>${date}</td>
    <td>${genresMap[genre] || genre}</td>
    <td>${actors}</td>
    <td>${imdb}</td>
  `;

  tbody.appendChild(tr);

  // Limpa formulário
  document.forms["register"].reset();

  alert("Filme cadastrado com sucesso!");
}
