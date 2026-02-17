// Configuração dos links de checkout
// IMPORTANTE: Substitua os links abaixo pelos seus links reais de checkout
const checkoutLinks = {
    pacote1: 'https://pay.kirvano.com/4f880bf0-4ab0-43c7-bcc2-fe83f62e5376',
    pacote2: 'https://pay.kirvano.com/4d158906-0d52-47f7-89b2-a58dd8cbad6b',
    pacote3: 'https://pay.kirvano.com/5c406e6b-cca2-44df-9268-8e78931e7b9c'
};

// Função para redirecionar para o checkout
function redirectToCheckout(pacote) {
    const link = checkoutLinks[pacote];
    
    if (link && link !== 'https://pay.kirvano.com/4f880bf0-4ab0-43c7-bcc2-fe83f62e5376' && 
        link !== 'https://pay.kirvano.com/4d158906-0d52-47f7-89b2-a58dd8cbad6b' && 
        link !== 'https://pay.kirvano.com/5c406e6b-cca2-44df-9268-8e78931e7b9c') {
        // Redireciona para o link externo
        window.location.href = link;
    } else {
        // Se o link ainda não foi configurado, mostra um alerta
        alert('Por favor, configure o link de checkout no arquivo js/main.js');
        console.log('Configure os links de checkout na variável checkoutLinks');
    }
}

// Smooth scroll para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de fade-in ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa os cards de depoimentos
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Observa os cards de ofertas
document.querySelectorAll('.offer-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Efeito de contagem nos números das estatísticas
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        if (element.classList.contains('stat-number')) {
            const value = progress * (end - start) + start;
            if (end % 1 !== 0) {
                element.textContent = value.toFixed(1);
            } else {
                element.textContent = Math.floor(value).toLocaleString('pt-BR');
            }
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicia a animação de contagem quando os números aparecem na tela
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                let targetValue;
                
                if (text.includes('.')) {
                    targetValue = parseFloat(text);
                    animateValue(statNumber, 0, targetValue, 2000);
                } else if (text.includes('%')) {
                    targetValue = parseInt(text);
                    animateValue(statNumber, 0, targetValue, 2000);
                    setTimeout(() => {
                        statNumber.textContent = targetValue + '%';
                    }, 2000);
                } else {
                    targetValue = parseInt(text.replace(/\./g, ''));
                    animateValue(statNumber, 0, targetValue, 2000);
                }
                
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Log de informações úteis no console
console.log('%c🌿 Site Moringa Oleífera', 'color: #2d5f3f; font-size: 20px; font-weight: bold;');
console.log('%cPara configurar os links de checkout, edite o arquivo js/main.js', 'color: #4a8f5e; font-size: 14px;');
console.log('Links de checkout disponíveis:', checkoutLinks);
