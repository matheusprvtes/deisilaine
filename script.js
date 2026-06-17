document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Sticky Header effect on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scroll with offset for sticky header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Intersection Observer for Fade-in Animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 5. Accordion functionality (optional exclusivity)
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        acc.addEventListener('click', (e) => {
            if (e.target.tagName === 'SUMMARY' || e.target.closest('summary')) {
                accordions.forEach(otherAcc => {
                    if (otherAcc !== acc && otherAcc.hasAttribute('open')) {
                        otherAcc.removeAttribute('open');
                    }
                });
            }
        });
    });

    // 6. Language Switcher — initialize on load
    const savedLang = localStorage.getItem('kaipros-lang') || 'pt';
    applyLanguage(savedLang);
});

// ─── Translations ───────────────────────────────────────────────────────────

const translations = {
    pt: {
        'meta-title':        'Formação Kaipros | Deisilaine Soares',
        'meta-desc':         'Descubra a metodologia global do Kaipros Instituto. Uma formação de prestígio internacional.',
        'nav-inicio':        'Início',
        'nav-desafio':       'O Desafio',
        'nav-metodologia':   'Metodologia',
        'nav-mentora':       'Mentora',
        'nav-para-quem':     'Para Quem',
        'nav-garantir':      'Garantir Vaga',
        'hero-h1':           'Construa a sua liderança emocional e faça parte de um movimento de transformação que ultrapassa fronteiras!',
        'hero-desc':         'Descubra a metodologia global do Kaipros Instituto. Uma formação de prestígio internacional, estruturada por uma especialista em comportamento humano, para quem busca conhecimento e liberdade para executar com direito, protagonismo definitivo ou deseja se consolidar no mercado como um expert em desenvolvimento humano pessoal, e assim, atuar como Mentor, Palestrante, Facilitador de Desenvolvimento Humano e ter o privilégio de estudar em um Instituto europeu.',
        'hero-btn':          'Quero Iniciar Minha Jornada de Evolução',
        'dores-h2':          'Você sente que passa a vida impulsionando os outros, mas continua vivendo abaixo do seu <span class="highlight">real potencial?</span>',
        'dores-intro':       'Diariamente, milhares de pessoas enfrentam barreiras invisíveis que sabotam o crescimento:',
        'dore-1':            'A falta de autoconfiança crônica para assumir grandes decisões e dizer não.',
        'dore-2':            'A sobrecarga emocional de levar tudo nas costas, sentindo-se perdida e sem tempo para os próprios projetos.',
        'dores-footer-1':    'Sem as ferramentas certas, a rotina consome a sua energia e engole os seus planos de autonomia. O Kaipros Instituto Internacional nasceu justamente para romper esse ciclo.',
        'dores-footer-2':    'Acreditamos que o desenvolvimento humano é uma jornada contínua de descoberta, crescimento e realização profunda. Retome as rédeas da sua história.',
        'met-h2':            '<span class="highlight">Muito Mais</span> que Treinamentos: um movimento de transformação global',
        'met-intro':         'Unindo pessoas de diferentes realidades e países em uma jornada de evolução pessoal e profissional, o Instituto desenvolveu um ambiente seguro de crescimento, acolhimento e conexão sustentado por uma metodologia eficaz, acreditando no desenvolvimento do ser humano e na sua evolução emocional e pessoal, preparando agentes de transformação para a ação.',
        'met-l1-h3':         'Desenvolvimento Pessoal',
        'met-l1-p':          'Fortalecimento da autoconfiança, clareza de propósito, liderança de vida e crescimento contínuo.',
        'met-l2-h3':         'Inteligência Emocional',
        'met-l2-p':          'Ferramentas práticas para gerenciar emoções, estruturar relacionamentos saudáveis e tomar decisões seguras.',
        'met-l3-h3':         'Domínio Emocional',
        'met-l3-p':          'Incentivo direto à independência, resgate da autoestima e valorização do ser humano em todas as áreas.',
        'met-l4-h3':         'Educação e Transformação',
        'met-l4-p':          'Cursos, mentorias e experiências estruturadas para gerar mudanças comportamentais reais e duradouras.',
        'met-l5-h3':         'Comunidade e Conexão',
        'met-l5-p':          'Criação de um ambiente internacional seguro para troca de experiências, aprendizado prático e apoio mútuo.',
        'sobre-h2':          'Quem é <span class="highlight">Deisilaine Soares?</span>',
        'sobre-subtitle':    'Conhecimento técnico e bagagem real, longe das fórmulas rasas da Internet.',
        'sobre-p1':          'Psicanalista Clínica e Mentora, Deisilaine estruturou a metodologia do Kaipros Instituto Internacional com base em anos de atuação sólida no desenvolvimento pessoal, treinamentos e acompanhamento profundo de mulheres em diferentes contextos de vida.',
        'sobre-p2':          'Uma líder dedicada a extrair o potencial máximo, a autonomia emocional e o protagonismo de cada indivíduo.',
        'badge-title':       'Formação em Desenvolvimento Humano Kaipros®',
        'badge-sub':         'Nível Especialista • Certificação de Caráter Privado Internacional',
        'pq-h2':             'Para <span class="highlight">quem</span> é?',
        'pq-intro':          'Esta formação foi concebida para pessoas que desejam investir no seu crescimento, sendo o passo definitivo de validação para:',
        'pq-li1':            'Palestrantes e comunicadores.',
        'pq-li2':            'Pessoas comprometidas com a evolução contínua.',
        'pq-li3':            'Líderes e gestores que precisam guiar equipes com empatia e firmeza.',
        'pq-li4':            'Educadores e formadores privados que buscam uma metodologia estruturada.',
        'pq-li5':            'Mentores de desenvolvimento que querem faturar com o seu conhecimento.',
        'pq-li6':            'Profissionais que buscam excelência em relacionamento interpessoal.',
        'pq-atuacao-title':  'Onde um Especialista Certificado Kaipros® pode atuar?',
        'acc1-sum':          'Trabalho Autónomo e Negócio Próprio <span class="icon"></span>',
        'acc2-sum':          'Universo Corporativo (Empresas) <span class="icon"></span>',
        'acc3-sum':          'Projetos Sociais e Centros Comunitários <span class="icon"></span>',
        'acc1-p':            'Atue no mercado como Mentor de Desenvolvimento Pessoal, Palestrante Profissional, Criador de Cursos Online, Facilitador de Workshops e Mentor de Carreira.',
        'acc2-p':            'Atue com Formação Interna de Equipas, desenvolvimento de competências interpessoais, liderança pessoal, motivação e comunicação assertiva.',
        'acc3-p':            'Desenvolva programas de integração social, facilitação de grupos de crescimento em ONGs, associações culturais e projetos comunitários.',
        'req-p':             '<strong>Requisitos de Acesso:</strong> idade mínima de 18 ANOS com disponibilidade para participar ativamente do processo evolutivo.',
        'cta-btn':           'Quero Garantir Minha Vaga Na Próxima Turma',
        'footer-disclaimer': 'A Formação em Desenvolvimento Humano Kaipros® emite uma certificação de caráter estritamente privado destinada ao desenvolvimento de competências humanas, mentoria, liderança pessoal e facilitação de grupos. Esta formação não habilita nem substitui o exercício de profissões sanitárias, psicológicas, clínicas ou outras atividades regulamentadas pela legislação específica vigente.',
        'footer-copy1':      '© 2025 Deisilaine Soares',
        'footer-copy2':      'Todos os direitos reservados.',
    },
    es: {
        'meta-title':        'Formación Kaipros | Deisilaine Soares',
        'meta-desc':         'Descubre la metodología global del Instituto Kaipros. Una formación de prestigio internacional.',
        'nav-inicio':        'Inicio',
        'nav-desafio':       'El Desafío',
        'nav-metodologia':   'Metodología',
        'nav-mentora':       'Mentora',
        'nav-para-quem':     'Para Quién',
        'nav-garantir':      'Reservar Plaza',
        'hero-h1':           '¡Construye tu liderazgo emocional y forma parte de un movimiento de transformación que supera fronteras!',
        'hero-desc':         'Descubre la metodología global del Instituto Kaipros. Una formación de prestigio internacional, estructurada por una especialista en comportamiento humano, para quienes buscan conocimiento y libertad para actuar con derecho, protagonismo definitivo o desean consolidarse en el mercado como expertos en desarrollo humano personal, actuando como Mentor, Conferencista, Facilitador de Desarrollo Humano y con el privilegio de estudiar en un Instituto europeo.',
        'hero-btn':          'Quiero Iniciar Mi Jornada de Evolución',
        'dores-h2':          '¿Sientes que pasas la vida impulsando a otros, pero sigues viviendo por debajo de tu <span class="highlight">verdadero potencial?</span>',
        'dores-intro':       'A diario, miles de personas enfrentan barreras invisibles que sabotean su crecimiento:',
        'dore-1':            'La falta crónica de autoconfianza para tomar grandes decisiones y decir que no.',
        'dore-2':            'La sobrecarga emocional de cargar con todo, sintiéndose perdida y sin tiempo para sus propios proyectos.',
        'dores-footer-1':    'Sin las herramientas adecuadas, la rutina consume tu energía y devora tus planes de autonomía. El Instituto Kaipros Internacional nació precisamente para romper ese ciclo.',
        'dores-footer-2':    'Creemos que el desarrollo humano es un viaje continuo de descubrimiento, crecimiento y realización profunda. Retoma las riendas de tu historia.',
        'met-h2':            '<span class="highlight">Mucho Más</span> que Formaciones: un movimiento de transformación global',
        'met-intro':         'Uniendo personas de diferentes realidades y países en un viaje de evolución personal y profesional, el Instituto desarrolló un entorno seguro de crecimiento, acogida y conexión, sostenido por una metodología eficaz, creyendo en el desarrollo del ser humano y en su evolución emocional y personal, preparando agentes de transformación para la acción.',
        'met-l1-h3':         'Desarrollo Personal',
        'met-l1-p':          'Fortalecimiento de la autoconfianza, claridad de propósito, liderazgo de vida y crecimiento continuo.',
        'met-l2-h3':         'Inteligencia Emocional',
        'met-l2-p':          'Herramientas prácticas para gestionar emociones, estructurar relaciones saludables y tomar decisiones con seguridad.',
        'met-l3-h3':         'Dominio Emocional',
        'met-l3-p':          'Incentivo directo a la independencia, recuperación de la autoestima y valorización del ser humano en todas las áreas.',
        'met-l4-h3':         'Educación y Transformación',
        'met-l4-p':          'Cursos, mentorías y experiencias estructuradas para generar cambios conductuales reales y duraderos.',
        'met-l5-h3':         'Comunidad y Conexión',
        'met-l5-p':          'Creación de un entorno internacional seguro para el intercambio de experiencias, aprendizaje práctico y apoyo mutuo.',
        'sobre-h2':          '¿Quién es <span class="highlight">Deisilaine Soares?</span>',
        'sobre-subtitle':    'Conocimiento técnico y experiencia real, lejos de las fórmulas superficiales de Internet.',
        'sobre-p1':          'Psicoanalista Clínica y Mentora, Deisilaine estructuró la metodología del Instituto Kaipros Internacional con base en años de sólida actuación en el desarrollo personal, entrenamientos y acompañamiento profundo de mujeres en diferentes contextos de vida.',
        'sobre-p2':          'Una líder dedicada a extraer el máximo potencial, la autonomía emocional y el protagonismo de cada individuo.',
        'badge-title':       'Formación en Desarrollo Humano Kaipros®',
        'badge-sub':         'Nivel Especialista • Certificación de Carácter Privado Internacional',
        'pq-h2':             '¿Para <span class="highlight">quién</span> es?',
        'pq-intro':          'Esta formación fue concebida para personas que desean invertir en su crecimiento, siendo el paso definitivo de validación para:',
        'pq-li1':            'Conferencistas y comunicadores.',
        'pq-li2':            'Personas comprometidas con la evolución continua.',
        'pq-li3':            'Líderes y gestores que necesitan guiar equipos con empatía y firmeza.',
        'pq-li4':            'Educadores y formadores privados que buscan una metodología estructurada.',
        'pq-li5':            'Mentores de desarrollo que quieren monetizar su conocimiento.',
        'pq-li6':            'Profesionales que buscan excelencia en las relaciones interpersonales.',
        'pq-atuacao-title':  '¿Dónde puede actuar un Especialista Certificado Kaipros®?',
        'acc1-sum':          'Trabajo Autónomo y Negocio Propio <span class="icon"></span>',
        'acc2-sum':          'Universo Corporativo (Empresas) <span class="icon"></span>',
        'acc3-sum':          'Proyectos Sociales y Centros Comunitarios <span class="icon"></span>',
        'acc1-p':            'Actúa en el mercado como Mentor de Desarrollo Personal, Conferencista Profesional, Creador de Cursos Online, Facilitador de Talleres y Mentor de Carrera.',
        'acc2-p':            'Actúa con Formación Interna de Equipos, desarrollo de competencias interpersonales, liderazgo personal, motivación y comunicación asertiva.',
        'acc3-p':            'Desarrolla programas de integración social, facilitación de grupos de crecimiento en ONGs, asociaciones culturales y proyectos comunitarios.',
        'req-p':             '<strong>Requisitos de Acceso:</strong> edad mínima de 18 AÑOS con disponibilidad para participar activamente en el proceso evolutivo.',
        'cta-btn':           'Quiero Garantizar Mi Plaza en la Próxima Edición',
        'footer-disclaimer': 'La Formación en Desarrollo Humano Kaipros® emite una certificación de carácter estrictamente privado destinada al desarrollo de competencias humanas, mentoría, liderazgo personal y facilitación de grupos. Esta formación no habilita ni sustituye el ejercicio de profesiones sanitarias, psicológicas, clínicas u otras actividades reguladas por la legislación específica vigente.',
        'footer-copy1':      '© 2025 Deisilaine Soares',
        'footer-copy2':      'Todos los derechos reservados.',
    }
};

// ─── Language engine ─────────────────────────────────────────────────────────

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update <html lang>
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'es';

    // Update <title>
    document.title = t['meta-title'];

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t['meta-desc']);

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });

    // Toggle active state on buttons
    const btnPt = document.getElementById('btn-pt');
    const btnEs = document.getElementById('btn-es');
    if (btnPt) btnPt.classList.toggle('active', lang === 'pt');
    if (btnEs) btnEs.classList.toggle('active', lang === 'es');

    // Persist preference
    localStorage.setItem('kaipros-lang', lang);
}

function setLanguage(lang) {
    applyLanguage(lang);
}
