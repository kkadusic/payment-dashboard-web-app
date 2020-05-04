# Feature

Registracija korisnika

## Item

Neregistrovani korisnik Payment Dashboard web aplikacije mora imati mogućnost da se registruje na aplikaciju.

## Task

- Kreirati izgled stranice za registraciju
- Implementirati učitavanje sigurnosnih pitanja sa servera
- Implementirati validaciju polja forme za registraciju
- Implementirati slanje podataka sa forme na server
- Implementirati prikazivanje poruke korisniku ukoliko je username/email već registrovan
- Uraditi push koda
- Napraviti pull request

# Feature

Prijava korisnika

## Item

Registrovani korisnik Payment Dashboard web aplikacije mora imati mogućnost da se loguje na aplikaciju (računom kreiranim na Payment Dashboard ili Pay Mobile App).

## Task

- Kreirati izgled stranice za prijavu
- Implementirati validaciju polja forme za prijavu
- Implementirati slanje podataka sa forme na server
- Prikazati poruku o grešci ukoliko su poslani pristupni podaci neispravni
- Uraditi push koda
- Napraviti pull request

# Feature

Promjena lozinke

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost promjene lozinke.

## Task

- Kreirati izgled stranice za promjenu lozinke
- Obezbjediti sigurnost provjerom odgovora na sigurnosno pitanje.
- Uraditi push koda
- Napraviti pull request

# Feature

Oporavak lozinke

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost oporavka lozinke.

## Task

- Kreirati izgled stranice za oporavak lozinke
- Implementirati slanje username-a/email adrese serveru radi dobijanja sigurnosnog pitanja
- Implementirati slanje odgovora na sigurnosno pitanje serveru radi potvrde identiteta
- Implementirati prelazak na login stranicu
- Uraditi push koda
- Napraviti pull request

# Feature

Pregled bankovnih računa

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda bankovnih računa (kreiranih ovom aplikacijom ili Pay Mobile App-om).

## Task

- Kreirati izgled stranice za pregled bankovnih računa
- Implementirati čitanje dodanih bankovnih računa sa servera
- Implementirati prikaz informacija o svakom bankovnom računu
- Uraditi push koda
- Napraviti pull request

# Feature

Dodavanje bankovnih računa

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost dodavanja bankovnog računa (jednog ili više).

## Task

- Kreirati izgled stranice za dodavanje bankovnih računa
- Implementirati validaciju polja forme za dodavanje računa
- Implementirati slanje post zahtjeva (sa podacima o računu) na server
- Implementirati ponašanje aplikacije u slučaju neuspjelog slanja zahtjeva
- Implementirati ponašanje aplikacije u slučaju uspjelog slanja zahtjeva
- Uraditi push koda
- Napraviti pull request

# Feature

Prijem obavještenja o neispravnosti bankovnog računa

## Item

Korisnik Payment Dashboard web aplikacije mora primati obavještenje ukoliko dodani bankovni račun nije validan.

## Task

- Implementirati čitanje odgovora na zahtjev za dodavanje novog bankovnog računa
- Implementirati prikaz poruke o grešci
- Uraditi push koda
- Napraviti pull request

# Feature

Brisanje postojećeg bankovnog računa

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost brisanja postojećeg bankovnog računa (jednog ili više).

## Task

- Dodati opciju za brisanje računa na stranici za pregled računa
- Implementirati slanje zathjeva za brisanjem računa na server
- Ažurirati listu dodanih računa nakon dobijanja odgovora od servera
- Uraditi push koda
- Napraviti pull request

# Feature

Odjavljivanje sa aplikacije

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost odjavljivanja sa iste.

## Task

- Dodati u meni opciju za odjavljivanje sa aplikacije
- Implementirati vraćanje na početnu stranicu nakon odjavljivanja
- Uraditi push koda
- Napraviti pull request

# Feature

Filtriranje transakcija po bankovnom računu

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda svih računa koji su plaćeni određenim bankovnim računom.

## Task

- Dodati opciju za filtriranje u koloni koja odgovara bankovnom računu u tabeli transakcija
- Izlistati sve postojeće bankovne račune
- Omogućiti filtriranje transakcija klikom na neki od ponuđenih računa
- Uraditi push koda
- Napraviti pull request

# Feature

Filtriranje transakcija po merchantu

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda svih računa koji su formirani u određenoj poslovnici.

## Task

- Dodati opciju za filtriranje u koloni koja odgovara merchantu u tabeli transakcija
- Omogućiti filtriranje transakcija unošenjem imena željenog merchanta
- Uraditi push koda
- Napraviti pull request

# Feature

Filtriranje transakcija po datumu

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda svih računa koji su formirani u vremenskom periodu koji je odabran.

## Task

- Dodati opciju za filtriranje u koloni koja odgovara datumu u tabeli transakcija
- Dodati prikaz kalendara
- Omogućiti filtriranje transakcija klikom na opciju "Search"
- Uraditi push koda
- Napraviti pull request

# Feature

Filtriranje transakcija po usluzi koja je kupljena

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda svih računa čiji jedan dio predstavlja određena usluga koju je kupio.

## Task

- Dodati opciju za filtriranje u koloni koja odgovara uslugama u tabeli transakcija
- Omogućiti filtriranje transakcija unosom željene usluge u polje za pretragu
- Uraditi push koda
- Napraviti pull request

# Feature

Sortiranje po bankovnom računu, merchantu, datumu i plaćenom iznosu

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost sortiranja transakcija po bankovnom računu, merchantu, datumu i plaćenom iznosu

## Task

