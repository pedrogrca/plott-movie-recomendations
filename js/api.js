const API_KEY = 'f44f539a1e5b6540f36bb70ccfc13c79';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 


let selectedMovies = []; 

document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.getElementById("movie-search");
    const suggestionsList = document.getElementById("suggestions-list");
    const placeholders = document.querySelectorAll(".poster-placeholder");

    searchInput.addEventListener("input", async (event) => {
        const query = event.target.value.trim();

        if (query.length < 2) {
            suggestionsList.style.display = "none";
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`);
            const data = await response.json();
            const movies = data.results.slice(0, 5); 

            suggestionsList.innerHTML = "";

            if (movies.length > 0) {
                movies.forEach(movie => {
                    const li = document.createElement("li");
                    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "Ano desconhecido";
                    li.innerHTML = `<strong>${movie.title}</strong> (${releaseYear})`;
                    
                    li.style.padding = "10px 15px";
                    li.style.cursor = "pointer";
                    li.style.color = "#d8dfe4";
                    li.style.borderBottom = "1px solid #445566";
                    li.onmouseover = () => li.style.backgroundColor = "#24303c";
                    li.onmouseout = () => li.style.backgroundColor = "transparent";
                    li.addEventListener("click", () => {
                        addMovieToGrid(movie);
                    });

                    suggestionsList.appendChild(li);
                });
                
                suggestionsList.style.display = "block";
            } else {
                suggestionsList.style.display = "none";
            }

        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    });


function addMovieToGrid(movie) {
        if (selectedMovies.length >= 4) {
            alert("Você já selecionou o máximo de 4 filmes!");
            return;
        }

        const alreadyAdded = selectedMovies.find(m => m.id === movie.id);
        if (alreadyAdded) {
            alert("Você já adicionou esse filme!");
            return;
        }

        selectedMovies.push(movie);
        searchInput.value = "";
        suggestionsList.style.display = "none";
        updateGrid();
    }

    function removeMovie(movieId) {
        selectedMovies = selectedMovies.filter(m => m.id !== movieId);
        updateGrid();
    }

    function updateGrid() {
        placeholders.forEach((box, index) => {
            const movie = selectedMovies[index];
            
            if (movie) {
                if (movie.poster_path) {
                    box.innerHTML = `<img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; transition: opacity 0.2s;">`;
                } else {
                    box.innerHTML = `<span style="font-size: 14px; text-align: center; padding: 10px;">${movie.title}</span>`;
                }
                
                box.style.border = "none";
                box.style.cursor = "pointer"; 
                box.title = "Clique para remover";
                box.onmouseover = () => box.style.opacity = "0.7";
                box.onmouseout = () => box.style.opacity = "1";
                box.onclick = () => removeMovie(movie.id);

            } else {
                box.innerHTML = "+";
                box.style.border = "2px dashed #445566";
                box.style.cursor = "default";
                box.style.opacity = "1";
                box.title = "";
                box.onmouseover = null;
                box.onmouseout = null;
                box.onclick = null;
            }
        });
    }
});