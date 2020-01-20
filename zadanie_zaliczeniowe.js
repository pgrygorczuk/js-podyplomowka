///////////////////////////////////////////////////////////////////////////////
//                            zadanie zaliczeniowe                           //
///////////////////////////////////////////////////////////////////////////////
// Zadanie zaliczeniowe
// Na podstawie podanej listy filmów: 
// https://jsbin.com/nosinujixa/edit?js,console 
// stwórz listę kafelków. 

const listOfMovies = [
    'Władca much (1990)',
    'Władca Pierścieni (1978)',
    'Milczenie owiec (1991)',
    'Moja dziewczyna (1991)',
    'Dziewczyna z tatuażem (2011)',
    'Jestem Bogiem (2011)',
    'Jestem legendą (2007)',
    'Matrix (1999)',
    'Zielona mila (1999)',
    '8 Mila (2002)',
    'Uciekająca panna młoda (1999)',
    'Gnijąca panna młoda (2005)',
    'Dzień świra (2002)',
    'Dzień Niepodległości (1996)',
    'Dzień świstaka (1993)',
    'Lista Schindlera (1993)',
    'Czarna lista Hollywood (1991)',
    'Lista klientów (2012)',
    'Teraz albo nigdy (2018)',
    'Niech będzie teraz (2012)',
    'Zabójcze maszyny (2018)',
    'Zabójcza broń (1987)',
    'Znaki (2002)',
    'Znaki na drodze (1969)',
    'Wodne znaki (2013)',
    'Znaki dymne (1998)',
    'Jeden dzień (2011)',
    'Dzień próby (2001)',
    'Dzień z życia blondynki (2014)',
    'Panna Nikt (1996)',
    'Panna Meadows (2014)',
    'Panna Nikt (2010)',
    'Panna Julia (1951)'
];
let tytuly = listOfMovies.map((film) => getTitle(film));


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 1)                             //
///////////////////////////////////////////////////////////////////////////////
// stworz liste kafelkow
// kazdy z kafelkow powinien wyswietlac:
// + rok premiery filmu
// + nazwe filmu

// Rok premiery wytnij z napisu i wyświetlaj w osobnym elemencie
// kafelka. Ostyluj elementy, a co drugiemu kafelkowi nadaj 
// inną klasę, która zmieni mu tło.

// tu bedziemy wszystko wypisywac
let output = document.getElementById("out");

// do punktu 3
let liczbaFilmow = listOfMovies.length;
let liczbaWidocznych = listOfMovies.length;

// ok, to bedziemy potrzebowac wydobyc tytul i rok z filmu
// zwraca tytul jako string
function getTitle(film) {
    let tytul = film.split(" (")[0]; // tniemy po " ("
    return tytul;
}

// zwraca rok jako string
function getYear(film) {
    let rok = film.split(" (")[1]; // tu bedzie z nawiasem zamykajacym
    rok = rok.split(")")[0];	   // a tu wywalamy ten nawias zamykajacy
    return rok;
}


// utworzymy funkcje wypisujaca filmy (tablica listOfMovies)
// do undefined list (lista)
// i zwracajacy ta liste

let lista = document.createElement("ul");

// zwraca element (div z klasa tytul)
// z tytulem wstawionym z jakiegos filmu
function utworzTytul(film) {
    
    let tytul = document.createElement("div");
    tytul.classList.add("tytul");
    tytul.innerHTML = getTitle(film);

    return tytul;
}

// zwraca element (div z klasa rok)
// z rokiem wstawionym z jakiegos filmu
function utworzRok(film) {
    
    let rok = document.createElement("div");
    rok.classList.add("rok");
    rok.innerHTML = getYear(film);
    
    return rok;
}

// zwraca kafelek (div z klasa kafelek)
// w tym divie beda 2 poddivy
// pod-div z klasa tytul
// pod-div z klasa rok
function utworzKafelek(film) {
    let kafelek = document.createElement("div");
    kafelek.classList.add("kafelek");
    
    // dodajemy tytul kafelka
    kafelek.appendChild(utworzTytul(film));
    // dodajemy rok do kafelka
    kafelek.appendChild(utworzRok(film));
    
    return kafelek;
}

