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
// generalne zalozenie: HTML ma byc goly poza tym divem "out"
let output = document.getElementById("out");

// do punktu 3
let liczbaFilmow = listOfMovies.length;
let liczbaWidocznych = listOfMovies.length;

// ok, bedziemy potrzebowac wydobyc tytul z filmu
// przyjmuje tytul jako string postaci "tytul (rok)"
// zwraca tytul jako string
function getTitle(film) {
    let tytul = film.split(" (")[0]; // tniemy po " ("
    return tytul;
}

// ok, bedziemy potrzebowac wydobyc rok z filmu
// przyjmuje tytul jako string postaci "tytul (rok)"
// zwraca rok jako string
function getYear(film) {
    let rok = film.split(" (")[1]; // tu bedzie z nawiasem zamykajacym
    rok = rok.split(")")[0];	   // a tu wywalamy ten nawias zamykajacy
    return rok;
}


// utworzymy funkcje wypisujaca filmy (tablica listOfMovies)
// do unordered list (lista kafelkow)
// i zwracajacy ta liste kafelkow
let lista = document.createElement("ul");

// podfunkcja do funkcji utworzListekafelkow()
// przyjmuje tytul jako string postaci "tytul (rok)"
// zwraca element (div z klasa tytul)
// z tytulem wstawionym z jakiegos filmu
function utworzTytul(film) {
    
    let tytul = document.createElement("div");
    tytul.classList.add("tytul");
    tytul.innerHTML = getTitle(film);

    return tytul;
}

// podfunkcja do funkcji utworzListekafelkow()
// przyjmuje tytul jako string postaci "tytul (rok)"
// zwraca element (div z klasa rok)
// z rokiem wstawionym z jakiegos filmu
function utworzRok(film) {
    
    let rok = document.createElement("div");
    rok.classList.add("rok");
    rok.innerHTML = getYear(film);
    
    return rok;
}

// podfunkcja do funkcji utworzListekafelkow()
// przyjmuje tytul jako string postaci "tytul (rok)"
// zwraca kafelek (div z klasa kafelek)
// w tym divie beda 2 poddivy
// pod-div z klasa tytul <- funkcja utworzTytul()
// pod-div z klasa rok <- funkcja utworzRok()
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
// bedzie potrzebna np. przy sortowaniu, dodawaniu nowego filmu
let wybranyRok = "wszystkie lata";

// zmienna globalna przechowujaca aktualnie wybrany tag
// bedzie potrzebna, np. przy sortowaniu, dodawaniu nowego filmu
let wybranyTag = "wszystkie tagi";


// funkcja czyWszystkieUkryte
// potrzebna aby wyswietlic info o braku rekordow (kafelkow) do wyswietlenia
// tj. spelniajacych kryteria danego filtrowania
// zczytuje kafelki ("ul > li") z dokumentu HTML
function czyWszystkieUkryte() {
    let kafelkiWdokumencie = document.querySelectorAll("ul > li");
    for (let i = 0; i < kafelkiWdokumencie.length; i++) {
	if (kafelkiWdokumencie[i].hidden !== true) {
	    return false;
	}
    }
    return true;
}

// przyjmuje string "tytul (rok)" i string slowo
// sprawdza czy tytul zawiera slowo
function czyTytulZawieraSlowo(tytulZrokiem, slowo) {
    let tytulBezRoku = getTitle(tytulZrokiem);
    // tu damy regex aby wywalic ewentualne przecinki ktore moga byc w tytule
    let re = /,*\.*\:* /;
    // slowa sa oddzielone spacjami lub (, i spacja) lub (. i spacja), (: i spacja)
    // typu: "wladca pierscieni: druzyna pierscienia"; "alien vs. predator"; "hobbit, czyli tam i z powrotem"
    let wszystkieSlowa = tytulBezRoku.toLocaleLowerCase().split(re);
    let wynik = wszystkieSlowa.includes(slowo);
    return wynik;
}

