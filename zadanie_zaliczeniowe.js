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


// zmienna globalna przechowujaca aktualnie wybrany rok
let wybranyRok = "wszystkie lata";

// zmienna globalna przechowujaca wybrane tagi
let wybranyTag = "wszystkie tagi";


// funkcja czyWszystkieUkryte
// potrzebna aby wyswietlic info o braku rekordow (kafelkow) do wyswietlenia
// tj. spelniajacych kryteria danego filtrowania
function czyWszystkieUkryte() {
    let kafelkiWdokumencie = document.querySelectorAll("ul > li");
    for (let i = 0; i < kafelkiWdokumencie.length; i++) {
	if (kafelkiWdokumencie[i].hidden !== true) {
	    return false;
	}
    }
    return true;
}

// przyjmuje string (tytul z rokiem) i string "slowo"
// i sprawdza czy tytul zawiera slowo
function czyTytulZawieraSlowo(tytulZrokiem, slowo) {
    let tytulBezRoku = getTitle(tytulZrokiem);
    let wszystkieSlowa = tytulBezRoku.toLocaleLowerCase().split(" ");
    let wynik = wszystkieSlowa.includes(slowo);
    return wynik;
}


// zwraca element (ul)
// z podelementami (li)
// kazdy li to div.kafelek, a ten z kolei to 2 divy:
// div.tytul
// div.rok
// funkcja troche dluga (choc chyba w miare klarowna)
// niemniej jednak moznaby sie zastanowic nad skroceniem
// (usuniecie duplikcaji kodu, danie podfunkcji)
function utworzListeKafelkow(tabFilmow) {
    
    // tworzymy liste ktora bedziemy zapelniac elementami
    // ktore beda kafelkami
    let listaKafelkow = document.createElement("ul");
    
    let innyKolor = true;

    // dla kazdego filmu utworzymy element listy
    // w ktorym beda 2 divy z kafelkami
    // i w tych div-ach osobno rok i tytul

    // jesli nie podano roku (wybranyRok === "wszystkie lata") 
    // i nie podano slowa Kluczowego (wybrnyTag === "wszystkie tagi")
    // to wypisz wszystkie normalnie
    if ((wybranyRok === "wszystkie lata") &&
	(wybranyTag == "wszystkie tagi")) {
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
    } else if (wybranyRok !== "wszystkie lata" &&
	       wybranyTag === "wszystkie tagi") { 
	// tu filtrujemy tylko po roku

	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli rok nam sie zgadza (filtrowanie)

	    // tworzymy element listy
	    let eltListy = document.createElement("li");

	    let kafelek = utworzKafelek(tabFilmow[i]);

	    // filtrowanie po roku
	    // getYear() zwraca rok jako string
	    if (wybranyRok !== getYear(tabFilmow[i])) { 
		eltListy.hidden = true;
	    } else { 	
		// zmienamy (naprzemiennie) i 
		// togglujemy kolor tylko dla widocznych kafelkow
		// inaczej moze sie zdarzyc, 
		// ze 2 kafelki pod rzad beda mialy ten sam kolor

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
    } else if (wybranyRok === "wszystkie lata" &&
	       wybranyTag !== "wszystkie tagi") {
	// tu filtrujemy tylko po tagu

	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli rok nam sie zgadza (filtrowanie)

	    // tworzymy element listy
	    let eltListy = document.createElement("li");

	    let kafelek = utworzKafelek(tabFilmow[i]);

	    // filtrowanie po roku
	    if (!czyTytulZawieraSlowo(tabFilmow[i], wybranyTag)) { 
		eltListy.hidden = true;
	    } else { 	
		// zmienamy (naprzemiennie) i 
		// togglujemy kolor tylko dla widocznych kafelkow
		// inaczej moze sie zdarzyc, 
		// ze 2 kafelki pod rzad beda mialy ten sam kolor

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
    } else {
	// tu filtrujemy i po roku i po tagu

	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli rok nam sie zgadza (filtrowanie)

	    // tworzymy element listy
	    let eltListy = document.createElement("li");

	    let kafelek = utworzKafelek(tabFilmow[i]);

	    // filtrowanie po roku
	    // -1 oznacza ze danego tagu/slowa nie ma w tytule filmu
	    if (!czyTytulZawieraSlowo(tabFilmow[i], wybranyTag) ||
	       getYear(tabFilmow[i]) !== wybranyRok) { 
		eltListy.hidden = true;
	    } else { 	
		// zmienamy (naprzemiennie) i 
		// togglujemy kolor tylko dla widocznych kafelkow
		// inaczej moze sie zdarzyc, 
		// ze 2 kafelki pod rzad beda mialy ten sam kolor

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

    return listaKafelkow; 	// zwraca UL kafelkow
}

let listaKafelkow = utworzListeKafelkow(listOfMovies);
output.appendChild(listaKafelkow);
// ponizsze potrzebne aby wyswietlac monit o braku wynikow do wyswietlenia przy filtrowaniu
let infoBrakWynikowDoWyswietlenia = document.createElement("p");
infoBrakWynikowDoWyswietlenia.style.color = "red";
output.appendChild(infoBrakWynikowDoWyswietlenia);

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


function usunListeKafelkow() {
    let listaKafelkow = document.getElementsByTagName("ul")[0]; // jest tylko 1 ul (elt 0) w dokumencie
    listaKafelkow.remove();
}

function filtrujRok() {
    wybranyRok = this.innerHTML;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyIwidoczne();
    wyswietlFilmyIwidoczne();
    
    // sprawdza czy wszystkie kafelki sa ukryte
    // jesli tak wyswietla info
    if (czyWszystkieUkryte()) {
	infoBrakWynikowDoWyswietlenia.innerHTML = "Brak filmow spelniajacych kryteria wyszukiwania" + 
	    "</br>Wybierz inne parametry filtrowania";
    } else {
	infoBrakWynikowDoWyswietlenia.innerHTML = "";
    }
}

let select = document.createElement("select");

// funkcja updateuje (przebudowuje) selecta na podstawie aktualnej zawartosci bazyfilmow
function updateSelectRok() {

    let unikalnePremiery = getUniqueYears(listOfMovies);
    // sortujemy rosnaca
    // (sort robi to inplace wiec nie trzeba tego ponownie przypisywac)
    unikalnePremiery.sort((a, b) => parseInt(a) - parseInt(b));
    
    // dodamy opje do selekta typu "wszystkie lata"
    unikalnePremiery.unshift("wszystkie lata"); // dodajemy z przodu listy

    // usuwamy stare wartosci z select-a
    let ostatniaOpcja = select.lastElementChild;
    while(ostatniaOpcja){
	select.removeChild(ostatniaOpcja);
	ostatniaOpcja = select.lastElementChild;
    }
    
    // zapelniamy select nowymi wartosciami
    for (let i = 0; i < unikalnePremiery.length; i++) {
	let opcja = document.createElement("option");
	opcja.innerHTML = unikalnePremiery[i];
	opcja.onclick = filtrujRok;
	if (opcja.innerHTML === wybranyRok){
	    opcja.selected = true;
	}
	select.appendChild(opcja);
    }
    
}

updateSelectRok();


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
    
    let starePar = document.querySelectorAll("p.liczba-filmow");
    
    if (starePar.length) { 	// jesli sa juz stare paragrafy
	// to podmieniamy ich tresc
	starePar[0].innerHTML = "Liczba wszystkich filmow w bazie: " + 
	    liczbaFilmow;
	starePar[1].innerHTML = "Liczba filmow aktualnie widocznych: " +
	    liczbaWidocznych;
    } else { 			// w przeciwnym wypadku tworzymy je
	// i dodajemy
	let filmy = document.createElement("p");
	filmy.setAttribute("class", "liczba-filmow");
	let widoczne = document.createElement("p");
	widoczne.setAttribute("class", "liczba-filmow");

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

// zwraca tablice slow pisanych malymi literami z 1 tytulu (string bez roku)
// slowa moga sie powtarzac
function getSlowa(tytul) {
    let slowa = tytul.split(" "); // slowa sa oddzielone spacjami
    slowa = slowa.map((slowo) => slowo.toLocaleLowerCase());
    return slowa;
}

// zwraca liste slow (array stringow) z arrayu tytuly
// (array stringow, tj. tytulow bez roku)
// slowa moga sie powtarzac
function zwrocSlowaZtytulow(tytuly) {
    let slowa = [];
    for (let i = 0; i < tytuly.length; i++) {
	let zJednegoTytulu = getSlowa(tytuly[i]);
	for (let j = 0; j < zJednegoTytulu.length; j++) {
	    slowa.push(zJednegoTytulu[j]);
	}
    }
    return slowa;
}

// zwraca liste unikalnych slow (array) 
// z array-u slowa (moze zawierac powtarzajace sie slowa)
function getUniqueWords(slowa) {
    
    let unikalneSlowa = [];

    for (let i = 0; i < slowa.length; i++) {
	if (unikalneSlowa.indexOf(slowa[i]) === -1){
	    unikalneSlowa.push(slowa[i]);
	}
    }

    return unikalneSlowa;
}


// przyjmuje liczbaWyst (integer) i zwraca string
// z wielkoscia, czyli cyfry+litery, np. "12px"
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



// zwraca tabele tabel
// [0] - tabela unikalnych slow posortowanych alfabetycznie
// [1] - tabela wielkosci slow w pixelach w formacie ("12px")
function zwrocUnikSlowaIwielkCzcionek() {
    
    let wszyskieTytuly = listOfMovies.map((film) => getTitle(film));
    let wszystkieSlowaZtytulow = zwrocSlowaZtytulow(wszyskieTytuly);
    let unikalneSlowa = getUniqueWords(wszystkieSlowaZtytulow);

    // nie bylo czy sortowac rosnaco, czy malejaco
    unikalneSlowa = unikalneSlowa.sort((a, b) => a.localeCompare(b));
    
    //liczymy liczbe wystapien slowa
    let liczbWystSlowa = [];

    for (let i = 0; i < unikalneSlowa.length; i++) {
	// tmp - zawiera dane unikalne slowo powtorzone tyle razy 
	// ile wystapilo w tytulach, np. ["ala", "ala", "ala"], czy ["kot"]
	let tmp = wszystkieSlowaZtytulow.filter((slowo) => slowo == unikalneSlowa[i]);
	liczbWystSlowa.push(tmp.length);
    }
    
    // dodamy na poczatku ten tag "wszystkie tagi" do wyswietlanie wszystkich filmow
    // lepiej wygladalby przycisk (tak jak ja to zrobilem przy latach)
    // no ale zadanie to zadanie
    unikalneSlowa.unshift("wszystkie tagi");
    liczbWystSlowa.unshift(4); 	// da to czcionke = 20px
   
    // obliczmy wielkosci czcionek
    let wielkosciCzcionek = liczbWystSlowa.map((wystapienie) => zwrocRozmCzcionki(wystapienie));

    return [unikalneSlowa, wielkosciCzcionek];
}


// Kliknięcie w tag powoduje odfiltrowanie filmów - 
// wyświetlone zostaną tylko te, których tytuł zawiera wskazane słowo
// (pamiętaj o aktualizacji napisu wyświetlającego liczbę widocznych
// filmów). Dodaj również specjalny tag "wszystkie" w celu
// wyświetlenia wszystkich filmów.

// brak danych czy filtrowanie po tagu ma miec efekt
// AND w stosunku do filtrowania po roku?
// na razie dano 2 oddzielne filtrowania, a potem jak cos to to mozna zmienic
function filtrujPoTagu() {

    // usuniecie podswietlenia z tagu
    let listaTagow = document.querySelectorAll("ol > li");
    for (let i = 0; i < listaTagow.length; i++) {
	listaTagow[i].style.backgroundColor = "";
    }
    // wstawienie podswietlenia na aktualnie wybrany tag
    this.style.backgroundColor = "gold";

    wybranyTag = this.innerText;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyIwidoczne();
    wyswietlFilmyIwidoczne();
    
    // sprawdza czy wszystkie kafelki sa ukryte
    // jesli tak wyswietla info
    if (czyWszystkieUkryte()) {
	infoBrakWynikowDoWyswietlenia.innerHTML = "Brak filmow spelniajacych kryteria wyszukiwania" + 
	    "</br>Wybierz inne parametry filtrowania";
    } else {
	infoBrakWynikowDoWyswietlenia.innerHTML = "";
    }

}


// lista w ktorej wypiszemy tagi
// aby uniknac konfliktu z ul (kafelki) uzyjemy ol
let listaSlow = document.createElement("ol");
output.insertBefore(listaSlow, listaKafelkow);

function updateListaTagow() {
    
    let ostatniaOpcja = listaSlow.lastElementChild;
    while(ostatniaOpcja){
	listaSlow.removeChild(ostatniaOpcja);
	ostatniaOpcja = listaSlow.lastElementChild;
    }
    
    let tabeleSlowaWielkosci = zwrocUnikSlowaIwielkCzcionek();
    let unikalneSlowa = tabeleSlowaWielkosci[0];
    let rozmCzcionki = tabeleSlowaWielkosci[1];

    // i teraz for-em wprowadzam inne slowa
    for (let i = 0; i < unikalneSlowa.length; i++) {
	let eltListy = document.createElement("li");
	eltListy.onclick = filtrujPoTagu;
	eltListy.style.fontSize = rozmCzcionki[i];
	// tagowi "wszystkie dla odroznienia damy zielony kolor"
	if (unikalneSlowa[i] == "wszystkie tagi") {
	    eltListy.style.color = "green";
	}
	// zachowujemy podswietlenie tagu ktory byl ostatnio wybrany
	if (unikalneSlowa[i] == wybranyTag){
	    eltListy.style.backgroundColor = "gold";
	}
	eltListy.innerHTML = unikalneSlowa[i];
	listaSlow.appendChild(eltListy);
    }
    
    updateSelectRok();
}


updateListaTagow();



///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 6)                             //
/////////////////////////////////////////////////////////////////////////////// 

// W dokumencie znajduje się przełącznik
// (odpowiednio ostylowany element) pozwalający na włączenie
// "trybu nocnego". Domyślnym trybem jest tryb dzienny
// (elementy mają jasne tło). Włączenie trybu nocnego zmienia
// wyświetlanie elementów (ciemne tło). Ponownie kliknięcie
// przełącznika przywróci tryb dzienny.

// // dodajemy przycisk w html
let imgTrybDzienny = document.createElement("img");
imgTrybDzienny.setAttribute("src", "./sun.svg");
imgTrybDzienny.setAttribute("alt", "Tryb dzienny");

let imgTrybNocny = document.createElement("img");
imgTrybNocny.setAttribute("src", "./moon.svg");
imgTrybNocny.setAttribute("alt", "Tryb nocny");
let parTrybNocny = document.createElement("p");
// do zastanowienia czy by wiecej nie ostylowac w css-ie zamiast dodawac puste paragrafy

let przyciskDzienNoc = document.createElement("label");
przyciskDzienNoc.classList.add("switch");
let poleInput = document.createElement("input");
poleInput.type = "checkbox";
let poleSpan = document.createElement("span");
poleSpan.classList.add("slider");
poleSpan.classList.add("round");
przyciskDzienNoc.appendChild(poleInput);
przyciskDzienNoc.appendChild(poleSpan);

function zmienTryb() {
    
    let noc = poleInput.checked; // jesli zaznaczony checkbox (true) to tryb nocny
    if (noc){
	let cialo = document.getElementsByTagName("body")[0];
	cialo.classList.add("tryb_nocny");
	// ciemne tlo elementow bedzie stanowic
	// szare tlo dokumentu i przeziernosc (opacity) kafelkow
	// (patrz plik: styles.css)
    } else {
	let cialo = document.getElementsByTagName("body")[0];
	cialo.classList.remove("tryb_nocny");
    }

}

przyciskDzienNoc.onclick = zmienTryb;

output.prepend(imgTrybDzienny, przyciskDzienNoc, imgTrybNocny, parTrybNocny);


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 7)                             //
///////////////////////////////////////////////////////////////////////////////

// Dwa przyciski pozwalające na sortowanie filmów - alfabetycznie oraz po roku premiery. 
// Spróbuj pozwolić na sortowanie rosnąco (po pierwszym naciśnięciu przycisku) i malejąco
// (po drugim naciśnięciu przycisku).

// zmnienia przeslany array (lista filmow)
let tytulRosnaco = true;

// funkcja sortujPoTytule zmienia w miejscu listOfMovies
function sortujPoTytule() {

    if (tytulRosnaco) {
	listOfMovies.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
	tytulRosnaco = !tytulRosnaco;
	
	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku aby uzytkownik wiedzial co i jak
	przyciskSortujPoTytule.value = "Sortuj po tytule (desc)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyIwidoczne();
	wyswietlFilmyIwidoczne();

    } else {
	listOfMovies.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
	tytulRosnaco = !tytulRosnaco;

	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku aby uzytkownik wiedzial co i jak
	przyciskSortujPoTytule.value = "Sortuj po tytule (asc)";

	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyIwidoczne();
	wyswietlFilmyIwidoczne();
    }

    // aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
    ostatnioSortowanePo = "tytul";
}

let rokRosnaco = true;

// funkcja sortujPoRoku zmienia w miejscu listOfMovies
function sortujPoRoku() {
    
    if (rokRosnaco) {
	// getYear() zwraca rok jako string (np. "1998")
	listOfMovies.sort((a, b) => parseInt(getYear(a)) - parseInt(getYear(b)));
	rokRosnaco = !rokRosnaco;
	
	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku aby uzytkownik wiedzial co i jak
	przyciskSortujPoRoku.value = "Sortuj po roku (desc)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyIwidoczne();
	wyswietlFilmyIwidoczne();
	

    } else {
	listOfMovies.sort((a, b) => parseInt(getYear(b)) - parseInt(getYear(a)));
	rokRosnaco = !rokRosnaco;

	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku aby uzytkownik wiedzial co i jak
	przyciskSortujPoRoku.value = "Sortuj po roku (desc)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyIwidoczne();
	wyswietlFilmyIwidoczne();

    }
    // aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
    ostatnioSortowanePo = "rok";
}

// poczatkow pusty string, a potem zmiana na "rok" lub "tytul"
// aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
let ostatnioSortowanePo = "";

let przyciskSortujPoTytule = document.createElement("input");
przyciskSortujPoTytule.setAttribute("type", "button");
przyciskSortujPoTytule.value = "Sortuj po tytule (asc)";
przyciskSortujPoTytule.onclick = sortujPoTytule;

let przyciskSortujPoRoku = document.createElement("input");
przyciskSortujPoRoku.setAttribute("type", "button");
// po uruchomieniu strony bedzie tylko sortuj po roku
przyciskSortujPoRoku.value = "Sortuj po roku (asc)";
przyciskSortujPoRoku.onclick = sortujPoRoku;

output.insertBefore(przyciskSortujPoTytule, listaSlow);
output.insertBefore(przyciskSortujPoRoku, listaSlow);


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 8)                             //
///////////////////////////////////////////////////////////////////////////////

// Stwórz formularz z dwoma polami (rok i nazwa filmu) 
// umożliwiającymi dodanie nowego filmu i dodanie do go obecnej
// listy filmów. Formularz powinien mieć walidacje uniemożliwiającą
// wysłanie pustego formularza oraz komunikat po poprawnym dodaniu
// filmu do listy. Po dodaniu filmu sekcja wyświetlająca liczbę
// filmów powinna zostać zaktualizowana. Upewnij się że wszystkie
// funkcjonalności działają również dla nowo dodanego filmu.



let parWalidacjaDodanegoFilmu = document.createElement("p");
parWalidacjaDodanegoFilmu.style.color = "red";

let poleDodajRok = document.createElement("input");
poleDodajRok.setAttribute("type", "text");
poleDodajRok.setAttribute("placeholder", "Dodaj rok (max. 4 znaki)");
poleDodajRok.setAttribute("size", "20");
poleDodajRok.setAttribute("maxlength", "4"); 


output.insertBefore(parWalidacjaDodanegoFilmu, listaSlow);

output.insertBefore(poleDodajRok, listaSlow);


let poleDodajTytul = document.createElement("input");
poleDodajTytul.setAttribute("type", "text");
poleDodajTytul.setAttribute("placeholder", "Dodaj tytul (max. 50 znakow)");
poleDodajTytul.setAttribute("size", "50");
poleDodajTytul.setAttribute("maxlength", "50"); 

function czyCzteryCyfry(tekst) {
    let czySameCyfry = true;
    for (let i = 0; i < tekst.length; i++) {
	if (tekst[i] >= "0" && tekst[i] <= "9") {
	    // nie rob nic (odpowiedz juz jest true)
	} else {
	    return false;
	}
    }
    return czySameCyfry;
}

// przyjmuje 2 stringi tytul i rok i sprawdza czy film jest juz w bazie filmow
function czyFilmJestWbazie(tytul, rok) {

    let czyWbazie = false;
    
    let pelenTytul = tytul + " (" + rok + ")";
   
    for (let i = 0; i < listOfMovies.length; i++) {
	if(listOfMovies[i].toLocaleLowerCase() === pelenTytul.toLocaleLowerCase()) {
	    return true;
	}
    }

    return czyWbazie;
}

function weryfikujFilm() {
    
    let czyOk = true;

    // + 1900 bo:
    // https://www.tutorialspoint.com/javascript/date_getyear.htm
    let aktualny_rok = new Date().getYear() + 1900;
    // wg. https://en.wikipedia.org/wiki/Film najstarszy znany film pochodzi z 1888
    
    // dodanie koloru czerwonego do czcionki z ostrzezeniem
    parWalidacjaDodanegoFilmu.style.color = "red";

    if (poleDodajTytul.value === "") {
	parWalidacjaDodanegoFilmu.innerHTML = "Pole 'dodaj tytul filmu' nie moze byc puste!";
	czyOk = false;
    }
    if (poleDodajRok.value === "") {
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' nie moze byc puste!";
	czyOk = false;
    } else if (!czyCzteryCyfry(poleDodajRok.value)) {
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' musi zawierac 4 cyfry";
	czyOk = false;
    } else if (poleDodajRok.value < 1888 || 
	       poleDodajRok.value > aktualny_rok) {
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' musi zawierac wartosc" +
	    "  pomiedzy rokiem 1888 a rokiem bierzacym";
	czyOk = false;
    } else if (czyFilmJestWbazie(poleDodajTytul.value, poleDodajRok.value)) {
	parWalidacjaDodanegoFilmu.innerHTML = "Podany film znajduje sie juz w bazie";
	czyOk = false;
    }
    return czyOk;
}



function dodajFilm() {
    
    parWalidacjaDodanegoFilmu.innerHTML = ""; // resetowanie pola jesli tam wczesniej bylo cos wpisane
    
    let filmDoDodania = "";
    
    // weryfikacja dodanego filmu
    if (weryfikujFilm() && ostatnioSortowanePo === ""){
	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// wyswietlenie wiadomosci o dodaniu filmu
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyslnie dodawano film do " +
	    "konca listy filmow";
	parWalidacjaDodanegoFilmu.style.color = "green";
	

	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyIwidoczne();
	wyswietlFilmyIwidoczne();
	
	// update listyTagow
	updateListaTagow();
    } else if (weryfikujFilm() && ostatnioSortowanePo === "rok") {
	rokRosnaco = !rokRosnaco; // zamieniamy do stanu poprzedniego sortowania

	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// sortujemy po tytule
	// (tu jest usuwanie i tworzenie listy kafelkow, update liczby filmow i filmow widocznych)
	sortujPoRoku();

	// updateujemy tagi
	updateListaTagow();

	// wyswietlenie wiadomosci o dodaniu filmu
	// tu film zostal wstawiony we wlasciwe miejsce a nie na koniec kafelkow
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyslnie dodawano film do listy.";
	parWalidacjaDodanegoFilmu.style.color = "green";
	    
	} else if (weryfikujFilm() && ostatnioSortowanePo === "tytul"){

	tytulRosnaco = !tytulRosnaco; // zamieniamy do stanu poprzedniego sortowania

	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// sortujemy po tytule
	// (tu jest usuwanie i tworzenie listy kafelkow, update liczby filmow i filmow widocznych)
	sortujPoTytule();
	    
	// updateujemy tagi
	updateListaTagow();

	// wyswietlenie wiadomosci o dodaniu filmu
	// tu film zostal wstawiony we wlasciwe miejsce a nie na koniec kafelkow
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyslnie dodawano film do listy.";
	parWalidacjaDodanegoFilmu.style.color = "green";
	    
	}
    
    
}

let przyciskDodajFilm = document.createElement("input");
przyciskDodajFilm.setAttribute("type", "button");
przyciskDodajFilm.value = "Dodaj Nowy Film";
przyciskDodajFilm.onclick = dodajFilm;


output.insertBefore(poleDodajTytul, poleDodajRok);
output.insertBefore(przyciskDodajFilm, listaSlow);