// zwraca element (ul)
// z podelementami (li)
// kazdy li to div.kafelek, a ten z kolei to 2 divy:
// div.tytul
// div.rok
function utworzListeKafelkow(tabFilmow, rok = "wszystkie lata",
			     slowoKluczowe = "wszystkie tagi") {
   
    // tworzymy liste ktora bedziemy zapelniac elementami
    // ktore beda kafelkami
    let listaKafelkow = document.createElement("ul");
    
    let innyKolor = true;

    // dla kazdego filmu utworzymy element listy
    // w ktorym beda 2 divy z kafelkami
    // i w tych div-ach osobno rok i tytul

    // jesli nie podano roku i slowa Kluczowego to wypisz wszystkie normalnie
    if ((rok == "wszystkie lata") &&
	(slowoKluczowe == "wszystkie tagi")) {
	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy element listy
	    let eltListy = document.createElement("li");
	    
	    // tworzymy kafelek
	    let kafelek = utworzKafelek(tabFilmow[i]);
	    if (innyKolor) {
		// co drugi bedzie mial inny kolor
		kafelek.classList.add("inny_kolor");
	    }
	    
	    // dodajemy kafelek do eleListy
	    eltListy.appendChild(kafelek);
	    
	    // dodaj eltListy do listyKafelkow
	    listaKafelkow.appendChild(eltListy);
	    
	    // na koniec toggle-ujemy kolor
	    innyKolor = !innyKolor;
	}
    } else { // w przeciwnym przypadku trzeba cos ukryc
	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli rok nam sie zgadza (filtrowanie)
	    // jesli jest podany rok lub slowoKluczowe to po nim filtrujemy
	    if (rok != "wszystkie lata") {   
		
		// tworzymy element listy
		let eltListy = document.createElement("li");

		let kafelek = utworzKafelek(tabFilmow[i]);

		// filtrowanie po roku
		// != bo getYear() zwraca rok jako string
		if (rok != getYear(tabFilmow[i])) { 
		    eltListy.hidden = true;
		} else { 	
		    // zmienamy (naprzemiennie) i 
		    // togglujemy kolor tylko dla widocznych kafelkow

		    if (innyKolor) {
			// co drugi bedzie mial inny kolor
			kafelek.classList.add("inny_kolor");
		    }

		    // toggle-ujemy kolor
		    innyKolor = !innyKolor;
		}

		// dodajemy kafelek do eleListy
		eltListy.appendChild(kafelek);
		
		// dodaj eltListy do listyKafelkow
		listaKafelkow.appendChild(eltListy);

		// a jesli jest slowo kluczowe to po nim
	    } else if (slowoKluczowe != "wszystkie tagi") { 
		// tworzymy element listy
		let eltListy = document.createElement("li");

		let kafelek = utworzKafelek(tabFilmow[i]);

		// filtrowanie po roku
		// != bo getYear() zwraca rok jako string
		if (tytuly[i].toLocaleLowerCase().
		    indexOf(slowoKluczowe) === -1) { 
		    eltListy.hidden = true;
		} else { 	
		    // zmienamy (naprzemiennie) i 
		    // togglujemy kolor tylko dla widocznych kafelkow

		    if (innyKolor) {
			// co drugi bedzie mial inny kolor
			kafelek.classList.add("inny_kolor");
		    }

		    // toggle-ujemy kolor
		    innyKolor = !innyKolor;
		}

		// dodajemy kafelek do eleListy
		eltListy.appendChild(kafelek);
		
		// dodaj eltListy do listyKafelkow
		listaKafelkow.appendChild(eltListy);
		
	    }
	}
	
    }

    return listaKafelkow; 	// zwraca UL kafelkow
}

let listaKafelkow = utworzListeKafelkow(listOfMovies);
output.appendChild(listaKafelkow);


updateFilmyIwidoczne();
wyswietlFilmyIwidoczne();


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 2)                             //
///////////////////////////////////////////////////////////////////////////////
// Na podstawie lat premier filmów stwórz i wypełnij listę <select>. 
// Zadbaj, aby lata nie powtarzał się na niej i 
// były uporządkowane rosnąco. 
// Wybranie roku z listy powinno spowodować przefiltrowanie kafelków -
// widoczne pozostaną jedynie filmy ze wskazanego roku, 
// zaś pozostałe zostaną ukryte.