// jedna z wazniejszych (najwazniejsza?) funkcji (ostatecznie sie tak rozrosla)
// zwraca element (ul)
// z podelementami (li)
// kazdy li to div.kafelek, <- utworzKafelek()
// a ten z kolei to 2 divy:
// div.tytul <- utworzTytul()
// div.rok <- utworzRok()
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
	    
	    // dodajemy kafelek do eltListy
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

	    // dodajemy kafelek do eltListy
	    eltListy.appendChild(kafelek);
	    
	    // dodaj eltListy do listyKafelkow
	    listaKafelkow.appendChild(eltListy);
	    
	}
    } else if (wybranyRok === "wszystkie lata" &&
	       wybranyTag !== "wszystkie tagi") {
	// tu filtrujemy tylko po tagu

	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli tag nam sie zgadza (filtrowanie)

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

	    // dodajemy kafelek do eltListy
	    eltListy.appendChild(kafelek);
	    
	    // dodaj eltListy do listyKafelkow
	    listaKafelkow.appendChild(eltListy);
	    
	}
    } else {
	// tu filtrujemy i po roku i po tagu

	for (let i = 0; i < tabFilmow.length; i++) {
	    
	    // tworzymy widoczny kafelek tylko jesli rok i tag nam sie 
	    // zgadzaja (filtrowanie)

	    // tworzymy element listy
	    let eltListy = document.createElement("li");

	    let kafelek = utworzKafelek(tabFilmow[i]);

	    // filtrowanie po roku i tagu
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

	    // dodajemy kafelek do eltListy
	    eltListy.appendChild(kafelek);
	    
	    // dodaj eltListy do listyKafelkow
	    listaKafelkow.appendChild(eltListy);
	    
	}
    }

    return listaKafelkow; 	// zwraca UL kafelkow
}

let listaKafelkow = utworzListeKafelkow(listOfMovies);
output.appendChild(listaKafelkow);

// ponizsze potrzebne aby wyswietlac monit o braku wynikow do wyswietlenia 
// przy filtrowaniu
let infoBrakWynikowDoWyswietlenia = document.createElement("p");
infoBrakWynikowDoWyswietlenia.style.color = "red";
output.appendChild(infoBrakWynikowDoWyswietlenia);

updateFilmyWszystkieIwidoczne();
wyswietlFilmyWszystkieIwidoczne();


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
// przyjmuje tabele ktorej kazdy element to string postaci "tytul (rok)"
// zwraca tabele ktorej kazdy element to string postaci "[0-9]{4}"
function getUniqueYears(tabFilmow) {
    
    let unikalneLata = [];

    for (let i = 0; i < listOfMovies.length; i++) {
	let rok = getYear(listOfMovies[i]);
	// tudziez mozna probowac wziac wszystkie lata i zrobic z tego set-a
	// (JS ma chyba sety)
	// przeslany do porownania rok jest zawsze 4 cyfrowy (string postaci "[0-9]{4}")
	if (unikalneLata.indexOf(rok) === -1){
	    unikalneLata.push(rok);
	    // wrzucony do unikalnych rok jes zawsze 4 cyfrowy (string "[0-9]{4}")
	}
    }

    return unikalneLata;
}

// prosciej bedzie usunac liste kafelkow i odbudowac ja z ukrytymi kafelkami
function usunListeKafelkow() {
    // jest tylko 1 ul (elt 0) w dokumencie
    let listaKafelkow = document.getElementsByTagName("ul")[0];
    listaKafelkow.remove();
}

// usuwa liste kafelkow i odbudowuje ja przefiltrowana
function filtrujPoRoku() {
    wybranyRok = this.innerHTML;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyWszystkieIwidoczne();
    wyswietlFilmyWszystkieIwidoczne();
    
    // sprawdza czy wszystkie kafelki sa ukryte
    // jesli tak wyswietla info
    if (czyWszystkieUkryte()) {
	infoBrakWynikowDoWyswietlenia.innerHTML = "Brak filmów spełniających " + 
	    "zadane kryteria wyszukiwania (" + 
	    "rok: '" + wybranyRok + "' ORAZ tag: '" + wybranyTag + "')" +
	    "</br>Wybierz inne parametry filtrowania";
    } else {
	infoBrakWynikowDoWyswietlenia.innerHTML = "";
    }
}

// tu beda lata do wybrania do filtrowania
let select = document.createElement("select");

