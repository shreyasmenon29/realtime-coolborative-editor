const socket = io();

const wrapper = document.getElementById("editor-wrapper");
const usersDisplay = document.getElementById("users");

let isRemoteUpdate = false;
let typingTimer = null;

const TYPING_DELAY = 300;
const CHARS_PER_PAGE = 700;

function splitIntoPages(text) {
    const pages = [];
    for (let i = 0; i < text.length; i += CHARS_PER_PAGE) {
        pages.push(text.slice(i, i + CHARS_PER_PAGE));
    }
    return pages.length ? pages : [""];
}

function renderPages(text) {
    wrapper.innerHTML = "";

    const pages = splitIntoPages(text);

    pages.forEach((pageText, index) => {
        const page = document.createElement("div");
        page.className = "page";

        const pageNumber = document.createElement("div");
        pageNumber.className = "page-number";
        pageNumber.textContent = `Page ${index + 1}`;

        const textarea = document.createElement("textarea");
        textarea.value = pageText;

        textarea.addEventListener("input", () => {
            if (isRemoteUpdate) return;

            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                const fullText = Array.from(
                    wrapper.querySelectorAll("textarea")
                )
                .map(t => t.value)
                .join("");

                socket.emit("text_change", fullText);
            }, TYPING_DELAY);
        });

        page.appendChild(pageNumber);
        page.appendChild(textarea);
        wrapper.appendChild(page);
    });
}

socket.on("update_text", (text) => {
    isRemoteUpdate = true;
    renderPages(text);
    isRemoteUpdate = false;
});

socket.on("user_count", (count) => {
    usersDisplay.innerHTML = `
        <span class="status-dot"></span>
        Users online: ${count}
    `;
});

socket.on("connect", () => {
    socket.emit("text_change", "");
});