// hmm, wychodzi na to, ze JavaScript nie ma funkcji unique
// trzeba cokolwiek samemu na kolanie napisac
function getUniqueYears(tabFilmow) {
    
    let unikalneLata = [];

    for (let i = 0; i < listOfMovies.length; i++) {
	let rok = getYear(listOfMovies[i]);
	// tudziez mozna probowac wziac wszystkie lata i zrobic z tego set-a (JS ma chyba sety)
	if (unikalneLata.indexOf(rok) === -1){
	    unikalneLata.push(rok);
	}
    }

    return unikalneLata;
}

let unikalnePremiery = getUniqueYears(listOfMovies);
// sortujemy rosnaca
// (sort robi to inplace wiec nie trzeba tego ponownie przypisywac)
unikalnePremiery.sort((a, b) => parseInt(a) - parseInt(b));

// dodamy opje do selekta typu "wszystkie lata"
unikalnePremiery.unshift("wszystkie lata"); // dodajemy z przodu listy

function usunListeKafelkow() {
    let listaKafelkow = document.getElementsByTagName("ul")[0]; // jest tylko 1 ul (elt 0) w dokumencie
    listaKafelkow.remove();
}

function filtrujRok() {
    let wybrRok = this.innerHTML;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies, wybrRok, "wszystkie tagi"));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyIwidoczne();
    wyswietlFilmyIwidoczne();
}

let select = document.createElement("select");

// zapelniamy select wartosciami
for (let i = 0; i < unikalnePremiery.length; i++) {
    let opcja = document.createElement("option");
    opcja.innerHTML = unikalnePremiery[i];
    opcja.onclick = filtrujRok;
    select.appendChild(opcja);
}

// oprocz selecta
// dodamy tez guzik pokaz wszystkie filmy (aby resetowac)
// mimo, ze tego nie ma w poleceniu
let parWybierzRok = document.createElement("p").innerHTML="Wybierz rok filmu: ";

output.prepend(parWybierzRok, select); 	// aby selecta z filtrowaniem dac wczesniej
// ewentualnie mozna dac firstChild czy cos takiego




///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 3)                             //
///////////////////////////////////////////////////////////////////////////////

// Powyżej listy filmów wyświetl napis mówiący o liczbie wszystkich
// filmów oraz o liczbie aktualnie widocznych (nie ukrytych).


function liczWidoczne() {
    let ileWidocznych = 0;

    // let wszystkieLI = document.getElementsByTagName("li");
    // zastapiono ponizszym bo przy tagach i klinieciu buttona
    // pokaz wszystkie filmy
    // wyswietlalo nieprawidlowa liczbe aktualnie widocznych filmow
    let wszystkieLI = document.querySelectorAll("ul > li");
    
    for (let i = 0; i < wszystkieLI.length; i++) {
	if (!wszystkieLI[i].hidden){
	    ileWidocznych++;
	}
    }
    return ileWidocznych;
}

function updateFilmyIwidoczne() {
    liczbaFilmow = listOfMovies.length;
    liczbaWidocznych = liczWidoczne();
}

function wyswietlFilmyIwidoczne() {
    
    let starePar = document.getElementsByTagName("p");
    
    if (starePar.length) { 	// jesli sa juz stare paragrafy
	// to podmieniamy ich tresc
	starePar[0].innerHTML = "Liczba wszystkich filmow w bazie: " + 
	    liczbaFilmow;
	starePar[1].innerHTML = "Liczba filmow aktualnie widocznych: " +
	    liczbaWidocznych;
    } else { 			// w przeciwnym wypadku tworzymy je
	// i dodajemy
	let filmy = document.createElement("p");
	let widoczne = document.createElement("p");

	filmy.innerHTML = "Liczba wszystkich filmow w bazie: " +
	    liczbaFilmow;
	widoczne.innerHTML = "Liczba filmow aktualnie widocznych: " +
	    liczbaWidocznych;
	
	// wstawienie nowych (zupdate-owanych paragrafow)
	output.prepend(filmy, widoczne);
    }
}


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 5)                             //
///////////////////////////////////////////////////////////////////////////////

// Na podstawie nazw filmów stwórz tzw. chmurę tagów, 
// czyli listę wszystkich słów występujących w liście filmów. 
// Zadbaj, aby dane słowo nie występowało kilka razy na liście
// (wielkie i małe znaki traktuj jednakowo). 
// Słowa uporządkuj alfabetycznie.