- Dodati opciju za sortiranje u kolonama koja odgovaraju bankovnim računima, merchantima, datumima i plaćenom iznosu u tabeli transakcija
- Omogućiti sortiranje transakcija klikom na ikonu za sortiranje
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz ukupnog plaćenog iznosa za prikazane transakcije

## Item

Prijavljeni korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda ukupnog iznosa koji je plaćen za sve izlistane transakcije.

## Task

- Dodati polje za prikaz ukupnog iznosa
- Sabrati sve iznose trenutno prikazanih transakcija
- Ispisati sabrani iznos u dodano polje
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz dijagrama koji preslikava zavisnost troška od merchanta u kojima su kupovane usluge (u određenom vremenskom periodu i sa određenim bankovnim računom)

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda dijagrama za iznos troškova po merchantima u odnosu na vremenski interval kojeg sam odabere (za određeni ili za sve bankovne račune) koristeći pie chart.

## Task

- Dodati polja za izbor bankovnog računa i datuma
- Izdvojiti podatke koji će odrediti sadržaj x-ose i y-ose
- Kreirati "pie chart"
- Za svaki dio dijagrama, prikazati naziv merchanta i iznos troškova
- Za svaki dio dijagrama, prikazati procenat koji zauzima u odnosu na cjelinu
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz dijagrama koji preslikava zavisnost troška od bankovnog računa kojim je izvršeno plaćanje (u određenom vremenskom periodu)

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda troškova po bankovnim računima pomoću pie chart-a, i to u vremenskom periodu koji sam odabere.

## Task

- Dodati polje za izbor datuma
- Izdvojiti podatke koji će odrediti sadržaj x-ose i y-ose
- Kreirati "pie chart"
- Za svaki dio dijagrama, prikazati broj bankovne kartice i iznos troškova
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz dijagrama koji preslikava zavisnost troška od mjeseca tokom kojeg je izvršeno plaćanje (u određenoj godini)

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost da za svakog merchanta (kojeg sam odabere), pregleda troškove za svaki mjesec odabrane godine koristeći bar chart (za određeni ili za sve bankovne račune).

## Task

- Dodati polja za izbor merchanta, bankovnog računa i godine
- Izdvojiti podatke koji će odrediti sadržaj x-ose i y-ose
- Kreirati "bar chart"
- Za svaki bar dijagrama, prikazati iznos troškova
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz dijagrama koji preslikava zavisnost troška od merchanta kod kojeg je izvršeno plaćanje

## Item

Korisnik Payment Dashboard web aplikacije mora imati mogućnost pregleda merchanta kod kojih je najviše novca ostavio pomoću Radar chart-a (za određeni ili za sve bankovne račune)

## Task

- Dodati polje za izbor bankovnog računa
- Izdvojiti podatke koji će odrediti sadržaj x-ose i y-ose
- Kreirati "radar chart"
- Za svaki dio dijagrama, prikazati iznos troškova
- Dodati mogućnost prikaza rezultata za sve postojeće bankovne račune na jednom dijagramu
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i uspješnoj transakciji na koju se ista odnosi

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije da je izvršeno plaćanje aplikacijom PayApp

## Task

- Omogućiti preusmjeravanje na komponentu sa prikazom svih uspješnjih transakcija
- Označiti plavom bojom red tabele u kojem se nalazi odgovarajuća transakcija
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i transakciji sa iznosom iznad 500 KM na koju se ista odnosi

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije da je izvršena transakcija sa iznosom iznad 500 KM

## Task

- Omogućiti preusmjeravanje na komponentu sa prikazom svih uspješnjih transakcija
- Označiti žutom bojom red tabele u kojem se nalazi odgovarajuća transakcija
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i neuspješnoj transakciji na koju se ista odnosi

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije o neuspjelom plaćanju na PayApp

## Task

- Kreirati Modal sa prikazom detalja o notifikaciji i transakciji koja nije uspjela
- Omogućiti prikaz kreiranog Modala
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i bankovnom računu sa kojeg su plaćene transakcije u iznosu većem od 1000 KM u tekućem mjesecu

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije da je dostigao limit mjesečnih troškova (1000 KM)

## Task

- Omogućiti preusmjeravanje na komponentu sa prikazom svih bankovnih računa
- Označiti žutom bojom red tabele u kojem se nalazi odgovarajući bankovni račun
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i bankovnom računu na kojem su resursi ispod 5 KM

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije o stanju računa - na primjer da će nakon transakcije stanje na računu biti manje od donje granice (5 KM)

## Task

- Omogućiti preusmjeravanje na komponentu sa prikazom svih bankovnih računa
- Označiti žutom bojom red tabele u kojem se nalazi odgovarajući bankovni račun
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i neuspješnom transferu novca na koji se ista odnosi

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije da je transfer novca sa nekog od njegovih računa neuspješan

## Task

- Kreirati Modal sa prikazom detalja o notifikaciji i transakciji koja nije uspjela
- Omogućiti prikaz kreiranog Modala
- Uraditi push koda
- Napraviti pull request

# Feature

Prikaz detalja o notifikaciji i uspješnom transferu novca na koji se ista odnosi

## Item

Korisnik Payment Dashboard web aplikacije treba imati mogućnost primanja i pregleda notifikacije da je izvršen transfer novca sa nekog od njegovih računa

## Task

- Kreirati tabelu sa prikazom svih uspješnih transfera novca
- Omogućiti preusmjeravanje na komponentu sa prikazom svih uspješnih transfera
- Označiti plavom bojom red tabele u kojem se nalazi odgovarajući transfer
- Uraditi push koda
- Napraviti pull request
