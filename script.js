gsap.registerPlugin(ScrollTrigger);

// ---- DARK MODE TOGGLE ----
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

function updateThemeButton() {
    const isDark = htmlElement.classList.contains('dark');
    darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeButton();

darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    updateThemeButton();
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('scentlab-theme', isDark ? 'dark' : 'light');
});

// ---- D1 + D2: PAGE-LOAD INTRO TIMELINE ----
// power2.out is used for smooth, natural deceleration. 
// power3.out on the title gives it a slightly stronger, more elegant landing.
const introTl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });

introTl
    .from('header', { y: -20, opacity: 0 }, 0)
    .from('.hero-eyebrow', { y: 20, opacity: 0 }, '-=0.3')
    .from('.hero-title .line', { y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .from('.hero-lead', { y: 20, opacity: 0 }, '-=0.3')
    .from('.hero-ctas > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
    .from('.hero-visual', { x: 40, opacity: 0, scale: 0.98, duration: 0.7 }, '-=0.5');

// ---- D3: CLICK INTERACTION ----
document.getElementById('replayBtn').addEventListener('click', () => {
    introTl.restart();
});

// ---- CUSTOMIZER LOGIC ----
const state = { step: 1, family: null, notes: [], intensity: null };
const NOTES_BY_FAMILY = {
    woody: ['Bergamot', 'Cedarwood', 'Vetiver', 'Sandalwood', 'Amber', 'Vanilla'],
    floral: ['Bergamot', 'Mandarin', 'Rose', 'Jasmine', 'Peony', 'Soft Musk'],
    citrus: ['Bergamot', 'Lemon', 'Mandarin', 'Neroli', 'Green Tea', 'Cedarwood'],
    fresh: ['Green Tea', 'Bergamot', 'Aquatic Accord', 'Lavender', 'Clean Musk']
};

const el = {
    error: document.getElementById('customizer-error'),
    notes: document.getElementById('notes-container'),
    prevBtn: document.getElementById('prev-step'),
    nextBtn: document.getElementById('next-step')
};

function renderStep() {
    document.querySelectorAll('.step-panel').forEach(p => p.hidden = Number(p.dataset.step) !== state.step);
    document.querySelectorAll('#step-progress li').forEach(li => {
        const n = Number(li.dataset.step);
        li.dataset.state = n === state.step ? 'active' : n < state.step ? 'done' : '';
    });
    el.prevBtn.disabled = state.step === 1;
    if (state.step === 3) {
        el.nextBtn.textContent = 'Finish';
    } else {
        el.nextBtn.textContent = 'Next';
    }
    if (state.step === 2) renderNotes();
}

function renderNotes() {
    el.notes.innerHTML = '';
    if (!state.family) return;
    NOTES_BY_FAMILY[state.family].forEach(note => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'note-chip';
        btn.textContent = note;
        btn.setAttribute('aria-pressed', state.notes.includes(note));
        btn.onclick = () => {
            if (state.notes.includes(note)) state.notes = state.notes.filter(n => n !== note);
            else if (state.notes.length < 4) state.notes.push(note);
            else return;
            btn.setAttribute('aria-pressed', state.notes.includes(note));
        };
        el.notes.appendChild(btn);
    });
}

document.querySelectorAll('#family-options button').forEach(btn => {
    btn.onclick = () => {
        state.family = btn.dataset.family;
        state.notes = [];
        document.querySelectorAll('#family-options button').forEach(b => b.setAttribute('aria-pressed', b === btn));
        el.error.classList.add('hidden');
    };
});

document.querySelectorAll('#intensity-options button').forEach(btn => {
    btn.onclick = () => {
        state.intensity = btn.dataset.intensity;
        document.querySelectorAll('#intensity-options button').forEach(b => b.setAttribute('aria-pressed', b === btn));
        el.error.classList.add('hidden');
    };
});

el.nextBtn.onclick = () => {
    if (state.step === 1 && !state.family) return el.error.textContent = 'Select a family.', el.error.classList.remove('hidden');
    if (state.step === 2 && state.notes.length === 0) return el.error.textContent = 'Select at least one note.', el.error.classList.remove('hidden');
    if (state.step === 3 && !state.intensity) return el.error.textContent = 'Select an intensity.', el.error.classList.remove('hidden');
    
    if (state.step < 3) {
        state.step++;
        renderStep();
    } else {
        alert(`Concept Saved!\nFamily: ${state.family}\nNotes: ${state.notes.join(', ')}\nIntensity: ${state.intensity}`);
    }
};

el.prevBtn.onclick = () => {
    if (state.step > 1) {
        state.step--;
        el.error.classList.add('hidden');
        renderStep();
    }
};

// ---- CONTACT FORM (Demo submission) ----
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-success').classList.remove('hidden');
    e.target.reset();
    setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000);
});

document.getElementById('year').textContent = new Date().getFullYear();

// ---- E1, E2, E3: SCROLL REVEALS, SCRUB, REDUCED MOTION ----
window.__scentlabReady = true;

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.fromTo(section, 
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    gsap.to("#progressBar", {
        scaleX: 1, ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(".reveal", { opacity: 1, y: 0 });
    gsap.set("#progressBar", { scaleX: 1 });
});