// funkcja updateuje (przebudowuje) selecta na podstawie aktualnej zawartosci bazyfilmow
// potrzebne przy dodaniu nowego filmu
// (bo moze sie wtedy trafic rok ktorego nie bylo jeszcze w select-cie)
function updateSelectRok() {

    let unikalnePremiery = getUniqueYears(listOfMovies);

    // sortujemy rosnaca
    // (sort robi to inplace wiec nie trzeba tego ponownie przypisywac)
    unikalnePremiery.sort((a, b) => parseInt(a) - parseInt(b));
    
    // dodamy opje do selekta typu "wszystkie lata"
    unikalnePremiery.unshift("wszystkie lata"); // dodajemy z przodu listy

    // usuwamy stare wartosci z select-a (te co sa aktualnie w dokumencie)
    let ostatniaOpcja = select.lastElementChild;
    while(ostatniaOpcja){
	select.removeChild(ostatniaOpcja);
	ostatniaOpcja = select.lastElementChild;
    }
    
    // zapelniamy select nowymi wartosciami (te ktore sa np. po dodaniu filmu)
    for (let i = 0; i < unikalnePremiery.length; i++) {
	let opcja = document.createElement("option");
	opcja.innerHTML = unikalnePremiery[i];
	opcja.onclick = filtrujPoRoku;
	if (opcja.innerHTML === wybranyRok){
	    opcja.selected = true;
	}
	select.appendChild(opcja);
    }
    
}

updateSelectRok();


// informacja dla uzytkownika o tym co ma/moze zrobic
let parWybierzRok = document.createElement("p").innerHTML="Wybierz rok filmu: ";

output.prepend(parWybierzRok, select); 	// aby selecta z filtrowaniem dac wczesniej
// ewentualnie mozna dac firstChild czy cos takiego



///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 3)                             //
///////////////////////////////////////////////////////////////////////////////

// Powyżej listy filmów wyświetl napis mówiący o liczbie wszystkich
// filmów oraz o liczbie aktualnie widocznych (nie ukrytych).

// funkcje w tej sekcji sa uzywane jako podwykonawcy (bezposrednio) przez
// liczFilmywidoczne() -> updateFilmywszystkieiwidoczne()
// updatefilmywszystkieiwidoczne() ->
// filtrujPoRoku(); filtrujPoTagu(); sortujPoTytule(); sortujPoRoku(); dodajFilm()
// wyswietlFilmyWszystkieIwidoczne() ->
// filtrujPoRoku(); filtrujPoTagu(); sortujPoTytule(); sortujPoRoku(); dodajFilm()

// sprawdza ile filmow jest aktualnie wyswietlonych w dokumencie HTML
function liczFilmyWidoczne() {
    let ileWidocznych = 0;

    // bo lista ul to kafelki w dokumencie HTML (widoczne i ukryte)
    let wszystkieLI = document.querySelectorAll("ul > li");
    
    for (let i = 0; i < wszystkieLI.length; i++) {
	if (!wszystkieLI[i].hidden){
	    ileWidocznych++;
	}
    }
    return ileWidocznych;
}

function updateFilmyWszystkieIwidoczne() {
    liczbaFilmow = listOfMovies.length;
    liczbaWidocznych = liczFilmyWidoczne();
}

