

function filterNotices(type, btn) {
    document.querySelectorAll('.filter-tabs button').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.notice-card').forEach(card => {
        card.style.display = (type === 'all' || card.getAttribute('data-type') === type) ? '' : 'none';
    });
}

