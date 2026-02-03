import Image from "next/image";
import SubscribeForm from "../components/SubscribeForm";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-gray-50 text-brand-dark">
      {/* Header / Nav */}
      <header className="absolute top-0 w-full py-6 px-4 md:px-8 flex justify-between items-center z-10">
        <div className="w-64 relative h-24">
          <Image src="/ramadanwebinar/images/logo-v3.png" alt="De Fitnesscoach" fill className="object-contain object-left md:object-center" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 bg-brand-dark text-white overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-block bg-brand-cyan/20 text-brand-cyan px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
              Webinar • 10 Februari 2026 • 19:00 Uur
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Hoe verlies je <span className="text-brand-cyan">2 tot 5 kilo buikvet</span> tijdens Ramadan?
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Ontdek de slimme en haalbare methode om fit te blijven en vet te verliezen, zonder streng dieet, tijdens de heilige maand.
            </p>
            <div className="pt-4">
              <a href="#register" className="bg-brand-cyan text-brand-dark hover:bg-white transition-colors duration-300 px-8 py-4 rounded-lg text-lg font-bold shadow-lg inline-block">
                Reserveer je plek (Gratis)
              </a>
            </div>
          </div>
          {/* Hero Image / Visual */}
          {/* Hero Image / Visual */}
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-cyan/20">
              <Image
                src="/ramadanwebinar/images/new-hero.png"
                alt="De Fitnesscoach"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient overlay for text readability if needed, or just style */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Wat je gaat leren</h2>
            <p className="text-gray-600">In 30-45 minuten ontdek je precies:</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Waarom Ramadan?", desc: "Waarom dit de perfecte maand is om te starten met vetverlies." },
              { title: "Wat eet je?", desc: "Concrete voedingstips voor Suhoor en Iftar voor optimaal resultaat." },
              { title: "Hoe train je?", desc: "De beste tijdstippen en methodes om te trainen tijdens het vasten." },
              { title: "Resultaat in 30 dagen", desc: "Wat is realistisch en haalbaar zonder energieverlies." }
            ].map((topic, i) => (
              <div key={i} className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                <div className="w-10 h-10 bg-brand-cyan/10 text-brand-cyan rounded-full flex items-center justify-center mb-4 font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weggever / E-book */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl">
          <div className="flex-1">
            <div className="book-container relative w-full h-[400px]">
              <div className="book w-[250px] h-[375px]">
                <Image src="/ramadanwebinar/images/ebook-cover.png" alt="Ramadan E-book" fill className="object-cover rounded-r-md" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-brand-cyan text-brand-dark px-3 py-1 rounded text-xs font-bold uppercase">
              Bonus
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Directe toegang tot het <span className="text-brand-cyan">Ramadan E-book</span>
            </h2>
            <p className="text-gray-300">
              Meld je aan voor het webinar en ontvang direct mijn exclusieve Ramadan E-book. Een beknopte handleiding om alvast goed van start te gaan.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Voeding tips
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Trainings structuur
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center space-y-8">


          <SubscribeForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-gray-900 border-t border-gray-800">
        <p>&copy; 2026 De Fitnesscoach. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
