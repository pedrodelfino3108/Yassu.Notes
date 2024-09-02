document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const noteText = document.getElementById('note-text');
    const noteTitle = document.getElementById('note-title');
    let activeTab = document.querySelector('.tab-button.active');

    function loadNotes() {
        tabButtons.forEach(button => {
            const noteContent = localStorage.getItem(button.dataset.tab + '_content');
            const noteTitleText = localStorage.getItem(button.dataset.tab + '_title');
            if (noteContent !== null) {
                button.dataset.content = noteContent;
            }
            if (noteTitleText !== null) {
                button.dataset.title = noteTitleText;
                button.textContent = noteTitleText;
            }
        });

        // Load the content of the active tab
        if (activeTab) {
            noteText.value = activeTab.dataset.content || '';
            noteTitle.value = activeTab.dataset.title || '';
        }
    }

    function saveNote() {
        if (activeTab) {
            localStorage.setItem(activeTab.dataset.tab + '_content', noteText.value);
            localStorage.setItem(activeTab.dataset.tab + '_title', noteTitle.value);
            activeTab.dataset.content = noteText.value;
            activeTab.dataset.title = noteTitle.value;
            activeTab.textContent = noteTitle.value;
        }
    }

    function switchTab(newTab) {
        if (activeTab) {
            // Save the current active tab's content before switching
            saveNote();
        }
        // Update active tab
        activeTab = newTab;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        newTab.classList.add('active');
        noteText.value = newTab.dataset.content || '';
        noteTitle.value = newTab.dataset.title || '';
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button);
        });
    });

    document.getElementById('new-tab').addEventListener('click', () => {
        const newTabNumber = tabButtons.length + 1;
        const newButton = document.createElement('button');
        newButton.classList.add('tab-button');
        newButton.dataset.tab = `tab${newTabNumber}`;
        newButton.dataset.title = `Nota ${newTabNumber}`;
        newButton.textContent = `Nota ${newTabNumber}`;
        document.querySelector('.tabs').insertBefore(newButton, document.getElementById('new-tab'));

        // Set default empty content and title for new tab
        newButton.dataset.content = '';
        newButton.dataset.title = '';

        newButton.addEventListener('click', () => {
            switchTab(newButton);
        });

        // Select new tab and focus on textarea
        newButton.click();
    });

    // Save note on unload
    window.addEventListener('beforeunload', saveNote);

    // Load notes on initial load
    loadNotes();
});
