const output = document.getElementById('output');
const input = document.getElementById('input');

const info = `
Hi! I'm Michal and I'm a software engineer from Poland. I've been building mobile apps \
for more than a decade. I specialize in both native iOS and Android development, using \
Swift and SwiftUI and Kotlin and Jetpack Compose. I've been building cross platform apps\
in Flutter as well.
I've spent quite a while building Internet of Things projects, most of them were built \
with esp32 and raspberry pi.
I also know my way around web development in node.js, next.js and react.
`

const commands = {
    'github': '<a href="https://github.com/srgtuszy">https://github.com/srgtuszy</a>',
    'linkedin': '<a href="https://www.linkedin.com/in/srgtuszy/">https://www.linkedin.com/in/srgtuszy/</a>',
    'email': 'srgtuszy@gmail.com',
    'info': `${info}`
}

const caret = '# ';

function sanitizeCommand(command) {
    return command.toLowerCase().trim().slice(2);
}

function createMatrixBackground() {
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'アァイクゥウンェエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    // Draw the characters
    function draw() {
        // Fade the canvas to create the trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Pick a random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            // x coordinate = i * fontSize, y coordinate = drops[i] * fontSize
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to the top randomly to create a continuous effect
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move the drop down
            drops[i]++;
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    setInterval(draw, 80);
}

function processCommand(command) {
    const response = commands[command];
    if (response) {
        return response;
    }

    switch (command) {
        case 'help':
            return `Available commands: ${Object.keys(commands).join(', ')}, help, clear`;
        case 'clear':
            output.value = '';
            return '';
        default:
            return `Command not found: ${command}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    output.innerHTML = 'Welcome to srgtuszy.com terminal! Type "help" to get more information.\n';
    input.focus();
    input.value = `${caret}`;
    createMatrixBackground();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = sanitizeCommand(input.value);
        output.innerHTML += `> ${command}\n`;
        output.innerHTML += processCommand(command) + '\n';
        input.value = `${caret}`;
        setTimeout(() => {
            output.scrollTop = output.scrollHeight;
            input.focus();
        }, 0);
    } else if (e.key === 'Backspace' && input.value.length <= 2) {
        e.preventDefault();
    }
});

window.onload = function() {
    createMatrixBackground();
};