// zwraca tablice slow pisanych malymi literami
function getSlowa(tytul) {
    let slowa = tytul.split(" "); // slowa sa oddzielone spacjami
    slowa = slowa.map((slowo) => slowo.toLowerCase());
    return slowa;
}


let slowa = [];
for (let i = 0; i < tytuly.length; i++) {
    let zJednegoTytulu = getSlowa(tytuly[i]);
    for (let j = 0; j < zJednegoTytulu.length; j++) {
	slowa.push(zJednegoTytulu[j]);
    }
}

function getUniqueWords(slowa) {
    
    let unikalneSlowa = [];

    for (let i = 0; i < slowa.length; i++) {
	if (unikalneSlowa.indexOf(slowa[i]) === -1){
	    unikalneSlowa.push(slowa[i]);
	}
    }

    return unikalneSlowa;
}

let unikalneSlowa = getUniqueWords(slowa);
// nie bylo czy sortowac rosnaco, czy malejaco
unikalneSlowa = unikalneSlowa.sort((a, b) => a.localeCompare(b));
let liczbWystSlowa = [];

for (let i = 0; i < unikalneSlowa.length; i++) {
    let tmp = slowa.filter((slowo) => slowo == unikalneSlowa[i]);
    liczbWystSlowa.push(tmp.length);
}

function zwrocRozmCzcionki(liczbaWyst) {
    let wynik = "";

    switch (liczbaWyst) {
    case 1:
	wynik = "8px";
	break;
    case 2:
	wynik = "12px";
	break;
    case 3:
	wynik = "16px";
	break;
    case 4:
	wynik = "20px";
	break;
    default:
        wynik = "24px";	
    }
    return wynik;
}

// dodamy na poczatku ten tag "wszystkie tagi" do wyswietlanie wszystkich filmow
// lepiej wygladalby przycisk (tak jak ja to zrobilem przy latach)
// no ale zadanie to zadanie
unikalneSlowa.unshift("wszystkie tagi");
liczbWystSlowa.unshift(4); 	// da to czcionke = 20px

let rozmCzcionki = liczbWystSlowa.map((wystapienie) => zwrocRozmCzcionki(wystapienie));



// Kliknięcie w tag powoduje odfiltrowanie filmów - 
// wyświetlone zostaną tylko te, których tytuł zawiera wskazane słowo
// (pamiętaj o aktualizacji napisu wyświetlającego liczbę widocznych
// filmów). Dodaj również specjalny tag "wszystkie" w celu
// wyświetlenia wszystkich filmów.

// brak danych czy filtrowanie po tagu ma miec efekt
// AND w stosunku do filtrowania po roku?
// na razie dano 2 oddzielne filtrowania, a potem jak cos to to mozna zmienic
function filtrujPoTagu() {
    let slowo = this.innerText;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies, "wszystkie lata", slowo));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyIwidoczne();
    wyswietlFilmyIwidoczne();
}


let listaSlow = document.createElement("ol");

// i teraz for-em wprowadzam inne slowa
for (let i = 0; i < unikalneSlowa.length; i++) {
    let eltListy = document.createElement("li");
    eltListy.onclick = filtrujPoTagu;
    eltListy.style.fontSize = rozmCzcionki[i];
    // tagowi "wszystkie dla odroznienia damy zielony kolor"
    if (unikalneSlowa[i] == "wszystkie tagi") {
	eltListy.style.color = "green";
    }
    eltListy.innerHTML = unikalneSlowa[i];
    listaSlow.appendChild(eltListy);
}

// umieszczenie listy slow wykrzacza filtrowanie, a moze i cos jeszcze
// uzyc gdzies querySelector() aby byc dokladniejszym
output.insertBefore(listaSlow, listaKafelkow);


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 6)                             //
/////////////////////////////////////////////////////////////////////////////// 

// W dokumencie znajduje się przełącznik
// (odpowiednio ostylowany element) pozwalający na włączenie
// "trybu nocnego". Domyślnym trybem jest tryb dzienny
// (elementy mają jasne tło). Włączenie trybu nocnego zmienia
// wyświetlanie elementów (ciemne tło). Ponownie kliknięcie
// przełącznika przywróci tryb dzienny.
