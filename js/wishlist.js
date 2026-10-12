const form = document.getElementById('wishlistForm');
const status = document.getElementById('wishlistStatus');
const button = form.querySelector('button[type="submit"]');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (button.disabled || !form.reportValidity()) return;
  button.disabled = true;
  button.textContent = 'ENVIANDO…';
  status.textContent = '';
  try {
    const response = await fetch('/api/wishlist', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.nome.value, email: form.email.value, consent: form.consent.checked, website: form.website.value }),
      signal: AbortSignal.timeout(20000)
    });
    const data = await response.json();
    if (!response.ok || data.success !== true) throw new Error(data.error || 'Não foi possível enviar sua inscrição.');
    form.hidden = true;
    document.getElementById('wishlistSucesso').classList.add('visivel');
  } catch (error) {
    status.textContent = error.name === 'TimeoutError' ? 'O envio demorou mais que o esperado. Tente novamente.' : (error instanceof TypeError ? 'Não foi possível conectar. Confira sua conexão e tente novamente.' : error.message);
  } finally {
    button.disabled = false;
    button.textContent = 'QUERO ENTRAR NA LISTA DE ESPERA';
  }
});

