document.addEventListener('DOMContentLoaded', () => {

    const header     = document.getElementById('site-header');
    const mobileBtn  = document.getElementById('btn-mobile-toggle');
    const mouseGlow  = document.getElementById('mouse-glow-fx');

    /* ── Scroll: shrink header ───────────────────────────────────── */
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    /* ── Mobile hamburger toggle ─────────────────────────────────── */
    mobileBtn.addEventListener('click', () => {
        const open = header.classList.toggle('mobile-open');
        mobileBtn.setAttribute('aria-expanded', open);
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('mobile-open');
            mobileBtn.setAttribute('aria-expanded', 'false');
        });
    });

    /* ── Mouse glow tracker ──────────────────────────────────────── */
    window.addEventListener('mousemove', e => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top  = e.clientY + 'px';
    });

    /* ── Scroll-reveal cards ─────────────────────────────────────── */
    const cards = document.querySelectorAll('.feat-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity  = '1';
                    entry.target.style.transform = entry.target.classList.contains('feat-card-center')
                        ? 'translateY(-12px)'
                        : 'translateY(0)';
                }, i * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        observer.observe(card);
    });

});