// funkcja wyswietla liczbe filmow w bazie i liczbe filmow widocznych
function wyswietlFilmyWszystkieIwidoczne() {
    
    // elementy HTML wyswietlaje liczbe filmow (wszystkie i widoczne)
    let starePar = document.querySelectorAll("p.liczba-filmow");
    
    if (starePar.length) { 	// jesli sa juz stare paragrafy
	// to podmieniamy ich tresc
	// zmienne liczbaFilmow i liczbaWidocznych musza byc aktualne
	// i sa bo zawsze najpierw wywolywana jest updateFilmyWszystkieIwidoczne()
	starePar[0].innerHTML = "Liczba wszystkich filmów w bazie: " + 
	    liczbaFilmow;
	starePar[1].innerHTML = "Liczba filmów aktualnie widocznych: " +
	    liczbaWidocznych;
    } else { 			// w przeciwnym wypadku tworzymy je
	// i dodajemy
	let filmy = document.createElement("p");
	filmy.setAttribute("class", "liczba-filmow");
	let widoczne = document.createElement("p");
	widoczne.setAttribute("class", "liczba-filmow");

	filmy.innerHTML = "Liczba wszystkich filmów w bazie: " +
	    liczbaFilmow;
	widoczne.innerHTML = "Liczba filmów aktualnie widocznych: " +
	    liczbaWidocznych;
	
	// wstawienie nowych (zupdate-owanych paragrafow) do HTML
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
function getSlowa(tytulBezRoku) {
    // tu damy regex aby wywalic ewentulne przecinki, kropki i dwukropki, z tytulu
    let re = /,*\.*\:* /;
    // slowa sa oddzielone spacjami lub (, i spacja) lub (. i spacja), (: i spacja)
    // typu: "wladca pierscieni: druzyna pierscienia"; "alien vs. predator"; "hobbit, czyli tam i z powrotem"
    let slowa = tytulBezRoku.split(re); 
    slowa = slowa.map((slowo) => slowo.toLocaleLowerCase());
    return slowa;
}

// zwraca liste slow (array stringow) z arrayu tytuly
// (array stringow, tj. tytulow bez roku)
// slowa moga sie powtarzac
function zwrocSlowaZtytulow(tytulyBezRoku) {
    let slowa = [];
    for (let i = 0; i < tytulyBezRoku.length; i++) {
	let zJednegoTytulu = getSlowa(tytulyBezRoku[i]);
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
	// tu, np. ["ala", "zz"].indexOf("z") zwraca -1
	// a, np. ["ala", "z"].indexOf("z") zwraca 1
	// wiec powinno dzialac poprawnie
	if (unikalneSlowa.indexOf(slowa[i]) === -1){
	    unikalneSlowa.push(slowa[i]);
	}
    }

    return unikalneSlowa;
}


// przyjmuje liczbaWyst (integer) danego slowa i zwraca string
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
function zwrocUnikSlowaIwielkFontow() {
    
    let wszyskieTytuly = listOfMovies.map((film) => getTitle(film));
    let wszystkieSlowaZtytulow = zwrocSlowaZtytulow(wszyskieTytuly);
    let unikalneSlowa = getUniqueWords(wszystkieSlowaZtytulow);

    // nie bylo czy sortowac rosnaco, czy malejaco
    // 'slowa uporzadkuj alfabetycznie' (rosnaco czy malejaco)
    // damy rosnaco
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
    // lepiej wygladalby przycisk, no ale zadanie to zadanie
    // bedzie jednak "wszystkie tagi" bo inaczej tytul w stylu: 
    // "wszystkie psy ida do nieba" bedzie klopotliwy
    unikalneSlowa.unshift("wszystkie tagi");
    liczbWystSlowa.unshift(4); 	// a to da w efekcie czcionke = 20px
    
    // obliczmy wielkosci czcionek
    let wielkosciCzcionek = 
	liczbWystSlowa.map((wystapienie) => zwrocRozmCzcionki(wystapienie));

    return [unikalneSlowa, wielkosciCzcionek];
}


// Kliknięcie w tag powoduje odfiltrowanie filmów - 
// wyświetlone zostaną tylko te, których tytuł zawiera wskazane słowo
// (pamiętaj o aktualizacji napisu wyświetlającego liczbę widocznych
// filmów). Dodaj również specjalny tag "wszystkie" w celu
// wyświetlenia wszystkich filmów.
// ------ ROZNICA: tu bedzie "wszystkie tagi" bo 
// inaczej tytul w stylu: 
// "wszystkie psy ida do nieba" bedzie klopotliwy

// brak danych czy filtrowanie po tagu ma miec efekt
// AND w stosunku do filtrowania po roku?
// ostatecznie zrobiono efekt AND
function filtrujPoTagu() {

    // usuniecie podswietlenia z tagu
    let listaTagow = document.querySelectorAll("ol > li");
    for (let i = 0; i < listaTagow.length; i++) {
	listaTagow[i].style.backgroundColor = "";
    }
    // wstawienie podswietlenia na aktualnie wybrany tag
    // aby uzytkownik wiedzial czemu wyswietla tylko tyle kafelkow
    // (jesli zapomni co ostatnio klikal)
    this.style.backgroundColor = "gold";

    wybranyTag = this.innerText;
    usunListeKafelkow(); 	// usuwa liste kafelkow
    // a teraz ja odtwarza
    output.appendChild(utworzListeKafelkow(listOfMovies));
    
    // updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
    updateFilmyWszystkieIwidoczne();
    wyswietlFilmyWszystkieIwidoczne();
    
    // sprawdza czy wszystkie kafelki sa ukryte
    // jesli tak wyswietla info
    if (czyWszystkieUkryte()) {
	infoBrakWynikowDoWyswietlenia.innerHTML = "Brak filmów spełniających " +
	    "zadane kryteria wyszukiwania (" + 
	    "rok: '" + wybranyRok + "' ORAZ tag: '" + wybranyTag + "')" +
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
    
    let tabeleSlowaWielkosci = zwrocUnikSlowaIwielkFontow();
    let unikalneSlowa = tabeleSlowaWielkosci[0];
    let rozmCzcionki = tabeleSlowaWielkosci[1];

    // i teraz for-em wprowadzam slowa
    for (let i = 0; i < unikalneSlowa.length; i++) {
	let eltListy = document.createElement("li");
	eltListy.onclick = filtrujPoTagu;
	eltListy.style.fontSize = rozmCzcionki[i];
	// tagowi "wszystkie tagi" dla odroznienia damy zielony kolor
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

function zmienTrybDzienNoc() {
    
    let noc = poleInput.checked; // jesli zaznaczony checkbox (true) to tryb nocny
    if (noc){
	let cialo = document.getElementsByTagName("body")[0];
	cialo.classList.add("tryb_nocny");
	// ciemne tlo elementow bedzie zdefiniowane w css-ie
	// (patrz plik: styles.css)
    } else {
	let cialo = document.getElementsByTagName("body")[0];
	cialo.classList.remove("tryb_nocny");
    }

}

przyciskDzienNoc.onclick = zmienTrybDzienNoc;

output.prepend(imgTrybDzienny, przyciskDzienNoc, imgTrybNocny, parTrybNocny);


///////////////////////////////////////////////////////////////////////////////
//                              zadanie (part 7)                             //
///////////////////////////////////////////////////////////////////////////////

// Dwa przyciski pozwalające na sortowanie filmów - alfabetycznie oraz po roku premiery. 
// Spróbuj pozwolić na sortowanie rosnąco (po pierwszym naciśnięciu przycisku) i malejąco
// (po drugim naciśnięciu przycisku).

// bedzie nam mowic czy przeslany array ma byc teraz zmianiony rosnaco czy malejaco
let tytulRosnaco = true;

// funkcja sortujPoTytule zmienia w miejscu listOfMovies
function sortujPoTytule() {

    if (tytulRosnaco) {
	listOfMovies.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
	tytulRosnaco = !tytulRosnaco;
	
	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku aby
	// uzytkownik wiedzial co i jak
	// przy pierwszym wywolaniu tej funkcji zmienna przyciskSortujPoTytule
	// (patrz nizej bedzie juz istniala)
	przyciskSortujPoTytule.value = "Sortuj po tytule (malejąco)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyWszystkieIwidoczne();
	wyswietlFilmyWszystkieIwidoczne();

    } else {
	listOfMovies.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
	tytulRosnaco = !tytulRosnaco;

	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku
	// aby uzytkownik wiedzial co i jak
	// przy pierwszym wywolaniu tej funkcji zmienna przyciskSortujPoTytule
	// (patrz nizej) bedzie juz istniala
	przyciskSortujPoTytule.value = "Sortuj po tytule (rosnąco)";

	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyWszystkieIwidoczne();
	wyswietlFilmyWszystkieIwidoczne();
    }

    // aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
    // przy pierwszym wywolaniu tej funkcji zmienna ostatnoSortowanePo
    // bedzie juz istniala
    // (patrz nizej) bedzie juz istniala
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
	// przy kazdym sortowaniu zmieni sie wartosc przecisku 
	// aby uzytkownik wiedzial co i jak
	// przy pierwszym wywolaniu tej funkcji zmienna przyciskSortujPoRoku
	// (patrz nizej bedzie juz istniala)
	przyciskSortujPoRoku.value = "Sortuj po roku (malejąco)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyWszystkieIwidoczne();
	wyswietlFilmyWszystkieIwidoczne();
	

    } else {
	listOfMovies.sort((a, b) => parseInt(getYear(b)) - parseInt(getYear(a)));
	rokRosnaco = !rokRosnaco;

	// update-owanie napisu w przycisku
	// przy kazdym sortowaniu zmieni sie wartosc przecisku
	// aby uzytkownik wiedzial co i jak
	// przy pierwszym wywolaniu tej funkcji zmienna przyciskSortujPoRoku
	// (patrz nizej bedzie juz istniala)
	przyciskSortujPoRoku.value = "Sortuj po roku (rosnąco)";
	
	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyWszystkieIwidoczne();
	wyswietlFilmyWszystkieIwidoczne();

    }
    // aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
    // przy pierwszym wywolaniu tej funkcji zmienna ostatnoSortowanePo
    // bedzie juz istniala
    ostatnioSortowanePo = "rok";
}
// ostatnioSortowanePo przyjmuje 3 mozliwe wartosci
// poczatkowo pusty string, a potem zmiana na "rok" lub "tytul"
// aby przy dodaniu filmu do listy posortowac je odpowiednio przy wyswietleniu
let ostatnioSortowanePo = "";

let przyciskSortujPoTytule = document.createElement("input");
przyciskSortujPoTytule.setAttribute("type", "button");
przyciskSortujPoTytule.value = "Sortuj po tytule (rosnąco)";
przyciskSortujPoTytule.onclick = sortujPoTytule;

let przyciskSortujPoRoku = document.createElement("input");
przyciskSortujPoRoku.setAttribute("type", "button");
// po uruchomieniu strony bedzie tylko sortuj po roku
przyciskSortujPoRoku.value = "Sortuj po roku (rosnąco)";
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



// tu bedziemy wypisywac komunikat o bledzie w dodawaniu filmu
let parWalidacjaDodanegoFilmu = document.createElement("p");
parWalidacjaDodanegoFilmu.style.color = "red";

// tu bedziemy wpisaywac rok
let poleDodajRok = document.createElement("input");
poleDodajRok.setAttribute("type", "text");
poleDodajRok.setAttribute("placeholder", "Dodaj rok (max. 4 znaki)");
poleDodajRok.setAttribute("size", "20");
poleDodajRok.setAttribute("maxlength", "4"); 


output.insertBefore(parWalidacjaDodanegoFilmu, listaSlow);

output.insertBefore(poleDodajRok, listaSlow);

// tu bedziemy wpisywac tytul
let poleDodajTytul = document.createElement("input");
poleDodajTytul.setAttribute("type", "text");
poleDodajTytul.setAttribute("placeholder", "Dodaj tytuł (max. 50 znaków)");
poleDodajTytul.setAttribute("size", "50");
poleDodajTytul.setAttribute("maxlength", "50"); 

// czy rok sklada sie z samych cyfr
function czyTylkoCyfry(tekst) {
    let tylkoCyfry = true;
    for (let i = 0; i < tekst.length; i++) {
	if (tekst[i] >= "0" && tekst[i] <= "9") {
	    // nie rob nic (odpowiedz juz jest true)
	} else {
	    return false;
	}
    }
    return tylkoCyfry;
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

// sprawdza czy wpisany film spelnia kryteria dla dodania
// jesli NIE: wyswietla info + zwraca false
// jesli TAG: zwraca true
function weryfikujFilm() {
    
    let czyOk = true;

    // + 1900 bo:
    // https://www.tutorialspoint.com/javascript/date_getyear.htm
    let aktualny_rok = new Date().getYear() + 1900;
    // wg. https://en.wikipedia.org/wiki/Film najstarszy znany film pochodzi z 1888
    
    // dodanie koloru czerwonego do czcionki z ostrzezeniem
    parWalidacjaDodanegoFilmu.style.color = "red";

    if (poleDodajTytul.value === "") {
	parWalidacjaDodanegoFilmu.innerHTML = "Pole 'dodaj tytuł filmu' nie może być puste!";
	czyOk = false;
    }
    if (poleDodajRok.value === "") {
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' nie może być puste!";
	czyOk = false;
    } else if (!czyTylkoCyfry(poleDodajRok.value)) {
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' musi zawierać 4 cyfry";
	czyOk = false;
    } else if (poleDodajRok.value < 1888 || // patrzy wczesniejszy komentarz
	       poleDodajRok.value > aktualny_rok) {
	console.log("wywolanie rok pomiedzy");
	parWalidacjaDodanegoFilmu.innerHTML += " Pole 'dodaj rok filmu' musi zawierać wartość" +
	    "  pomiędzy rokiem 1888 a rokiem bieżącym.";
	czyOk = false;
    } else if (czyFilmJestWbazie(poleDodajTytul.value, poleDodajRok.value)) {
	parWalidacjaDodanegoFilmu.innerHTML = "Podany film znajduje się już w bazie.";
	czyOk = false;
    }
    return czyOk;
}


// dodaje film do bazy danych
// updatuje wyswietlane kafelki z filmami
// updateuje liste tagow
// updateuje select lat (rok filmu)
function dodajFilm() {

    // resetowanie pola jesli tam wczesniej bylo cos wpisane
    parWalidacjaDodanegoFilmu.innerHTML = "";
    
    let filmDoDodania = "";
    let FilmZweryfikowany = weryfikujFilm();
    
    // weryfikacja dodanego filmu
    // sprawdza czy wczesniej bylo sortowanie
    // jesli nie to film dodawany jest na koniec listy filmow i kafelkow
    if (FilmZweryfikowany && ostatnioSortowanePo === ""){
	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// wyswietlenie wiadomosci o dodaniu filmu
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyślnie dodano film do " +
	    "końca listy filmów";
	parWalidacjaDodanegoFilmu.style.color = "green";
	

	usunListeKafelkow(); 	// usuwa liste kafelkow
	// a teraz ja odtwarza
	output.appendChild(utworzListeKafelkow(listOfMovies));
	
	// updateujemy i wyswietlamy liczbe filmow i liczbe filmow widocznych
	updateFilmyWszystkieIwidoczne();
	wyswietlFilmyWszystkieIwidoczne();
	
	// update listyTagow
	updateListaTagow();

	// sprawdza czy wczesniej bylo sortowanie
	// jesli tak (po roku) to film dodawany jest w odp. miejsce listy i kafelkow
    } else if (FilmZweryfikowany && ostatnioSortowanePo === "rok") {
	rokRosnaco = !rokRosnaco; // zamieniamy do stanu poprzedniego sortowania

	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// sortujemy po roku
	// (tu jest usuwanie i tworzenie listy kafelkow, 
	// update liczby filmow i filmow widocznych)
	sortujPoRoku();

	// updateujemy tagi
	updateListaTagow();

	// wyswietlenie wiadomosci o dodaniu filmu
	// tu film zostal wstawiony we wlasciwe miejsce a nie na koniec kafelkow
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyślnie dodano film do listy.";
	parWalidacjaDodanegoFilmu.style.color = "green";
	
	// sprawdza czy wczesniej bylo sortowanie
	// jesli tak (po tytule) to film dodawany jest w odp. miejsce listy i kafelkow
    } else if (FilmZweryfikowany && ostatnioSortowanePo === "tytul"){

	tytulRosnaco = !tytulRosnaco; // zamieniamy do stanu poprzedniego sortowania

	// dodanie zweryfikowanego filmu na koniec listy filmow
	filmDoDodania += poleDodajTytul.value + " (" + poleDodajRok.value + ")";
	listOfMovies.push(filmDoDodania);

	// sortujemy po tytule
	// (tu jest usuwanie i tworzenie listy kafelkow,
	// update liczby filmow i filmow widocznych)
	sortujPoTytule();
	
	// updateujemy tagi
	updateListaTagow();

	// wyswietlenie wiadomosci o dodaniu filmu
	// tu film zostal wstawiony we wlasciwe miejsce a nie na koniec kafelkow
	parWalidacjaDodanegoFilmu.innerHTML = "Pomyślnie dodano film do listy.";
	parWalidacjaDodanegoFilmu.style.color = "green";
	
    }
    
    
}

let przyciskDodajFilm = document.createElement("input");
przyciskDodajFilm.setAttribute("type", "button");
przyciskDodajFilm.value = "Dodaj Nowy Film";
przyciskDodajFilm.onclick = dodajFilm;

output.insertBefore(poleDodajTytul, poleDodajRok);
output.insertBefore(przyciskDodajFilm, listaSlow);

