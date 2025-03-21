document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.className = 'digital-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Caractères pour l'effet matrix (ajout de caractères cyberpunk)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノマミムメモヤユヨラリルレロワヰヱヲ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ/*-+<>[]{}=_$%&';
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Tableau pour stocker la position Y de chaque colonne
    const drops = [];
    
    // Initialiser toutes les gouttes à une position aléatoire au-dessus de l'écran
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function draw() {
        // Arrière-plan semi-transparent pour créer l'effet de fondu
        ctx.fillStyle = 'rgba(10, 10, 22, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Couleur des caractères
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        // Pour chaque colonne
        for (let i = 0; i < drops.length; i++) {
            // Caractère aléatoire
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Calculer la teinte en fonction de la position
            const colorIntensity = Math.min(1, drops[i] / canvas.height * 2);
            ctx.fillStyle = drops[i] % 3 === 0 ? 
                            '#ff00ff' : 
                            `rgba(0, ${Math.floor(200 + colorIntensity * 55)}, ${Math.floor(200 + colorIntensity * 55)}, ${0.8 + colorIntensity * 0.2})`;
            
            // Dessiner le caractère
            ctx.fillText(char, i * fontSize, drops[i]);
            
            // Reinitialiser à une position aléatoire si la goutte a atteint le bas ou aléatoirement
            if (drops[i] > canvas.height || Math.random() > 0.99) {
                drops[i] = Math.random() * -100;
            }
            
            // Déplacer la goutte
            drops[i] += Math.random() * 2 + 1;
        }
    }
    
    // Fonction pour redimensionner le canvas lors du redimensionnement de la fenêtre
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = canvas.width / fontSize;
        
        // Ajuster le nombre de colonnes
        if (newColumns > drops.length) {
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.random() * -100;
            }
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Animer la pluie numérique
    setInterval(draw, 35);
});